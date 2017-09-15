import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-from',
  templateUrl: './chat-from.component.html',
  styleUrls: ['./chat-from.component.css']
})
export class ChatFromComponent implements OnInit {
  @Input() messages: any;
  constructor() { }

  ngOnInit() {
  }

}
