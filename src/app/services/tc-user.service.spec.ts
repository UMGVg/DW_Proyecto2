import { TestBed } from '@angular/core/testing';

import { TcUserService } from './tc-user.service';

describe('TcUserService', () => {
  let service: TcUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TcUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
