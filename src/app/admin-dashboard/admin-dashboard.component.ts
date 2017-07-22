import { Component, OnInit } from '@angular/core';
import { AdminService } from './../services/admin.service'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  CDGKBooking = [];
  BookingDetail = {date:'',email:'',name:'',phone:'',price:'',slotNumber:'',timeSlot:''};
  gulshanBooking = [];
  DHABooking = [];
  constructor(private _AdminService:AdminService) {
    this.CDGKBooking = _AdminService.clearCDGKBooking();
    this.CDGKBooking = _AdminService.fetchCDGKBooking();
    this.gulshanBooking = _AdminService.clearGulshanBooking();    
    this.gulshanBooking = _AdminService.fetchGulshanBooking();
    this.DHABooking = _AdminService.clearDHABooking();
    this.DHABooking = _AdminService.fetchDHABooking();    
  }

  ngOnInit() {
  }

  detailCDGKBooking(index){
    this.BookingDetail = this.CDGKBooking[index];
  }

  detailGulshanBooking(index){
    this.BookingDetail = this.gulshanBooking[index];
  }

  detailDHABooking(index){
    this.BookingDetail = this.DHABooking[index];
  }

  cancelCDGKBooking(index){
    this._AdminService.cancelCDGKBooking(index)
    this.CDGKBooking.splice(index, 1);
  }

  cancelGulshanBooking(index){
    this._AdminService.cancelGulshanBooking(index)
    this.gulshanBooking.splice(index, 1);
  }

  cancelDHABooking(index){
    this._AdminService.cancelDHABooking(index)
    this.DHABooking.splice(index, 1);
  }

  refreshBooking(){
    this.CDGKBooking = this._AdminService.clearCDGKBooking();
    this.gulshanBooking = this._AdminService.clearGulshanBooking();
    this.DHABooking = this._AdminService.clearDHABooking();
    this.CDGKBooking = this._AdminService.fetchCDGKBooking();
    this.gulshanBooking = this._AdminService.fetchGulshanBooking();
    this.DHABooking = this._AdminService.fetchDHABooking();
  }

}
