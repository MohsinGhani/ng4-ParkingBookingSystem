import { Component } from '@angular/core';
import { ConfigSlotsService } from "./config-slots.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private _ConfigSlotsService: ConfigSlotsService){
    
  }
}
