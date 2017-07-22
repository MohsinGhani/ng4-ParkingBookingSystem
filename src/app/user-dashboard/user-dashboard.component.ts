import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service'

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  currentUser;
  menuMode = true;
  sadarMode = false;
  gulshanMode = false;
  dhaMode = false;
  constructor(private _UserService:UserService) {
    this.currentUser = _UserService.getCurrentUser();
    _UserService.checkUserProfile();
    _UserService.clearReserveSlots();
  }

  ngOnInit() {
  }

  logout(){
    this._UserService.logout();
  }

  showSadarParking(){
    this.sadarMode = true;
    this.gulshanMode = false;
    this.dhaMode = false;
    this.menuMode = false;
  }

  showGulshanParking(){
    this.sadarMode = false;
    this.gulshanMode = true;
    this.dhaMode = false;
    this.menuMode = false;
  }

  showDHAParking(){
    this.sadarMode = false;
    this.gulshanMode = false;
    this.dhaMode = true;
    this.menuMode = false;
  }
}


