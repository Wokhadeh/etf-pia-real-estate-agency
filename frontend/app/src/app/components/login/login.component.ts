import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UsersService,private router: Router) { }
  username : String;
  password : String;
  errMsg: String;
  ngOnInit(): void {
  }
  login(){
    this.userService.login(this.username,this.password).subscribe((user:User[])=>{
      if(user.length>0){
        console.log(user)
        localStorage.setItem('user',JSON.stringify(user));
        console.log("Login successful!")
        this.router.navigate(['/search'])
        //rutiranje
      }
      else{
        this.errMsg="Invalid username or password!"
      }
      
    })
  }

}
