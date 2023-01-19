import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Message, MessageResponse } from '../messages/messages';
import { MessagesProviderService } from '../messages/messages-provider.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() page: number = 1;
  @Input() q: string = '';

  response: MessageResponse;

  constructor(private messagesProvider: MessagesProviderService, private route: ActivatedRoute, private searchEmitter: SearchService) {

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

    this.messagesProvider.search(this.q, this.page)
      .then((response: MessageResponse) => {
        this.response = response;
        window.scroll({ top: 0, left: 0, behavior: 'auto' });
      })
  }
}
