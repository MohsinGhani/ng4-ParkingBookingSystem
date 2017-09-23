import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service'
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
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
      'message' : [null, Validators.compose([Validators.required])]
    })


    let date = '2017-9-19';
    // let day = new Date().getDate()
    // let month = new Date().getMonth();
    // let year = new Date().getFullYear()
    // let currentDate = `${year}-${month+1}-${day}`
    // console.log('date', date)
    // console.log('current date', currentDate)
    // console.log('121: isValid', moment(date, "YYYY MM DD").isValid());
    // console.log('122: isBefore', moment(date).isBefore(currentDate))
    // console.log('123: isAfter',moment(date).isAfter(currentDate));
    // console.log('124: isSame', moment(date).isSame(currentDate));
    // console.log('125: isSameOrAfter', moment(date).isSameOrAfter(currentDate)); // usable for this project
    // console.log('126: isSameOrBefore', moment(date).isSameOrBefore(currentDate))
    // let isDateValid = moment(date).isSameOrAfter(currentDate) && moment(date, "YYYY MM DD").isValid() ? true:false;
    // console.log('isDateValid',isDateValid)

    console.log('isSame date = ',moment(date).isSame('9-19-2017'))

  }

  ngOnInit() {
  }

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
