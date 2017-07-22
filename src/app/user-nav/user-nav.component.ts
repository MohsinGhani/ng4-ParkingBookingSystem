import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service'

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  currentUser;
  constructor(private _UserService:UserService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUserData")) || [];
  }

  ngOnInit() {
  }

  logout(){
    this._UserService.logout();
  }

}
