import { TestBed } from '@angular/core/testing';

import { GestionArticlesService } from './gestion-articles.service';

describe('GestionArticlesService', () => {
  let service: GestionArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
