import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesLoaderService {
  readonly messagesUrl: string = 'assets/messages.json';

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get<Messages>(this.messagesUrl);
  }

}
