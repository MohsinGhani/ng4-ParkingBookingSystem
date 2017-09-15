import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  CDGKBooking: FirebaseListObservable<any>;
  gulshanBooking: FirebaseListObservable<any>;
  DHABooking: FirebaseListObservable<any>;

  constructor(private _UserService: UserService) {
    _UserService.checkUserProfile()
    this.CDGKBooking = _UserService.getCDGKbooking();
    this.gulshanBooking = _UserService.getGulshanBooking();
    this.DHABooking = _UserService.getDHAbooking();
  }

  ngOnInit() {
  }

  cancelCDGKBooking(key) {
    this._UserService.cancelCDGKBooking(key);
  }

  cancelGulshanBooking(key) {
    this._UserService.cancelGulshanBooking(key);
  }

  cancelDHABooking(key) {
    this._UserService.cancelDHABooking(key);
  }

}
