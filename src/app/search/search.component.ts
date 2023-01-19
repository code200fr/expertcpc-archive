import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageListComponent } from '../messages/message-list.component';
import { Message, MessageResponse } from '../messages/messages';
import { MessagesProviderService } from '../messages/messages-provider.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './../messages/message-list.component.html'
})
export class SearchComponent extends MessageListComponent implements OnInit, OnDestroy {
  @Input() page: number = 1;
  @Input() q: string = '';

  constructor(
    private messagesProvider: MessagesProviderService,
    private route: ActivatedRoute,
    private searchEmitter: SearchService
    ) {
      super();
    }

  getRouterParams() {
    return {
      page: this.page.toString(10),
      q: this.q
    };
  }

  getRouterPath(): string {
    return '/search';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.page = parseInt(params['page'], 10);

      if (!this.page || this.page < 1) {
        this.page = 1;
      }

      this.q = params['q'];

      this.load();
    })
  }

  ngOnDestroy(): void {
    this.searchEmitter.setQuery('');
  }

  protected load() {
    this.searchEmitter.setQuery(this.q);

    this.messagesProvider
      .search(this.q, this.page)
      .then(data => this.renderResponse(data, this));
  }
}
