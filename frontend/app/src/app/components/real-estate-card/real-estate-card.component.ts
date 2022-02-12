import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from 'src/app/models/realEstate';
import { RealEstateComponent } from '../real-estate/real-estate.component';

@Component({
  selector: 'app-real-estate-card',
  templateUrl: './real-estate-card.component.html',
  styleUrls: ['./real-estate-card.component.css']
})
export class RealEstateCardComponent implements OnInit {
  @Input()
  realEstate: RealEstate = null;
  numOfPhoto: number;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.numOfPhoto = Math.floor(Math.random() * this.realEstate.numOfPhotos);
  }
  goToDetails(){
    this.router.navigate(['/realEstate/'+ this.realEstate.id])
  }
}
