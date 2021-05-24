import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from './models/user';
import { UserService } from './service/user.service';

interface DialogData {
  id?:number,
  createdAt: Date;
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'users-list-test';
  usersList?: User[] | null = null;
  sub: any;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDeleteAllDialog(): void {
    const dialogRef = this.dialog.open(DeleteAllUserComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  openEditAllDialog(): void {
    const dialogRef = this.dialog.open(EditAllUserComponent, {
      width: '250px',
      data: this.usersList
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  getUsers(){
    this.sub = this.userService.getUsers()
    .subscribe(
      data => {
        setTimeout(()=>{
          this.usersList = data.reverse();
        },500)
        // console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }

  save(name){
    this.userService.createUser(name);
    // this.getUsers();
  }
}


@Component({
  template: `
    <h1 mat-dialog-title>Edit all users</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Full Names</mat-label>
        <input matInput *ngFor="let user of data" [(ngModel)]="user.name"/>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onSave()">Save</button>
      <button mat-button (click)="onCancel()">Cancel</button>
    </div>

  `
})
export class EditAllUserComponent implements OnInit {

  @Input() user: User

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData[]
  ){}
  onSave(): void {
      this.userService.updateAllUsers(this.data);
      this.dialogRef.close();
    }

    onCancel(){
      this.dialogRef.close();
    }

  ngOnInit(){}
}

@Component({
  template: `
    <h1 mat-dialog-title>Delete all users</h1>
    <p>Are you sure you want to delete all users?</p>
    <div mat-dialog-actions>
      <button mat-button (click)="onDelete()">Delete</button>
      <button mat-button (click)="onCancel()">Cancel</button>
    </div>
  `
})
export class DeleteAllUserComponent implements OnInit {

  @Input() user: User

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData[]
  ){}
    onDelete(): void {
      this.userService.deleteAllUsers();
      this.dialogRef.close();
    }

    onCancel(){
      this.dialogRef.close();
    }

  ngOnInit(){}
}


