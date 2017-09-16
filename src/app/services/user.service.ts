import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {  AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
  CDGKslots =[{"isReserve":false, "number":1},{"isReserve" : false,"number" : 2}, {"isReserve" : false,"number" : 3},
      {"isReserve" : false,"number" : 4},{"isReserve" : false,"number" : 5}, {"isReserve" : false,"number" : 6},
      {"isReserve" : false,"number" : 7},{"isReserve" : false,"number" : 8},{"isReserve" : false,"number" : 9},
      {"isReserve" : false,"number" : 10},{"isReserve" : false,"number" : 11},{"isReserve" : false,"number" : 12},
      {"isReserve" : false,"number" : 13},{"isReserve" : false,"number" : 14},{"isReserve" : false,"number" : 15},
      {"isReserve" : false,"number" : 16},{"isReserve" : false,"number" : 17},{"isReserve" : false,"number" : 18},
      {"isReserve" : false,"number" : 19},{"isReserve" : false,"number" : 20},{"isReserve" : false,"number" : 21},
      {"isReserve" : false,"number" : 22},{"isReserve" : false,"number" : 23},{"isReserve" : false,"number" : 24},
      {"isReserve" : false,"number" : 25},{"isReserve" : false,"number" : 26},{"isReserve" : false,"number" : 27},
      {"isReserve" : false,"number" : 28},{"isReserve" : false,"number" : 29},{"isReserve" : false,"number" : 30},
      {"isReserve" : false,"number" : 31},{"isReserve" : false,"number" : 32},{"isReserve" : false,"number" : 33},
      {"isReserve" : false,"number" : 34},{"isReserve" : false,"number" : 35},{"isReserve" : false,"number" : 36},
      {"isReserve" : false,"number" : 37},{"isReserve" : false,"number" : 38},{"isReserve" : false,"number" : 39},
      {"isReserve" : false,"number" : 40},{"isReserve" : false,"number" : 41},{"isReserve" : false,"number" : 42},
      {"isReserve" : false,"number" : 43},{"isReserve" : false,"number" : 44},{"isReserve" : false,"number" : 45},
      {"isReserve" : false,"number" : 46},{"isReserve" : false,"number" : 47},{"isReserve" : false,"number" : 48},
      {"isReserve" : false,"number" : 49},{"isReserve" : false,"number" : 50},{"isReserve" : false,"number" : 51},
      {"isReserve" : false,"number" : 52},{"isReserve" : false,"number" : 53},{"isReserve" : false,"number" : 54},
      {"isReserve" : false,"number" : 55},{"isReserve" : false,"number" : 56},{"isReserve" : false,"number" : 57},
      {"isReserve" : false,"number" : 58},{"isReserve" : false,"number" : 59},{"isReserve" : false,"number" : 60},
      {"isReserve" : false,"number" : 61},{"isReserve" : false,"number" : 62},{"isReserve" : false,"number" : 63},
      ];

  GulshanSlots = [{"isReserve":false, "number":1},{"isReserve" : false,"number" : 2}, {"isReserve" : false,"number" : 3},
      {"isReserve" : false,"number" : 4},{"isReserve" : false,"number" : 5}, {"isReserve" : false,"number" : 6},
      {"isReserve" : false,"number" : 7},{"isReserve" : false,"number" : 8},{"isReserve" : false,"number" : 9},
      {"isReserve" : false,"number" : 10},{"isReserve" : false,"number" : 11},{"isReserve" : false,"number" : 12},
      {"isReserve" : false,"number" : 13},{"isReserve" : false,"number" : 14},{"isReserve" : false,"number" : 15},
      {"isReserve" : false,"number" : 16},{"isReserve" : false,"number" : 17},{"isReserve" : false,"number" : 18},
      {"isReserve" : false,"number" : 19},{"isReserve" : false,"number" : 20},{"isReserve" : false,"number" : 21},
      {"isReserve" : false,"number" : 22},{"isReserve" : false,"number" : 23},{"isReserve" : false,"number" : 24},
      {"isReserve" : false,"number" : 25},{"isReserve" : false,"number" : 26},{"isReserve" : false,"number" : 27}
      ];

  DHAslots =[{"isReserve":false, "number":1},{"isReserve" : false,"number" : 2}, {"isReserve" : false,"number" : 3},
      {"isReserve" : false,"number" : 4},{"isReserve" : false,"number" : 5}, {"isReserve" : false,"number" : 6},
      {"isReserve" : false,"number" : 7},{"isReserve" : false,"number" : 8},{"isReserve" : false,"number" : 9},
      {"isReserve" : false,"number" : 10},{"isReserve" : false,"number" : 11},{"isReserve" : false,"number" : 12},
      {"isReserve" : false,"number" : 13},{"isReserve" : false,"number" : 14},{"isReserve" : false,"number" : 15},
      {"isReserve" : false,"number" : 16},{"isReserve" : false,"number" : 17},{"isReserve" : false,"number" : 18},
      {"isReserve" : false,"number" : 19},{"isReserve" : false,"number" : 20},{"isReserve" : false,"number" : 21},
      {"isReserve" : false,"number" : 22},{"isReserve" : false,"number" : 23},{"isReserve" : false,"number" : 24},
      {"isReserve" : false,"number" : 25},{"isReserve" : false,"number" : 26},{"isReserve" : false,"number" : 27},
      {"isReserve" : false,"number" : 28},{"isReserve" : false,"number" : 29},{"isReserve" : false,"number" : 30},
      {"isReserve" : false,"number" : 31},{"isReserve" : false,"number" : 32},{"isReserve" : false,"number" : 33},
      {"isReserve" : false,"number" : 34},{"isReserve" : false,"number" : 35},{"isReserve" : false,"number" : 36},
      {"isReserve" : false,"number" : 37},{"isReserve" : false,"number" : 38},{"isReserve" : false,"number" : 39},
      {"isReserve" : false,"number" : 40},{"isReserve" : false,"number" : 41},{"isReserve" : false,"number" : 42},
      {"isReserve" : false,"number" : 43},{"isReserve" : false,"number" : 44},{"isReserve" : false,"number" : 45}
      ];

  //public isSignIn: Observable<boolean>;
  constructor(public _AngularFireAuth: AngularFireAuth, public _AngularFireDatabase: AngularFireDatabase, public _Router: Router,private _Location:Location) {
    //checking user is login or not
    // this._AngularFireAuth.authState.subscribe((user: firebase.User)=>{
    //   if(user){
    //     console.log('User is login as',user);
    //   }
    //   else{
    //     console.log('User is not login');
    //   }
    // });
    /////////////////////////////////////////////////////////////////
    // this.isSignIn = this._AngularFireAuth.authState.map<firebase.User,boolean>((user:firebase.User)=>{
    //   return user != null;
    // })
  }
  userData = [];
  userKeys = [];
  currentUserEmail;
  currentUserData;
  currentUserKey;
  reservedSlotsOfCDGK = [];
  reservedSlotsOfGulshan = [];
  reservedSlotsOfDHA = [];

  signUp(data:any){
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then((currentUser) => {
      //successfully login, create user profile
      data.name = "";
      data.address = "";
      data.phone = "";
      data.status = "active";
      firebase.database().ref('users').child(currentUser.uid).set(data);
    }).then((successfull) => {
            localStorage.setItem('currentUserEmail', data.email);
            this.storeCurrentUser();
            this._Router.navigate(['/user-dashboard']);
        }).catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
    });
  }

  signIn(data:any): any{
    this.userData.forEach((member, index)=>{
       if (member.status == "active" && member.email == data.email){
            //login authentication with firebase
            firebase.auth().signInWithEmailAndPassword(data.email, data.password).then((successfull) => {
                localStorage.setItem('currentUserEmail', data.email);
                this.storeCurrentUser();
                this._Router.navigate(['/user-dashboard']);
            }).catch(function(error) {
              // Handle Errors here.
              var errorMessage = error.message;
            });
       }
       else if(member.status == "de-active"){
          alert("Your Are blocked!");
         }
    })   
  }

  logout(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).then((successfull) => {
        this._Router.navigate(['/user-login']);
    }).catch(function(error) {
        // An error happened.
    });
    localStorage.setItem('currentUserEmail', null);
    localStorage.setItem('currentUserKey', null);
    localStorage.setItem('currentUserData', null );
  }

  isLogin(){
    this._AngularFireAuth.authState.subscribe((user: firebase.User)=>{
      if(user){
        // console.log('User is login as',user);
        this._Router.navigate(['/user-dashboard']);
      }
      // else{
      //   console.log('User is not login');
      // }
    });
  }

  fetchUsers() {
      firebase.database().ref('/users/').on('child_added', (snapshot) => {
        this.userData.push(snapshot.val());
      });

      firebase.database().ref('/users/').on('child_added', (snapshot) => {
        this.userKeys.push(snapshot.key);
      });
  }

  //store curent user data in localstorage
  storeCurrentUser(){
    let i;
    this.currentUserEmail = localStorage.getItem('currentUserEmail');
    this.userData.forEach((member, index)=>{
       if(this.currentUserEmail == member.email){
         i = index;
       }
    })
    localStorage.setItem('currentUserData',JSON.stringify(this.userData[i]) );
    localStorage.setItem('currentUserKey', this.userKeys[i]);
  }

  getCurrentUser(){
    let currentUser:any;
    this.currentUserKey = localStorage.getItem('currentUserKey');
    currentUser = JSON.parse(localStorage.getItem("currentUserData")) || [];
    return currentUser;
  }

  //just for user nav
  getUserName(){
    this.currentUserKey = localStorage.getItem('currentUserKey');
    return this._AngularFireDatabase.object('/users/' + this.currentUserKey);
  }

  checkUserProfile() {
    let currentUser = JSON.parse(localStorage.getItem("currentUserData")) || [];
     if(currentUser.name == "" && currentUser.address == "" && currentUser.phone == ""){
        this._Router.navigate(['user-dashboard/user-profile']);
     };
  }

  updateProfile(data:any) {
    this.currentUserKey = localStorage.getItem('currentUserKey');
    data.status = 'active';
    localStorage.setItem('currentUserData',JSON.stringify(data) );
    firebase.database().ref('users').child(this.currentUserKey).set(data);

  }

  configurationOfParkingData(data:any){
    //get current user data
    let currentUser:any;
    this.currentUserKey = localStorage.getItem('currentUserKey');
    currentUser = JSON.parse(localStorage.getItem("currentUserData")) || [];

    //update data or add some properties in data object
    let startTime = parseInt(data.timeSlot);
    let reservedHours = parseInt(data.reserveHours);
    data.startTime = startTime;
    data.endTime = startTime + reservedHours;
    data.price = reservedHours*100; //Rs.100 per hour
    data.email = currentUser.email;
    data.name = currentUser.name;
    data.phone = currentUser.phone;
    data.timeSlot = data.timeSlot + " to " +  data.endTime + ":00";
    return data;
  }


  getCDGKbooking() {
      this.currentUserKey = localStorage.getItem('currentUserKey');
      // console.log(this.currentUserKey)
      return this._AngularFireDatabase.list('/CDGKreservedSlotsList', {
              query: {
                orderByChild: 'key',
                equalTo: this.currentUserKey
              }
      });
  }

  cancelCDGKBooking(key) {
    this._AngularFireDatabase.list('/CDGKreservedSlotsList').remove(key);
  }

  //////////////// gulshan booking start ///////////////////////////////
  getGulshanBooking() {

      this.currentUserKey = localStorage.getItem('currentUserKey');
      return this._AngularFireDatabase.list('/gulshanReservedSlotsList', {
              query: {
                orderByChild: 'key',
                equalTo: this.currentUserKey
              }
      });
      //get booking data
      // firebase.database().ref('/gulshanReservedSlotsList/').on('child_added', (snapshot) => {
      //     if(snapshot.val().key == this.currentUserKey){
      //       this.currentUserGulshanBooking.push(snapshot.val());
      //     }
      // });
      // //get booking data
      // firebase.database().ref('/gulshanReservedSlotsList/').on('child_added', (snapshot) => {
      //     if(snapshot.val().key == this.currentUserKey){
      //       this.currentUserGulshanBookingKeys.push(snapshot.key);
      //     }
      // });
      // return this.currentUserGulshanBooking;
  }

  cancelGulshanBooking(key) {
    this._AngularFireDatabase.list('/gulshanReservedSlotsList').remove(key);
  }
  ////////////////////DHA booking start //////////////////////////

  getDHAbooking(){
      this.currentUserKey = localStorage.getItem('currentUserKey');
      return this._AngularFireDatabase.list('/DHAreservedSlotsList', {
              query: {
                orderByChild: 'key',
                equalTo: this.currentUserKey
              }
      });
      //get booking data
      // firebase.database().ref('/DHAreservedSlotsList/').on('child_added', (snapshot) => {
      //     if(snapshot.val().key == this.currentUserKey){
      //       this.currentUserDHAbooking.push(snapshot.val());
      //     }
      // });
      // //get booking data
      // firebase.database().ref('/DHAreservedSlotsList/').on('child_added', (snapshot) => {
      //     if(snapshot.val().key == this.currentUserKey){
      //       this.currentUserDHAbookingKeys.push(snapshot.key);
      //     }
      // });
      // return this.currentUserDHAbooking;
  }

  cancelDHABooking(key){
    this._AngularFireDatabase.list('/DHAreservedSlotsList').remove(key); 
  }

  //this function is call from user dashboard for clear reserve slot data
  //and stop repeatation of objects in the arrays
  clearReserveSlots(){
    this.reservedSlotsOfGulshan = [{"isReserve":false, "number":0}];
    this.reservedSlotsOfCDGK = [{"isReserve":false, "number":0}];
  }

  reserveCDGKslot(data:any){
    this.currentUserKey = localStorage.getItem('currentUserKey');
    data.key = this.currentUserKey;
    firebase.database().ref('CDGKreservedSlotsList').push(data);
    return true;
  }

  getCDGKReservedSlots(){
    firebase.database().ref('/CDGKreservedSlotsList/').on('child_added', (snapshot) => {
        this.reservedSlotsOfCDGK.push(snapshot.val());
    });
  }

  configurationOfCDGKslots(currentSlotData:any){
    let date = [];
    let month = [];
    let year = [];
    let startTime = [];
    let endTime = [];
    let slots = [];
    let reservedHours = [];
    this.reservedSlotsOfCDGK.forEach((slot, index)=>{
       date.push(slot.day);
       month.push(slot.month);
       year.push(slot.year);
       startTime.push(slot.startTime);
       endTime.push(slot.endTime);
       slots.push(slot.slotNumber);
       reservedHours.push(slot.reservedHours);
    })

    let currentStartTime = parseInt(currentSlotData.timeSlot);
    let currentEndTime = currentStartTime + parseInt(currentSlotData.reserveHours);
    slots.forEach((reservedSlot, i)=>{
       if(year[i] == currentSlotData.year){
          if(month[i] == currentSlotData.month){
            if(date[i] == currentSlotData.day){
              let duration = [];
              let CurrentDuration = [];
              for(let index = startTime[i]; index < endTime[i]; index++){
                  duration.push(index);
              }
              for(let index = currentStartTime; index < currentEndTime; index++){
                  CurrentDuration.push(index);
              }

              for(let index = 0; index<duration.length;index++){
                  for(let index1 = 0; index1<CurrentDuration.length; index1++){
                      if(duration[index] == CurrentDuration[index1]){
                          this  .CDGKslots[slots[i]-1].isReserve = true;
                      }
                  }
              }
            }
          }
       }
    })
    return this.CDGKslots;
  }

  ///////////////////// Gulshan booking start ////////////////////////
  reserveGulshanSlot(data:any){
    this.currentUserKey = localStorage.getItem('currentUserKey');
    data.key = this.currentUserKey;
    firebase.database().ref('gulshanReservedSlotsList').push(data);
    return true;
  }

  getGulshanReservedSlots(){
    firebase.database().ref('/gulshanReservedSlotsList/').on('child_added', (snapshot) => {
        this.reservedSlotsOfGulshan.push(snapshot.val());
    });
  }

  configurationOfGulshanSlots(currentSlotData:any){
    let date = [];
    let month = [];
    let year = [];
    let startTime = [];
    let endTime = [];
    let slots = [];
    let reservedHours = [];
    this.reservedSlotsOfGulshan.forEach((slot, index)=>{
       date.push(slot.day);
       month.push(slot.month);
       year.push(slot.year);
       startTime.push(slot.startTime);
       endTime.push(slot.endTime);
       slots.push(slot.slotNumber);
       reservedHours.push(slot.reservedHours);
    })

    let currentStartTime = parseInt(currentSlotData.timeSlot);
    let currentEndTime = currentStartTime + parseInt(currentSlotData.reserveHours);
    slots.forEach((reservedSlot, i)=>{
       if(year[i] == currentSlotData.year){
          if(month[i] == currentSlotData.month){
            if(date[i] == currentSlotData.day){
              let duration = [];
              let CurrentDuration = [];
              for(let index = startTime[i]; index < endTime[i]; index++){
                  duration.push(index);
              }
              for(let index = currentStartTime; index < currentEndTime; index++){
                  CurrentDuration.push(index);
              }

              for(let index = 0; index<duration.length;index++){
                  for(let index1 = 0; index1<CurrentDuration.length; index1++){
                      if(duration[index] == CurrentDuration[index1]){
                          this  .GulshanSlots[slots[i]-1].isReserve = true;
                      }
                  }
              }
            }
          }
       }
    })
    return this.GulshanSlots;
  }

  ////////////////////////// DHA Booking Start ////////////////////////
  reserveDHAslot(data:any){
    this.currentUserKey = localStorage.getItem('currentUserKey');
    data.key = this.currentUserKey;
    firebase.database().ref('DHAreservedSlotsList').push(data);
    return true;
  }

  getDHAReservedSlots(){
    firebase.database().ref('/DHAreservedSlotsList/').on('child_added', (snapshot) => {
        this.reservedSlotsOfDHA.push(snapshot.val());
    });
  }

  configurationOfDHAslots(currentSlotData:any){
    let date = [];
    let month = [];
    let year = [];
    let startTime = [];
    let endTime = [];
    let slots = [];
    let reservedHours = [];
    this.reservedSlotsOfDHA.forEach((slot, index)=>{
       date.push(slot.day);
       month.push(slot.month);
       year.push(slot.year);
       startTime.push(slot.startTime);
       endTime.push(slot.endTime);
       slots.push(slot.slotNumber);
       reservedHours.push(slot.reservedHours);
    });
    let currentStartTime = parseInt(currentSlotData.timeSlot);
    let currentEndTime = currentStartTime + parseInt(currentSlotData.reserveHours);
    slots.forEach((reservedSlot, i)=>{
       if(year[i] == currentSlotData.year){
          if(month[i] == currentSlotData.month){
            if(date[i] == currentSlotData.day){
              let duration = [];
              let CurrentDuration = [];
              for(let index = startTime[i]; index < endTime[i]; index++){
                  duration.push(index);
              }
              for(let index = currentStartTime; index < currentEndTime; index++){
                  CurrentDuration.push(index);
              }

              for(let index = 0; index<duration.length;index++){
                  for(let index1 = 0; index1<CurrentDuration.length; index1++){
                      if(duration[index] == CurrentDuration[index1]){
                          this.DHAslots[slots[i]-1].isReserve = true;
                      }
                  }
              }
            }
          }
       }
    })
    return this.DHAslots;
  }

  feedback(data:any) {
    let currentUser:any;
    this.currentUserKey = localStorage.getItem('currentUserKey');
    currentUser = JSON.parse(localStorage.getItem("currentUserData")) || [];
    data.name = currentUser.name;
    firebase.database().ref('feedback').child(this.currentUserKey).push(data);
  }

  ////////////////////////////////////////////////////////////////////
  refreshCDGKslots() {
    this.CDGKslots = [{"isReserve":false, "number":1},{"isReserve" : false,"number" : 2}, {"isReserve" : false,"number" : 3},
      {"isReserve" : false,"number" : 4},{"isReserve" : false,"number" : 5}, {"isReserve" : false,"number" : 6},
      {"isReserve" : false,"number" : 7},{"isReserve" : false,"number" : 8},{"isReserve" : false,"number" : 9},
      {"isReserve" : false,"number" : 10},{"isReserve" : false,"number" : 11},{"isReserve" : false,"number" : 12},
      {"isReserve" : false,"number" : 13},{"isReserve" : false,"number" : 14},{"isReserve" : false,"number" : 15},
      {"isReserve" : false,"number" : 16},{"isReserve" : false,"number" : 17},{"isReserve" : false,"number" : 18},
      {"isReserve" : false,"number" : 19},{"isReserve" : false,"number" : 20},{"isReserve" : false,"number" : 21},
      {"isReserve" : false,"number" : 22},{"isReserve" : false,"number" : 23},{"isReserve" : false,"number" : 24},
      {"isReserve" : false,"number" : 25},{"isReserve" : false,"number" : 26},{"isReserve" : false,"number" : 27},
      {"isReserve" : false,"number" : 28},{"isReserve" : false,"number" : 29},{"isReserve" : false,"number" : 30},
      {"isReserve" : false,"number" : 31},{"isReserve" : false,"number" : 32},{"isReserve" : false,"number" : 33},
      {"isReserve" : false,"number" : 34},{"isReserve" : false,"number" : 35},{"isReserve" : false,"number" : 36},
      {"isReserve" : false,"number" : 37},{"isReserve" : false,"number" : 38},{"isReserve" : false,"number" : 39},
      {"isReserve" : false,"number" : 40},{"isReserve" : false,"number" : 41},{"isReserve" : false,"number" : 42},
      {"isReserve" : false,"number" : 43},{"isReserve" : false,"number" : 44},{"isReserve" : false,"number" : 45},
      {"isReserve" : false,"number" : 46},{"isReserve" : false,"number" : 47},{"isReserve" : false,"number" : 48},
      {"isReserve" : false,"number" : 49},{"isReserve" : false,"number" : 50},{"isReserve" : false,"number" : 51},
      {"isReserve" : false,"number" : 52},{"isReserve" : false,"number" : 53},{"isReserve" : false,"number" : 54},
      {"isReserve" : false,"number" : 55},{"isReserve" : false,"number" : 56},{"isReserve" : false,"number" : 57},
      {"isReserve" : false,"number" : 58},{"isReserve" : false,"number" : 59},{"isReserve" : false,"number" : 60},
      {"isReserve" : false,"number" : 61},{"isReserve" : false,"number" : 62},{"isReserve" : false,"number" : 63},
      ];
  }

  refreshGulshanSlots() {
    this.GulshanSlots = [{"isReserve":false, "number":1},{"isReserve" : false,"number" : 2}, {"isReserve" : false,"number" : 3},
      {"isReserve" : false,"number" : 4},{"isReserve" : false,"number" : 5}, {"isReserve" : false,"number" : 6},
      {"isReserve" : false,"number" : 7},{"isReserve" : false,"number" : 8},{"isReserve" : false,"number" : 9},
      {"isReserve" : false,"number" : 10},{"isReserve" : false,"number" : 11},{"isReserve" : false,"number" : 12},
      {"isReserve" : false,"number" : 13},{"isReserve" : false,"number" : 14},{"isReserve" : false,"number" : 15},
      {"isReserve" : false,"number" : 16},{"isReserve" : false,"number" : 17},{"isReserve" : false,"number" : 18},
      {"isReserve" : false,"number" : 19},{"isReserve" : false,"number" : 20},{"isReserve" : false,"number" : 21},
      {"isReserve" : false,"number" : 22},{"isReserve" : false,"number" : 23},{"isReserve" : false,"number" : 24},
      {"isReserve" : false,"number" : 25},{"isReserve" : false,"number" : 26},{"isReserve" : false,"number" : 27}
      ];
  }

  refreshDHASlots() {
    this.DHAslots =[{"isReserve":false, "number":1},{"isReserve" : false,"number" : 2}, {"isReserve" : false,"number" : 3},
        {"isReserve" : false,"number" : 4},{"isReserve" : false,"number" : 5}, {"isReserve" : false,"number" : 6},
        {"isReserve" : false,"number" : 7},{"isReserve" : false,"number" : 8},{"isReserve" : false,"number" : 9},
        {"isReserve" : false,"number" : 10},{"isReserve" : false,"number" : 11},{"isReserve" : false,"number" : 12},
        {"isReserve" : false,"number" : 13},{"isReserve" : false,"number" : 14},{"isReserve" : false,"number" : 15},
        {"isReserve" : false,"number" : 16},{"isReserve" : false,"number" : 17},{"isReserve" : false,"number" : 18},
        {"isReserve" : false,"number" : 19},{"isReserve" : false,"number" : 20},{"isReserve" : false,"number" : 21},
        {"isReserve" : false,"number" : 22},{"isReserve" : false,"number" : 23},{"isReserve" : false,"number" : 24},
        {"isReserve" : false,"number" : 25},{"isReserve" : false,"number" : 26},{"isReserve" : false,"number" : 27},
        {"isReserve" : false,"number" : 28},{"isReserve" : false,"number" : 29},{"isReserve" : false,"number" : 30},
        {"isReserve" : false,"number" : 31},{"isReserve" : false,"number" : 32},{"isReserve" : false,"number" : 33},
        {"isReserve" : false,"number" : 34},{"isReserve" : false,"number" : 35},{"isReserve" : false,"number" : 36},
        {"isReserve" : false,"number" : 37},{"isReserve" : false,"number" : 38},{"isReserve" : false,"number" : 39},
        {"isReserve" : false,"number" : 40},{"isReserve" : false,"number" : 41},{"isReserve" : false,"number" : 42},
        {"isReserve" : false,"number" : 43},{"isReserve" : false,"number" : 44},{"isReserve" : false,"number" : 45}
        ];
  }
}
