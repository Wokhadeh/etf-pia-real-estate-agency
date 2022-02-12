import { Injectable } from '@angular/core';
import csc from 'country-state-city'
import { ICountry, IState, ICity } from 'country-state-city'
@Injectable({
  providedIn: 'root'
})
export class GeoService {
 

  constructor() { }

  getAllCountries(){
    return csc.getAllCountries();
  }
  getCitiesOfCountry(countryCode : string){
    //console.log(countryCode)
    return csc.getCitiesOfCountry(countryCode);
  }
  getCountryByCode(countryCode: string){
    console.log(csc.getCountryByCode(countryCode).name);
    return csc.getCountryByCode(countryCode).name;

  }

}
