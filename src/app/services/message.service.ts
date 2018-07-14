import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() { }

  messages: string[] = [];

  add(message: string, object?: any) {
    this.messages.push(message);
    !object ? console.log(message) : console.log(message, object);
  }

  clear() {
    this.messages = [];
  }

}
