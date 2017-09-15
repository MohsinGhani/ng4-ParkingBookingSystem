import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ConfigSlotsService {
  reservedSlotsCDGK: FirebaseListObservable<any>;
  reservedSlotsGulshan: FirebaseListObservable<any>;
  reservedSlotsDHA: FirebaseListObservable<any>;

  constructor(public _AngularFireAuth: AngularFireAuth, public _AngularFireDatabase: AngularFireDatabase) {
    this.reservedSlotsCDGK = _AngularFireDatabase.list('/CDGKreservedSlotsList');
    this.reservedSlotsGulshan = _AngularFireDatabase.list('/gulshanReservedSlotsList');
    this.reservedSlotsDHA = _AngularFireDatabase.list('/DHAreservedSlotsList');

    var currentDate = new Date().getDate();
    var currentMonth = new Date().getMonth() + 1;
    var currentYear = new Date().getFullYear();

    this.reservedSlotsCDGK.subscribe(slots => {
      slots.forEach(slot => {
        if (currentDate > slot.day || currentMonth > slot.month || currentYear > slot.year) {
          this.reservedSlotsCDGK.remove(slot.$key);
        }
      });
    })

    this.reservedSlotsGulshan.subscribe(slots => {
      slots.forEach(slot => {
        if (currentDate > slot.day || currentMonth > slot.month || currentYear > slot.year) {
          this.reservedSlotsGulshan.remove(slot.$key);
        }
      });
    })

    this.reservedSlotsDHA.subscribe(slots => {
      slots.forEach(slot => {
        if (currentDate > slot.day || currentMonth > slot.month || currentYear > slot.year) {
          this.reservedSlotsDHA.remove(slot.$key);
        }
      });
    })

  }
}
