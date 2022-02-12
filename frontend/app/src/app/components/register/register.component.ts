import { Component, OnInit } from '@angular/core';
import { GeoService } from 'src/app/services/geo.service';
import { ValidatorsService } from 'src/app/services/validators.service';

import { ICountry, IState, ICity } from 'country-state-city'
import { User } from '../../models/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  listOfCountries: ICountry[] = null;
  listOfCities: ICity[] = [];
  userRequest: User = new User();


  confirmPassword: string = null;
  countryCode: string = null;
  avatar: File = null;
  validEmail: boolean = true;
  validPassword: boolean = true;
  errorMsg:String;

  constructor(private customValidator: ValidatorsService, private geoService: GeoService, private userService: UsersService,private router:Router) { }

  ngOnInit(): void {
    this.listOfCountries = this.geoService.getAllCountries();
    //console.log(this.listOfCountries);
  }

  onFileSelected(event: Event) {
    this.avatar = (event.target as HTMLInputElement).files[0];
    console.log(this.avatar)
    if (this.customValidator.validateImgFormat(this.avatar.type))
      document.getElementById("addImgButton").innerText = this.avatar.name;
    else
      this.avatar = null;
  }

  validateEmail() {
    this.validEmail = this.customValidator.validateEmail(this.userRequest.email)
  }

  validatePass() {
    this.validPassword = this.customValidator.validatePassword(this.userRequest.password);
  }
  updateCities() {
    this.userRequest.country = this.geoService.getCountryByCode(this.countryCode);
    this.listOfCities = this.geoService.getCitiesOfCountry(this.countryCode);
  }

  register() {
    this.userRequest.avatar= this.avatar?true:false;
    this.userRequest.approved = false;
    this.userRequest.type= "user";
    this.userService.register(this.userRequest).subscribe((mess) => {
      //console.log(mess);
      if (mess['mess'] == "User added") {
        console.log("Registration succsessful")
        if (this.avatar != null) {
          this.userService.uploadAvatar(this.avatar, this.userRequest.username).subscribe((mess) => {
            if (mess['mess'] == "uploaded")
              console.log("Avatar uploaded!");
          }) 
        }
        this.router.navigate(['/'])
        return;
        //rutiranje,obavjesti korisnika
      }
      else if (mess['mess'] == "email") {
        this.errorMsg="Email already taken!"
      }
      else if (mess['mess'] == "username") {
        this.errorMsg="Username already taken!"
      }
    });
  }

}
