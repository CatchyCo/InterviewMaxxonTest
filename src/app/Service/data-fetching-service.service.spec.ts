import { TestBed } from '@angular/core/testing';

import { DataFetchingServiceService } from './data-fetching-service.service';

describe('DataFetchingServiceService', () => {
  let service: DataFetchingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFetchingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
