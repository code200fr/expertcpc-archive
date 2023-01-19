import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Message, Messages } from './messages/messages';
import { MessagesLoaderService } from './messages/messages-loader.service';
import { MessagesProviderService } from './messages/messages-provider.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterContentInit {
  title = 'Expert CPC · Archives';

  @Input() searchQuery: string = '';

  constructor(
    private router: Router,
    private search: SearchService
    ) { }

  onSearchKeyup(event: KeyboardEvent) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const q: string = input.value;

    if (event.key === 'Enter') {
      this.router.navigate(['search', { page: 1, q: q }]); 
    }
  }

  ngAfterContentInit(): void {
    this.search.onChange((q: string) => this.searchQuery = q);
  }
}
