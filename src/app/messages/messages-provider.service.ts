import { Injectable } from '@angular/core';
import { Message, MessageResponse, Messages } from './messages';
import { MessagesLoaderService } from './messages-loader.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesProviderService {

  messages: Message[];

  protected status: LoadingStatus = LoadingStatus.Waiting;
  protected readyCallbacks: Function[] = [];

  constructor(private messagesLoader: MessagesLoaderService) { }

  protected load() {
    if (this.status !== LoadingStatus.Waiting) {
      return;
    }

    this.status = LoadingStatus.Loading;

    this.messagesLoader.getMessages()
      .subscribe((messages: Messages) => {
        this.messages = Object.values(messages)
          .filter(this.filterMessage)
          .map(this.addUrl, this)
          .map(this.addImageUrl, this)
          .map(this.addTokens, this);

        this.status = LoadingStatus.Loaded;
        this.readyCallbacks.forEach((cb: Function) => cb.call(this));
        this.readyCallbacks = [];
      })
  }

  protected filterMessage(message: Message): boolean {
    return message.question != null
      && message.skip !== true
      && message.answered === true;
  }

  protected addUrl(message: Message): Message {
    const url: URL = new URL('/threads/133415-expertcpc', 'https://forum.canardpc.com/');
    message.url = url;

    const parts: string[] = message.id.split('_');

    if (parts.length !== 2) {
      return message;
    }

    const numericalId: number = parseInt(<string> parts.pop(), 10);
    
    url.hash = 'post' + numericalId.toString(10);
    url.searchParams.set('viewfull', '1');
    url.searchParams.set('p', numericalId.toString(10));

    return message;
  }

  protected addImageUrl(message: Message): Message {
    if (message.mode !== 'image') {
      return message;
    }

    if (message.answer.indexOf('[IMG]') < 0) {
      return message;
    }

    message.imageUrl = message.answer.replace('[IMG]', '').replace('[/IMG]', '').trim();

    return message;
  }

  protected addTokens(message: Message): Message {
    let tokens: string = message.mode?.replace('#', '') + ' ' + message.username + ' ' + message.question;
    tokens = this.normalize(tokens);

    message.tokens = tokens;

    return message;
  }

  protected whenReady(callback: Function): void {
    if (this.status === LoadingStatus.Loaded) {
      return callback.call(this);
    }

    this.readyCallbacks.push(callback);
    this.load();
  }

  normalize(str: string): string {
    let tokens = str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    tokens = tokens.toLowerCase().trim();

    return tokens;
  }

  match(message: Message, q: string): boolean {
    if (q.startsWith('#')) {
      const mode: string = q.substring(1).toLowerCase();

      if (message.mode === mode) {
        return true;
      }
    }

    const searchQuery: string = this.normalize(q);

    if (!message.tokens) {
      return false;
    }

    if (message.tokens.indexOf(searchQuery) >= 0) {
      return true;
    }

    return false;
  }

  protected createResponse(page: number, size: number): MessageResponse {
      return {
        messages: [],
        page: page,
        pageSize: size,
        pages: 0,
        total: 0
      };
  }

  async search(q: string, page: number = 1, size: number = 15): Promise<MessageResponse> {
    return new Promise((resolve: Function, reject: Function) => {
      this.whenReady(() => {
        const response: MessageResponse = this.createResponse(page, size);

        const matches: Message[] = this.messages.filter(
          (message: Message) => this.match(message, q)
        );

        const start: number = -(size * page);
        const end: number = matches.length - (size * (page - 1));

        if (end < 0) {
          return resolve(response);
        }

        response.total = matches.length;
        response.messages = matches.slice(start, end).reverse();
        response.pages = Math.ceil(response.total / response.pageSize);

        return resolve(response);
      });
    })
  }

  async getRecent(page: number = 1, size: number = 15): Promise<MessageResponse> {
    return new Promise((resolve: Function, reject: Function) => {
      this.whenReady(() => {
        const response: MessageResponse = this.createResponse(page, size);

        const start: number = -(size * page);
        const end: number = this.messages.length - (size * (page - 1));

        if (end < 0) {
          return resolve(response);
        }

        response.total = this.messages.length;
        response.messages = this.messages.slice(start, end).reverse()
        response.pages = Math.ceil(response.total / response.pageSize);
        
        return resolve(response);
      });
    })
  }

}

enum LoadingStatus {
  Waiting,
  Loading,
  Loaded,
  Error
}