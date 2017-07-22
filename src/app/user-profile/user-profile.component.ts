import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service'
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: FormGroup;
  profileMode = true;
  updateProfileMode = false;
  alert = false;
  constructor(private _FormBuilder: FormBuilder,private _UserService:UserService) {
    let user = _UserService.getCurrentUser();
    this.currentUser = _FormBuilder.group({
      // 'fieldname' : [formValue,validation]
      'name' : [user.name, Validators.compose([Validators.required])],
      'email' : [user.email, Validators.compose([Validators.required])],
      'phone' : [user.phone, Validators.compose([Validators.required])],
      'address' : [user.address, Validators.compose([Validators.required])],
    })
    this.checkUserProfile();
  }

  ngOnInit() {
  }

  updateMode(){
    this.profileMode = false;
    this.updateProfileMode = true;
  }

  cancel(){
    this.profileMode = true;
    this.updateProfileMode = false;
  }
  
  updateProfile(){
    this._UserService.updateProfile(this.currentUser.value);
    this.profileMode = true;
    this.updateProfileMode = false;
    this.alert = false;
  }

  checkUserProfile(){
    let currentUser = JSON.parse(localStorage.getItem("currentUserData")) || [];
     if(currentUser.name == "" && currentUser.address == "" && currentUser.phone == ""){
        this.alert = true;
     };
  }
}
