import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { UserService, usersList } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 2 users', () => {
    let user: User[];
    service.getUsers().subscribe({
      next: (data) => user = data,
      error: (err) => err
    })
    expect(user.length).toBe(2);
  })

  it('should return a index of a user', () => {
    expect(service.findUserIndex(1)).toBe(0);
  });

  it('should find user by id number', () => {
    expect(service.findUser(1)).toBeTruthy();
  });
});

