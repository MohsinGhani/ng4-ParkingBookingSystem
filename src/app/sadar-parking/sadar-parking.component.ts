import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { UserService } from './../services/user.service'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment'
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-sadar-parking',
  templateUrl: './sadar-parking.component.html',
  styleUrls: ['./sadar-parking.component.css']
})

export class SadarParkingComponent implements OnInit, OnDestroy {
  currentUser;
  bookingData = { date: '', timeSlot: '', reserveHours: '', slotNumber: '', day: 0, month: 0, year: 0, place: 'CDGK', key : '' };
  dateAlert = false;
  timeAlert = false;
  selectTimeMode = true;
  selectSlotMode = false;
  agreeWithInfoMode = false;
  successMode = false;
  currentdate = new Date();
  maxDate = new Date(2020, 0, 0);
  from = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  reserveHour = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  slots = [];
  date;
  startTime;
  hours;
  subscriber;
  resevedSlot;
  currentSlotTimeDuration = [];
  configuraionMode = { step1: false, step2: false, step3: false }
  currentUserKey;
  CDGKslots = [
    { 'isReserve': false, 'number': 1 }, { 'isReserve': false, 'number': 2 }, { 'isReserve': false, 'number': 3 },
    { 'isReserve': false, 'number': 4 }, { 'isReserve': false, 'number': 5 }, { 'isReserve': false, 'number': 6 },
    { 'isReserve': false, 'number': 7 }, { 'isReserve': false, 'number': 8 }, { 'isReserve': false, 'number': 9 },
    { 'isReserve': false, 'number': 10 }, { 'isReserve': false, 'number': 11 }, { 'isReserve': false, 'number': 12 },
    { 'isReserve': false, 'number': 13 }, { 'isReserve': false, 'number': 14 }, { 'isReserve': false, 'number': 15 },
    { 'isReserve': false, 'number': 16 }, { 'isReserve': false, 'number': 17 }, { 'isReserve': false, 'number': 18 },
    { 'isReserve': false, 'number': 19 }, { 'isReserve': false, 'number': 20 }, { 'isReserve': false, 'number': 21 },
    { 'isReserve': false, 'number': 22 }, { 'isReserve': false, 'number': 23 }, { 'isReserve': false, 'number': 24 },
    { 'isReserve': false, 'number': 25 }, { 'isReserve': false, 'number': 26 }, { 'isReserve': false, 'number': 27 },
    { 'isReserve': false, 'number': 28 }, { 'isReserve': false, 'number': 29 }, { 'isReserve': false, 'number': 30 },
    { 'isReserve': false, 'number': 31 }, { 'isReserve': false, 'number': 32 }, { 'isReserve': false, 'number': 33 },
    { 'isReserve': false, 'number': 34 }, { 'isReserve': false, 'number': 35 }, { 'isReserve': false, 'number': 36 },
    { 'isReserve': false, 'number': 37 }, { 'isReserve': false, 'number': 38 }, { 'isReserve': false, 'number': 39 },
    { 'isReserve': false, 'number': 40 }, { 'isReserve': false, 'number': 41 }, { 'isReserve': false, 'number': 42 },
    { 'isReserve': false, 'number': 43 }, { 'isReserve': false, 'number': 44 }, { 'isReserve': false, 'number': 45 },
    { 'isReserve': false, 'number': 46 }, { 'isReserve': false, 'number': 47 }, { 'isReserve': false, 'number': 48 },
    { 'isReserve': false, 'number': 49 }, { 'isReserve': false, 'number': 50 }, { 'isReserve': false, 'number': 51 },
    { 'isReserve': false, 'number': 52 }, { 'isReserve': false, 'number': 53 }, { 'isReserve': false, 'number': 54 },
    { 'isReserve': false, 'number': 55 }, { 'isReserve': false, 'number': 56 }, { 'isReserve': false, 'number': 57 },
    { 'isReserve': false, 'number': 58 }, { 'isReserve': false, 'number': 59 }, { 'isReserve': false, 'number': 60 },
    { 'isReserve': false, 'number': 61 }, { 'isReserve': false, 'number': 62 },
    { 'isReserve': false, 'number': 63 }, { 'isReserve': false, 'number': 64 }, { 'isReserve': false, 'number': 65 },
    { 'isReserve': false, 'number': 66 }, { 'isReserve': false, 'number': 67 }, { 'isReserve': false, 'number': 68 },
    { 'isReserve': false, 'number': 69 }, { 'isReserve': false, 'number': 70 }, { 'isReserve': false, 'number': 71 },
    { 'isReserve': false, 'number': 72 }, { 'isReserve': false, 'number': 73 }, { 'isReserve': false, 'number': 74 },
    { 'isReserve': false, 'number': 75 }, { 'isReserve': false, 'number': 76 }, { 'isReserve': false, 'number': 77 },
    { 'isReserve': false, 'number': 78 }, { 'isReserve': false, 'number': 79 }, { 'isReserve': false, 'number': 80 },
    { 'isReserve': false, 'number': 81 }, { 'isReserve': false, 'number': 82 }, { 'isReserve': false, 'number': 83 },
    { 'isReserve': false, 'number': 84 }, { 'isReserve': false, 'number': 85 }, { 'isReserve': false, 'number': 86 },
    { 'isReserve': false, 'number': 87 }, { 'isReserve': false, 'number': 88 }, { 'isReserve': false, 'number': 89 },
    { 'isReserve': false, 'number': 90 }, { 'isReserve': false, 'number': 91 }, { 'isReserve': false, 'number': 92 },
    { 'isReserve': false, 'number': 93 }, { 'isReserve': false, 'number': 94 }, { 'isReserve': false, 'number': 95 },
    { 'isReserve': false, 'number': 96 }, { 'isReserve': false, 'number': 97 }, { 'isReserve': false, 'number': 98 },
    { 'isReserve': false, 'number': 99 }, { 'isReserve': false, 'number': 100 },
  ];

