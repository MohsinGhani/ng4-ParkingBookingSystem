import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user = {email:'',password:'',status:''};
  constructor(private _UserService: UserService) {
    _UserService.isLogin();
    //get users data
    _UserService.fetchUsers();
  }

  ngOnInit() {
  }

  login(){
    this._UserService.signIn(this.user);
  }

  signUp(){
    this._UserService.signUp(this.user);
  }


}
