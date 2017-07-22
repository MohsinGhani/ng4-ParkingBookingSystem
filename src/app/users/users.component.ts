import { Component, OnInit } from '@angular/core';
import { AdminService } from './../services/admin.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];
  userDetail = {name:'',email:'',phone:'',address:'',status:''};
  isBlock = false;
  index;
  constructor(private _AdminService:AdminService) {
    this.users = _AdminService.clearUsers();
    _AdminService.fetchUsers();
    this.users = _AdminService.getUsers();
  }

  ngOnInit() {
  }

  detail(i){
    this.index = i;
    this.userDetail = this.users[i]
    if( this.userDetail.status == 'de-active'){
      this.isBlock = true;
    }
    else{
      this.isBlock = false;
    }
  }

  blockUser(){
    this._AdminService.blockUser(this.index,this.userDetail);
  }

  unBlockUser(){
    this._AdminService.unBlockUser(this.index,this.userDetail);
  }


}
