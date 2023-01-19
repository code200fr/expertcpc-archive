import { TestBed } from '@angular/core/testing';

import { MessagesProviderService } from './messages-provider.service';

describe('MessagesProviderService', () => {
  let service: MessagesProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
