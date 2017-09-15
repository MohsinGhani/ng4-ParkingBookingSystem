import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service'
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

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
