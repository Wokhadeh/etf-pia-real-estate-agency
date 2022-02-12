import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  getUser(){
    let user:User = JSON.parse(localStorage.getItem("user"));
    if(user){
      return user[0];
    }
    return null;
  }
}
