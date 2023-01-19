import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Messages } from './messages';
import { ConfigurationService } from '../configuration.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesLoaderService {
  constructor(
    private http: HttpClient,
    private configuration: ConfigurationService
    ) { }

  getMessages() {
    return this.http.get<Messages>(
      this.configuration.get('dataUrl')
    );
  }

}