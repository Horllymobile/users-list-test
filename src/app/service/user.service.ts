import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from '../models/user';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsersComponent } from '../components/users/users.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiUrl = environment.apiUrl;

  constructor(
  //  private http: HttpClient
  ) { }

  getUsers(): Observable<User[]>{
    return of(usersList);
  }

  findUser(id: number): User{
    return usersList.find(currentData => currentData.id === id);
  }

  findUserIndex(id: number): number{
    return usersList.findIndex(currentData => currentData.id === id);
  }

  updateUser(user: User): void{
    const current = this.findUser(user.id);

    if(current.name === user.name){
      return;
    }
    current.name = user.name;
  }

  updateAllUsers(users: User[]){
    usersList = users;
  }

  createUser(name: string): void{
    const user:User = {
      id: usersList.length + 1,
      name,
      createdAt: new Date(Date.now())
    }
    usersList.unshift(user);
  }

  deleteUser(id: number): void{
    const index = this.findUserIndex(id);
    usersList.splice(index, 1);
  }

  deleteAllUsers(): void{
    usersList = [];
  }

}

const date = new Date()

 let usersList: User[] = [
  {
    id: 1,
    createdAt: date,
    name: "Laurence Stark"
  },
  {
    id: 2,
    createdAt: date,
    name: "Clifton Lesch"
  },
]
