import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-user-approval',
  templateUrl: './user-approval.component.html',
  styleUrls: ['./user-approval.component.css']
})
export class UserApprovalComponent implements OnInit {
  userRequsets: User[];
  msg: string;
  constructor(private userService : UsersService) { }

  ngOnInit(): void {
    this.getAllUserRequests();

  }

  acceptUser(username,type){
    this.userService.acceptUser(username,type).subscribe((mess)=>{
      if(mess['mess']=="user added"){
        this.msg="User accepted!"
      }
      this.getAllUserRequests();
    })
    
  }
  declineUser(username){
    this.userService.deleteUser(username).subscribe((mess)=>{
      if(mess['mess']=="user deleted"){
        this.msg= "User requst declined!"
      }
      this.getAllUserRequests();
    })
    
  }
  getAllUserRequests(){
    this.userService.getAllUserRequsts().subscribe((result:User[])=>{
      this.userRequsets=result;
    })
  }

}
