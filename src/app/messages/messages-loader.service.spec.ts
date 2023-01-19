import { TestBed } from '@angular/core/testing';

import { MessagesLoaderService } from './messages-loader.service';

describe('MessagesLoaderService', () => {
  let service: MessagesLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
