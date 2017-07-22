import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  CDGKbooking=[];
  gulshanBooking=[];
  DHAbooking = [];
  constructor(private _UserService:UserService) {
    _UserService.checkUserProfile()
    this.CDGKbooking = _UserService.clearCDGKbooking()
    this.CDGKbooking = _UserService.getCDGKbooking();
    this.gulshanBooking = _UserService.clearGulshanBooking();
    this.gulshanBooking = _UserService.getGulshanBooking();
    this.DHAbooking = _UserService.clearDHAbooking();
    this.DHAbooking = _UserService.getDHAbooking();
}
  
  ngOnInit() {
  }

  cancelCDGKBooking(index){
    this._UserService.cancelCDGKBooking(index);
    this.refreshBooking();
  }

  cancelGulshanBooking(index){
    this._UserService.cancelGulshanBooking(index);
    this.refreshBooking();
  }

  cancelDHABooking(index){
    this._UserService.cancelDHABooking(index);
    this.refreshBooking();
  }

  refreshBooking(){
    this.CDGKbooking = this._UserService.clearCDGKbooking()
    this.CDGKbooking = this._UserService.getCDGKbooking();
    this.gulshanBooking = this._UserService.clearGulshanBooking();
    this.gulshanBooking = this._UserService.getGulshanBooking();
    this.DHAbooking = this._UserService.clearDHAbooking();
    this.DHAbooking = this._UserService.getDHAbooking();
  }

}
