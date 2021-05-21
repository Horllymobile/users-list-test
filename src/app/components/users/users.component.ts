import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DeleteUserComponent, EditUserComponent } from '../edit-user/edit-user.component';
import { User } from './../../models/user';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() users: User[] | null = null;

  @Output() user = new EventEmitter();
  constructor(
    private dialog: MatDialog,
  ) { }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '250px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '250px',
      data: { id }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  open(user){
    console.log('working');
    this.user.emit(user);
  }

  ngOnInit(): void {
  }

}


