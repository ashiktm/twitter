import { TestBed } from '@angular/core/testing';

import { CustomDialogServiceService } from './custom-dialog-service.service';

describe('CustomDialogServiceService', () => {
  let service: CustomDialogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomDialogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
