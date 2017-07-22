import { Component, OnInit } from '@angular/core';
import { AdminService } from './../services/admin.service'

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(private _AdminService:AdminService) { }

  ngOnInit() {
  }

  logout(){
    this._AdminService.logout();
  }

}
