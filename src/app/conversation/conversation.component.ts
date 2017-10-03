import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  chatForm: FormGroup;
  chat: FirebaseListObservable<any>;
  currentUserKey;
  currentUserData;
  constructor(private _FormBuilder: FormBuilder, private _UserService: UserService, private _AngularFireDatabase: AngularFireDatabase) {
    _UserService.checkUserProfile();
    this.currentUserKey = localStorage.getItem('currentUserKey');
    this.currentUserData = JSON.parse(localStorage.getItem('currentUserData')) || [];
    this.chat = _AngularFireDatabase.list('/conversation/' + this.currentUserKey);
    this.chatForm = _FormBuilder.group({
      'message': [null, Validators.compose([Validators.required])]
    })

    // let obj;
    // _AngularFireDatabase.database.ref('/CDGKreservedSlotsList/').on('value', (snapshot) => {
    //     obj = snapshot.val();
    //     for (var key in obj) {
    //       console.log(obj[key])
    //     }
    // })

    

  }

  ngOnInit() {
  }

  // test(){
  //   let snapshot = [{ slotNumber: '1', startTime: 9, endTime: 11 }, { slotNumber: '10', startTime: 9, endTime: 11 },
  //   { slotNumber: '5', startTime: 13, endTime: 15 }, { slotNumber: '15', startTime: 13, endTime: 15 },
  //   { slotNumber: '25', startTime: 16, endTime: 18 }, { slotNumber: '20', startTime: 16, endTime: 20 }]
  //   let reservedSlots = [];
  //   let startTime = 8;
  //   let endTime = 10;
  //   let currentReservedHours = []
  //   let reservedHours = []

  //   snapshot.forEach(slot => {
  //     for (let i = startTime; i <= endTime; i++) {
  //       currentReservedHours.push(i)
  //     }

  //     for (let i = slot.startTime; i <= slot.endTime; i++) {
  //       reservedHours.push(i)
  //     }

  //     // console.log(currentReservedHours, reservedHours)
  //     for (let index = 1; index < reservedHours.length; index++) {
  //       for (let index1 = 0; index1 < currentReservedHours.length; index1++) {
  //         if (reservedHours[index] === currentReservedHours[index1]) {
  //             reservedSlots.push(slot.slotNumber)
  //         }
  //       }
  //     }
  //     currentReservedHours = []
  //     reservedHours = []
  //   });
  //   console.log('reservedSlots in function', reservedSlots)
  //   return reservedSlots;
  // }

  sendMessage() {
    const time = new Date().getTime()
    const messageObject = {
      name: this.currentUserData.name,
      timestamp: time,
      text: this.chatForm.value.message,
      imageUrl: '../assets/images/user.png'
    }
    // console.log(messageObject)
    this.chat.push(messageObject);
    this.chatForm.reset();
  }

}
