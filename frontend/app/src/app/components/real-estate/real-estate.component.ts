import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RealEstate } from 'src/app/models/realEstate';
import { User } from 'src/app/models/user';
import { RealEstatesService } from 'src/app/services/real-estates.service';
@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css']
})
export class RealEstateComponent implements OnInit {
  realEstate: RealEstate;
  user: User;
  msg: String;
  cnt: number = 0;
  changeData: boolean =false;

  constructor(private route: ActivatedRoute, private realEstateService: RealEstatesService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    //console.log(id);
    if (JSON.parse(localStorage.getItem('user')))
      this.user = JSON.parse(localStorage.getItem('user'))[0];


    this.realEstateService.getRealEstateId(id).subscribe((realEstate: RealEstate) => {
      //console.log(realEstate)
      if (realEstate) {
        this.realEstate = realEstate;
      }
    })

  }

  sendOffer(flag) {
    this.realEstateService.addOffer(this.realEstate.id, this.realEstate.owner, this.user.username, this.realEstate.price, flag).subscribe(
      (mess) => {
        if (mess['mess'] == "offer added") {
          this.msg = "Offer sent!"
        }
      }
    )
  }

  delete() {
    this.realEstateService.approveRE(this.realEstate.id, false).subscribe(
      (mess) => {
        if (mess['mess'] == "declined")
          this.router.navigate(["/"])
      }
    )


  }
  inc() {
    this.cnt = (this.cnt + 1) % this.realEstate.numOfPhotos;
  }
  save(){
    this.realEstateService.updateRealEstate(this.realEstate.id,this.realEstate.description,this.realEstate.price,this.realEstate.typeSale).subscribe(
      (mess)=>{
        if(mess['mess']=='ok'){}
         // console.log("Izmenjeno!")
      }
    )
  }

}
