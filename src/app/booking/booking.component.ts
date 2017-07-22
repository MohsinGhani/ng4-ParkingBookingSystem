import { Component, OnInit } from '@angular/core';
import { AdminService } from './../services/admin.service'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  CDGKBooking = [];
  constructor(private _AdminService:AdminService) {
    this.CDGKBooking = _AdminService.fetchCDGKBooking();
  }

  ngOnInit() {
  }

}
