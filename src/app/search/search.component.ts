import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigurationService } from '../configuration.service';
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
  size: number;

  constructor(
    private messagesProvider: MessagesProviderService,
    private route: ActivatedRoute,
    private searchEmitter: SearchService,
    private configuration: ConfigurationService
    ) {
      super();
    }

  getRouterParams() {
    return {
      page: this.page.toString(10),
      size: this.size.toString(10),
      q: this.q
    };
  }

  getRouterPath(): string {
    return '/search';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.page = this.getPage(params);
      this.size = this.getPageSize(params, this.configuration);
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
      .search(this.q, this.page, this.size)
      .then(data => this.renderResponse(data, this));
  }
}
