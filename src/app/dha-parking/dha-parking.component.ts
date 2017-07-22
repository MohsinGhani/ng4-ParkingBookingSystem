import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service'

@Component({
  selector: 'app-dha-parking',
  templateUrl: './dha-parking.component.html',
  styleUrls: ['./dha-parking.component.css']
})
export class DhaParkingComponent implements OnInit {

  bookingData = {date:'' ,timeSlot:'',reserveHours:'',slotNumber:'',day:0 ,month:0,year:0,place:'DHA'};
  dateAlert = false;
  timeAlert = false;
  selectTimeMode = true;
  selectSlotMode = false;
  agreeWithInfoMode = false;
  successMode = false;
  from = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];
  reserveHour = [1,2,3,4,5,6,7,8,9];
  slots=[];

  constructor(private _UserService:UserService) {
    _UserService.getDHAReservedSlots();
  }

  ngOnInit() {
  }

  selectTime(){
    if(this.dateValidation()){
        if(this.timeValidation()){
            this.slots = this._UserService.configurationOfDHAslots(this.bookingData);
            this.dateAlert = false;
            this.timeAlert = false;
            this.selectTimeMode = false;
            this.selectSlotMode = true;
        }
        else{
          this.timeAlert = true;
        };
    }
    else{
      this.dateAlert = true;
    };
  }

  dateValidation(){
    var userDate = new Date(this.bookingData.date).getDate();
    var currentDate =  new Date().getDate()-1;

    var userMonth = new Date(this.bookingData.date).getMonth();
    var currentMonth = new Date().getMonth();

    var userYear = new Date(this.bookingData.date).getFullYear();
    var currentYear = new Date().getFullYear();
 
    var finalUserDate = new Date(userMonth,userDate,userYear).getTime();
    var finalCurrentDate = new Date(currentMonth,currentDate,currentYear).getTime();

    this.bookingData.day = userDate+1;
    this.bookingData.month = userMonth+1;
    this.bookingData.year = userYear;

    if(finalUserDate >= finalCurrentDate){
      return true;
    }
    else if(finalUserDate < finalCurrentDate){
      return false
    }
  }

  timeValidation(){
    let startTime = parseInt(this.bookingData.timeSlot);
    let reserveHour = parseInt(this.bookingData.reserveHours);
    let from = startTime;
    let to = from + reserveHour;
    if(to > 21){
      return false;
    }
    else{
      return true;
    }
  }

  backToSelectTimeMode(){
    this._UserService.refreshDHASlots();
    this.selectTimeMode = true;
    this.selectSlotMode = false;
    this.agreeWithInfoMode = false;
  }

  backToSelectSlotMode (){
    this.selectTimeMode = false;
    this.selectSlotMode = true;
    this.agreeWithInfoMode = false;
  }

  bookSlot(slotNumber){
    this.bookingData.slotNumber = slotNumber;
    this.bookingData = this._UserService.configurationOfParkingData(this.bookingData);
    this.selectTimeMode = false;
    this.selectSlotMode = false;
    this.agreeWithInfoMode = true;
  }

  agree(){
    if(this._UserService.reserveDHAslot(this.bookingData)){
      this.selectTimeMode = false;
      this.selectSlotMode = false;
      this.agreeWithInfoMode = false;
      this.successMode = true;
    };
  }

  disagree(){
    this.selectTimeMode = true;
    this.selectSlotMode = false;
    this.agreeWithInfoMode = false;
  }
}