  reservedSlots: FirebaseListObservable<any>;
  constructor(private _UserService: UserService, private db: AngularFireDatabase) {
    this.currentUser = _UserService.getCurrentUser();
    _UserService.getCDGKReservedSlots();
    this.reservedSlots = db.list('/CDGKreservedSlotsList', { preserveSnapshot: true });

  }

  ngOnInit() {
    this.subscriber = this.reservedSlots.subscribe(snapshots => {
      this.CDGKslots.forEach((slot) => {
        slot.isReserve = false;
      });
      this.resevedSlot = snapshots;
      this.configurationOfSlots()
    });
  }

  datePick(date) {
    this.configuraionMode.step1 = true
    this.CDGKslots.forEach((slot) => {
      slot.isReserve = false;
    });
    // this.date = date;
    this.bookingData.day = new Date(date).getDate();
    this.bookingData.month = new Date(date).getMonth() + 1;
    this.bookingData.year = new Date(date).getFullYear();
    this.date = `${this.bookingData.month}-${this.bookingData.day}-${this.bookingData.year}`

    this.configurationOfSlots()
  }

  timePick(time) {
    this.currentSlotTimeDuration = []
    this.configuraionMode.step2 = true
    this.CDGKslots.forEach((slot) => {
      slot.isReserve = false;
    });
    this.startTime = parseInt(time);
    this.getCurrentTimeDuration()
    this.configurationOfSlots()
  }

  reserveHourPick(hours) {
    this.currentSlotTimeDuration = []
    this.configuraionMode.step3 = true
    this.CDGKslots.forEach((slot) => {
      slot.isReserve = false;
    });
    this.hours = hours
    this.getCurrentTimeDuration()
    this.configurationOfSlots()
  }

  getCurrentTimeDuration() {
    let currentEndTime = this.startTime + this.hours;
    for (let i = this.startTime; i < currentEndTime; i++) {
      this.currentSlotTimeDuration.push(i)
    }
    // console.log('refresh slots', this.currentSlotTimeDuration)

  }

  configurationOfSlots() {
    this.resevedSlot.forEach(snapshot => {
      if (moment(this.date, 'MM-DD-YYYY').isSame(`${snapshot.val().date}`)) {
        this.configurationOfSlotTime(snapshot.val())
      }
    });
  }

  configurationOfSlotTime(slot: any) {
    let duration = [];
    if (this.configuraionMode.step1 && this.configuraionMode.step2 && this.configuraionMode.step3) {
      for (let i = slot.startTime; i < slot.endTime; i++) {
        duration.push(i)
      }
      for (let index = 0; index < duration.length; index++) {
        for (let index1 = 0; index1 < this.currentSlotTimeDuration.length; index1++) {
            if (duration[index] === this.currentSlotTimeDuration[index1]) {
              this.CDGKslots[slot.slotNumber - 1].isReserve = true;
            }
        }
      }
    }
  }

  backToSelectTimeMode() {
    this._UserService.refreshCDGKslots();
    this.selectTimeMode = true;
    this.agreeWithInfoMode = false;
  }

  backToSelectSlotMode() {
    this.selectTimeMode = true;
    this.agreeWithInfoMode = false;
  }

  ngOnDestroy() {
    // console.log('ng destroy')
    // this.subscriber.unsubcribe();
  }

  bookSlot(slotNumber) {
    this.bookingData.slotNumber = slotNumber;
    this.bookingData = this._UserService.configurationOfParkingData(this.bookingData);
    this.selectTimeMode = false;
    this.agreeWithInfoMode = true;
  }

  agree() {
    this.bookingData.date = this.date;
    this.currentUserKey = localStorage.getItem('currentUserKey');
    this.bookingData.key = this.currentUserKey;
    firebase.database().ref('CDGKreservedSlotsList').push(this.bookingData);
    this.selectTimeMode = false;
    this.agreeWithInfoMode = false;
    this.successMode = true;
  }

  disagree() {
    this.selectTimeMode = true;
    this.agreeWithInfoMode = false;
  }

}
