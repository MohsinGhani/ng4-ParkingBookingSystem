import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-to',
  templateUrl: './chat-to.component.html',
  styleUrls: ['./chat-to.component.css']
})
export class ChatToComponent implements OnInit {
  @Input() messages: any;
  constructor() { }

  ngOnInit() {
  }

}
