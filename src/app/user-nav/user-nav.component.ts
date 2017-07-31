import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service'
import {  FirebaseObjectObservable  } from 'angularfire2/database';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  currentUser:FirebaseObjectObservable<any>;
  constructor(private _UserService:UserService) {
    this.currentUser = _UserService.getUserName()
  }

  ngOnInit() {
  }

  logout(){
    this._UserService.logout();
  }

}
