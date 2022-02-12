import { Component, Input,OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-guest-navbar',
  templateUrl: './guest-navbar.component.html',
  styleUrls: ['./guest-navbar.component.css']
})
export class GuestNavbarComponent implements OnInit {
  @Input()
  user:User;
  isMenuCollapsed =false;

  constructor() { }
  ngOnInit(): void {
    console.log(this.user);
  }
  logout(){
    localStorage.clear();
  }

}
