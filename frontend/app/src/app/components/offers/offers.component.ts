import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { User } from 'src/app/models/user';
import { RealEstatesService } from 'src/app/services/real-estates.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  myOffers: Offer[];
  acceptedOffers: Offer[];
  msg: String;
  constructor(private realEstateService: RealEstatesService, private router: Router) { }

  ngOnInit(): void {

    this.getOffers();
  }

  goToDetails(id) {
    this.router.navigate(['/realEstate/' + id])
  }
  accept(offer) {
    this.realEstateService.acceptOffer(offer).subscribe(
      (mess) => {
        console.log(mess)
        if (mess['mess'] == "offer accepted") {
          this.msg = "Offer accepted!"
          console.log(this.msg);
        }
      }
      )
      this.getOffers();
  }
    

decline(offer) {
  this.realEstateService.declineOffer(offer).subscribe(

    (mess) => {
      console.log(mess)
      if (mess['mess'] == "offer declined") {
        this.msg = "Offer declined!"
        console.log(this.msg);
      }
    }
  )
  this.getOffers();
}
getOffers() {
  let user: User = JSON.parse(localStorage.getItem('user'))[0]
  if (user) {
    if (user.type == "user") {
      this.realEstateService.getOffersUser(user.username).subscribe(
        (result: Offer[]) => {
          //console.log(result)
          this.myOffers = result;
        }
      )
      this.realEstateService.getAcceptedOffersUser(user.username).subscribe(
        (result: Offer[]) => {
          //console.log(result)
          this.acceptedOffers = result;
        }
      )
    }
    else if (user.type == "agent") {
      this.realEstateService.getOffersUser("agency").subscribe(
        (result: Offer[]) => {
          this.myOffers = result;
        }
      )
      this.realEstateService.getAcceptedOffersUser("agency").subscribe(
        (result: Offer[]) => {
          this.acceptedOffers = result;
        }
      )
    }
    else {
      this.myOffers = null;
      this.acceptedOffers=null;
    }
  }
}

}

