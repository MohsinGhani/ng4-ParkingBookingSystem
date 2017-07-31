import { Component, OnInit } from '@angular/core';
import { AdminService } from './../services/admin.service'
import {  FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  BookingDetail = {date:'',email:'',name:'',phone:'',price:'',slotNumber:'',timeSlot:''};
  
  CDGKBooking:FirebaseListObservable<any>;
  gulshanBooking:FirebaseListObservable<any>;
  DHABooking:FirebaseListObservable<any>;
  
  searchMode = false;
  slotNumber:number;

  CDGKSearchSlots:FirebaseListObservable<any>;
  GulshanSearchSlots:FirebaseListObservable<any>;
  DHASearchSlots:FirebaseListObservable<any>;

  constructor(private _AdminService:AdminService) {
    this.CDGKBooking = _AdminService.fetchCDGKBooking();  
    this.gulshanBooking = _AdminService.fetchGulshanBooking();
    this.DHABooking = _AdminService.fetchDHABooking();
  }

  ngOnInit() {
  }

  detailCDGKBooking(key){
    this.BookingDetail = this._AdminService.getDetailCDGKSlot(key);
  }

  cancelCDGKBooking(key){
    this._AdminService.cancelCDGKBooking(key)
  }

  detailGulshanBooking(key){
    this.BookingDetail = this._AdminService.getDetailGulshanSlot(key);
  }

  cancelGulshanBooking(key){
    this._AdminService.cancelGulshanBooking(key)
  }

  detailDHABooking(key){
    this.BookingDetail = this._AdminService.getDetailDHASlot(key);
  }

  cancelDHABooking(key){
    this._AdminService.cancelDHABooking(key)
  }

  searchCDGKSlot(value){
    this.CDGKSearchSlots = this._AdminService.searchCDGKSlot(value);
  }

  searchGulshanSlot(value){
    this.GulshanSearchSlots = this._AdminService.searchGulshanSlot(value);
  }

  searchDHASlot(value){
    this.DHASearchSlots = this._AdminService.searchDHASlot(value);
  }
}
