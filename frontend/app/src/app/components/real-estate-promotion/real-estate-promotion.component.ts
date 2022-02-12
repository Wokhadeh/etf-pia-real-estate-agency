import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from 'src/app/models/realEstate';
import { User } from 'src/app/models/user';
import { RealEstatesService } from 'src/app/services/real-estates.service';

@Component({
  selector: 'app-real-estate-promotion',
  templateUrl: './real-estate-promotion.component.html',
  styleUrls: ['./real-estate-promotion.component.css']
})
export class RealEstatePromotionComponent implements OnInit {
  allRealEstates: RealEstate[];
  msg: String;
  user: User;
  constructor(private router: Router, private realEstateService: RealEstatesService) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('user'))){
      this.user=JSON.parse(localStorage.getItem('user'))[0];
    }
    this.getAllRealEstates();
  }

  promote(id){
    this.realEstateService.promoteRE(id,true).subscribe(
      (mess)=>{
        if(mess['mess']=='ok')
        this.msg="Succesfuly changed promotion status!"
      }
    );
    this.getAllRealEstates();
  }

  demote (id){
    this.realEstateService.promoteRE(id,false).subscribe(
      (mess)=>{
        if(mess['mess']=='ok')
        this.msg="Succesfuly changed promotion status!"
      }
    );
    this.getAllRealEstates();
  }

  
  goToDetails(id){
    this.router.navigate(['/realEstate/'+ id])
  }
  getAllRealEstates(){
    this.realEstateService.getAllRealEstates().subscribe(
      (result: RealEstate[])=>{
        this.allRealEstates=result;
      }
    )

  }


}
