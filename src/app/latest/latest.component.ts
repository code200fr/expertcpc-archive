import { AfterViewChecked, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigurationService } from '../configuration.service';
import { Message, MessageResponse } from '../messages/messages';
import { MessagesProviderService } from '../messages/messages-provider.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {
  page: number;
  response: MessageResponse;

  constructor(
    private messagesProvider: MessagesProviderService,
    private route: ActivatedRoute,
    private configuration: ConfigurationService
    ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.page = parseInt(params['page'], 10);

      if (!this.page || this.page < 1) {
        this.page = 1;
      }

      this.load();
    });
  }

  protected load() {
    this.messagesProvider.getRecent(this.page, this.configuration.get('pageSize'))
      .then((response: MessageResponse) => {
        this.response = response;
        window.scroll({ top: 0, left: 0, behavior: 'auto' });
      })
  }
}
