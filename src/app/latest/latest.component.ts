import { AfterViewChecked, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigurationService } from '../configuration.service';
import { MessageListComponent } from '../messages/message-list.component';
import { Message, MessageResponse } from '../messages/messages';
import { MessagesProviderService } from '../messages/messages-provider.service';

@Component({
  selector: 'app-latest',
  templateUrl: './../messages/message-list.component.html'
})
export class LatestComponent extends MessageListComponent implements OnInit {
  page: number;
  size: number;

  constructor(
    private messagesProvider: MessagesProviderService,
    private route: ActivatedRoute,
    private configuration: ConfigurationService
    ) {
      super();
  }

  getRouterPath(): string {
    return '/latest'
  }

  getRouterParams() {
    return {
      page: this.page.toString(10),
      size: this.size.toString(10),
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.page = this.getPage(params);
      this.size = this.getPageSize(params, this.configuration);

      this.load();
    });
  }

  protected load() {
    this.messagesProvider
      .getRecent(this.page, this.size)
      .then(data => this.renderResponse(data, this));
  }
}
