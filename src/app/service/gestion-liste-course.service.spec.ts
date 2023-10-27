import { TestBed } from '@angular/core/testing';

import { GestionListeCourseService } from './gestion-liste-course.service';

describe('GestionListeCourseService', () => {
  let service: GestionListeCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionListeCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
