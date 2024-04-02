import { TestBed } from '@angular/core/testing';

import { ListToBuyService } from './list-to-buy.service';

describe('ListToBuyService', () => {
  let service: ListToBuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListToBuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
