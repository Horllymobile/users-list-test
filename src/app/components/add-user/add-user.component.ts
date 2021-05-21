import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  name: string;
  constructor() { }

  ngOnInit(): void {
  }

  @Output() newUser = new EventEmitter<string>();

  saveUser(){
    this.newUser.emit(this.name);
    this.name = '';
  }

}
