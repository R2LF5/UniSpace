import { TestBed } from '@angular/core/testing';

import { UserUniService } from './user-uni.service';

describe('UserUniService', () => {
  let service: UserUniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
