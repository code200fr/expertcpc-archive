import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ConfigurationService } from '../configuration.service';
import { MessageResponse } from '../messages/messages';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() path: string;
  @Input() params: { [key: string]: string };
  @Input() response: MessageResponse;

  pageSize: number;
  pageSizes: number[];

  constructor(private configuration: ConfigurationService, private router: Router) {
    this.pageSize = configuration.get('pageSize');
    this.pageSizes = configuration.get('pageSizes');
  }

  onPageChange(e: PageEvent) {
    this.configuration.set('pageSize', e.pageSize);
    
    this.router.navigate([
      this.path,
      {...this.params, ...{ page: e.pageIndex + 1, size: e.pageSize }}
    ]);
  }

  getPageSize(): number {
    return parseInt(this.params['size'], 10);
  }

  page(): number {
    return parseInt(this.params['page'], 10);
  }
}
