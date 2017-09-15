import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service'
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feeds: FormGroup;
  feedsMsg: FirebaseListObservable<any>;
  feedbackFormMode = true;
  feedbackChattingMode = false;
  constructor(private _FormBuilder: FormBuilder, private _UserService: UserService, private _AngularFireDatabase: AngularFireDatabase) {
    _UserService.checkUserProfile();
    let currentUserKey = localStorage.getItem('currentUserKey');
    this.feedsMsg = _AngularFireDatabase.list('/feedback/' + currentUserKey);
    this.feeds = _FormBuilder.group({
      'message' : [null, Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
  }

  feedback() {
    this._UserService.feedback(this.feeds.value);
    this.feeds.reset();
    this.showFeedsMsg();
  }

  showFeedsForm() {
    this.feedbackFormMode = true;
    this.feedbackChattingMode = false;
  }

  showFeedsMsg() {
    this.feedbackFormMode = false;
    this.feedbackChattingMode = true;
  }

}
