import { Component, OnInit } from '@angular/core';
import { RealEstate } from 'src/app/models/realEstate';
import { User } from 'src/app/models/user';
import { RealEstatesService } from 'src/app/services/real-estates.service';

@Component({
  selector: 'app-promoted-real-estates',
  templateUrl: './promoted-real-estates.component.html',
  styleUrls: ['./promoted-real-estates.component.css']
})
export class PromotedRealEstatesComponent implements OnInit {

  promotedRealEstates: RealEstate[]= null;
  cnt: number = 0;
  

  constructor(private realEstatesService: RealEstatesService) { }

  ngOnInit(): void {

    this.realEstatesService.getPromotedRealEstates().subscribe(
      (promotedRealEstates: RealEstate[])=>{
        if(promotedRealEstates.length>0)
        this.promotedRealEstates=promotedRealEstates;
        console.log(this.promotedRealEstates)
      }
    )
  }

  modulo(n,m){
    return ((n%m)+m)%m;
  }

  left(){
    this.cnt++;
  }
  right(){
    this.cnt--;
  }



}
