import { Component, OnInit } from '@angular/core';
import { AdminService } from './../services/admin.service';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {
  feedUserData = [];
  feeds = [{message:'',name:''}]
  listMode = true;
  feedsMode = false;
  name;
  reply = {message:'',name:'Admin'}
  currentUserKey;
  constructor(private _AdminService:AdminService ,private _AngularFireDatabase:AngularFireDatabase) {
    this.feedUserData = _AdminService.clearFeedsUsers();
    this.feedUserData = _AdminService.getFeedsUsers();
  }

  ngOnInit() {
  }

  showMessage(index){
    this.feeds = this._AdminService.showMessage(this.feedUserData[index].key,index);
    this.name = this.feedUserData[index].name;
    this.currentUserKey = this.feedUserData[index].key;
    this.feedsMode = true;
    this.listMode = false;
  }

  showList(){
    this.feedsMode = false;
    this.listMode = true;
  }

  replyToUser(){
    this._AdminService.replyToUser(this.reply,this.currentUserKey);
    this.reply.message = null;
  }

}
