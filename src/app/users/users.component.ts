import { Component, OnInit } from '@angular/core';
import { AdminService } from './../services/admin.service'
import {  FirebaseListObservable,FirebaseObjectObservable  } from 'angularfire2/database';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:FirebaseListObservable<any>;;
  userDetail: FirebaseObjectObservable<any>;
  isBlock = false;
  index;
  constructor(private _AdminService:AdminService) {
    // _AdminService.fetchUsers();
    this.users = _AdminService.getUsers();
  }

  ngOnInit() {
  }

  detail(key){
    this.userDetail = this._AdminService.getUserDetail(key);
    
    this.userDetail.subscribe(user => {
      if(user.status == 'de-active'){
          this.isBlock = true;
      }
      else{
          this.isBlock = false;
      }
    });
  }

  blockUser(){
    // this._AdminService.blockUser(this.index,this.userDetail);
    this.userDetail.update({ status: 'de-active' });
  }

  unBlockUser(){
    // this._AdminService.unBlockUser(this.index,this.userDetail);
    this.userDetail.update({ status: 'active' });
  }


}
