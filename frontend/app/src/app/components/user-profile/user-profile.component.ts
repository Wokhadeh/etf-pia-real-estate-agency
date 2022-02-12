import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  loggedUser: User;
  changeData: boolean = false;
  msg: String;
  avatar: File;
  constructor(private route: ActivatedRoute, private userService: UsersService, private router: Router,private customValidator: ValidatorsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.loggedUser= JSON.parse(localStorage.getItem('user'))[0];
    let username = this.route.snapshot.params['username'];
    //console.log(username)
    this.userService.getUser(username).subscribe(
      (user: User) => {
        this.user = user;
      }
    )
  }

  save(){
    this.userService.updateUserInfo(this.user.username,this.user.firstName,this.user.lastName,this.user.country,this.user.city).subscribe(
      (mess)=>{
        if(mess['mess']=="updated"){
          this.msg="User info updated!"
        }
      }
    )
    this.changeData=false;
  }
  onFileSelected(event: Event) {
    this.avatar = (event.target as HTMLInputElement).files[0];
    console.log(this.avatar)
    if (this.customValidator.validateImgFormat(this.avatar.type)){
      this.userService.uploadAvatar(this.avatar,this.user.username).subscribe(
        (mess)=>{
          if (mess['mess'] == "uploaded"){
            console.log("Avatar uploaded")
          }
        }
      )
      this.user.avatar=true;
      this.avatar=null;
      location.reload();
    }
    else
      this.avatar = null;

  }
  changePassRoute(){
    this.router.navigate(['/changePass']);
  }
  deleteUser(){
    this.userService.deleteUser(this.user.username).subscribe(
      (mess)=>
      {
        if(mess['mess']=="user deleted"){
          this.router.navigate(['/']);
        }
      }
    )
  }


}
