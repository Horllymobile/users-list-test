import { Component, OnInit, Input } from '@angular/core';
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


  ngOnInit(): void {
  }

}


