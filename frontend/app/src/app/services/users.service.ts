import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserApprovalComponent } from '../components/user-approval/user-approval.component';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri = 'http://localhost:4000/users/';
  constructor(private http: HttpClient) { }
  register(userReq){
    return this.http.post(this.uri+"register",userReq)
  }
  
  uploadAvatar(avatar:File,username){
    const fd= new FormData();
    fd.append('avatar',avatar,'avatar');
    fd.append('username',username);
    console.log(avatar.type.split("/")[1]);
    fd.append('extension',avatar.type.split("/")[1]);
    return this.http.post(this.uri+"uploadAvatar",fd);
  }
  login(username,password){
    let loginData={
      username: username,
      password: password
    }
    return this.http.post(this.uri+"login",loginData)
  }
  getAllUserRequsts(){
    return this.http.get(this.uri+"allUserRequests");
  }
  acceptUser(username,type){
    let data={
      username: username,
      type: type
    }
    return this.http.put(this.uri,data);
    
  }
  deleteUser(username){
    let data={
      username: username
    }
    return this.http.post(this.uri+"delete",data)

  }
  getUser(username){
    let data={
      username: username
    } 
    return this.http.post(this.uri,data)
  }

  updateUserInfo(username,firstname,lastname,country,city){
    let data={
      username: username,
      firstname: firstname,
      lastname: lastname,
      country: country,
      city: city
    }

  return this.http.post(this.uri+"update",data)    
  }
  changePassword(username,password){
    let data = {
      username: username,
      password: password
    }
    return this.http.post(this.uri+"changePass",data);
  }
}
