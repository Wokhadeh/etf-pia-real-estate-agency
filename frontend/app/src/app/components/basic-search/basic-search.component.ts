import { Component, OnInit } from '@angular/core';
import { GeoService } from 'src/app/services/geo.service';

import { ICountry, IState, ICity } from 'country-state-city'
import { RealEstatesService } from 'src/app/services/real-estates.service';
import { RealEstate } from 'src/app/models/realEstate';

@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.css']
})
export class BasicSearchComponent implements OnInit {

  listOfCountries:ICountry[] = null; 
  listOfCities: ICity[] = [];
  countryCode: string;
  minPrice: string;
  maxPrice: string;
  city: string;
  realEstates: RealEstate[];

  constructor(private geoService: GeoService,private realEstateService: RealEstatesService) {

  }

  ngOnInit(): void {
    this.listOfCountries=this.geoService.getAllCountries();
  }

  updateCities(){
    this.listOfCities=this.geoService.getCitiesOfCountry(this.countryCode);
  }

  search(){
    this.realEstateService.search(this.city,parseInt(this.minPrice),parseInt(this.maxPrice)).subscribe(
      (result: RealEstate[])=>{
        this.realEstates=result;
      }
    )
  }
}
