import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from 'src/app/models/realEstate';
import { User } from 'src/app/models/user';
import { RealEstatesService } from 'src/app/services/real-estates.service';

@Component({
  selector: 'app-user-real-estates',
  templateUrl: './user-real-estates.component.html',
  styleUrls: ['./user-real-estates.component.css']
})
export class UserRealEstatesComponent implements OnInit {
  userRealEstates:RealEstate[];
  msg:String;
  constructor(private realEstateService:RealEstatesService,private router:Router) { }

  ngOnInit(): void {
    let user= null;
    if(JSON.parse(localStorage.getItem('user'))){
      user=JSON.parse(localStorage.getItem('user'))[0];
    }
    if(user){
      if(user.type=="agent"){
        this.realEstateService.getRealEstatesOwner('agency').subscribe(
          (list:RealEstate[])=>{
            this.userRealEstates=list;
          }
        )
      }
      else{
      this.realEstateService.getRealEstatesOwner(user.username).subscribe(
        (list:RealEstate[])=>{
          this.userRealEstates=list;
        }
      )
      }
    }
  }
  goToDetails(id){
    this.router.navigate(['/realEstate/'+ id])
  }
}
