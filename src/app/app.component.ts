import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Message, Messages } from './messages/messages';
import { MessagesLoaderService } from './messages/messages-loader.service';
import { MessagesProviderService } from './messages/messages-provider.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'Expert CPC - Archives';
  @Input() searchQuery: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private search: SearchService) {

  }

  onSearch(event: KeyboardEvent) {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const q: string = input.value;

    if (event.key === 'Enter') {
      this.router.navigate(['search', { page: 1, q: q }]); 
    }
  }

  ngOnInit() {
    if (document.location.pathname === '/' || document.location.pathname === '') {
      this.router.navigate(['latest', { page: 1 }]); 
    }
  }

  ngAfterContentInit(): void {
    this.search.onChange((q: string) => this.searchQuery = q);
  }
}
