import { TestBed } from '@angular/core/testing';

import { TcRoleService } from './tc-role.service';

describe('TcRoleService', () => {
  let service: TcRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TcRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
