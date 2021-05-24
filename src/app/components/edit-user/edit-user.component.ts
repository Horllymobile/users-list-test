import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { UsersComponent } from '../users/users.component';


interface DialogData {
  id?:number,
  createdAt: Date;
  name: string
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){}
    onSave(): void {
      this.userService.updateUser(this.data);
      this.dialogRef.close();
    }

    onCancel(){
      this.dialogRef.close();
    }

  ngOnInit(){}
}

@Component({
  selector: 'app-edit-user',
  template: `

    <h1 mat-dialog-title>Delete User</h1>
    <p>Are you sure you want to delete?</p>
    <div mat-dialog-actions>
      <button mat-button (click)="onDelete()">Delete</button>
      <button mat-button (click)="onCancel()">Cancel</button>
    </div>

  `,
})
export class DeleteUserComponent implements OnInit {

  @Input() user: User

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){}

  onDelete(): void {
    this.userService.deleteUser(this.data.id);
    this.dialogRef.close();
  }

  onCancel(){
    this.dialogRef.close();
  }
  ngOnInit(){}
}
