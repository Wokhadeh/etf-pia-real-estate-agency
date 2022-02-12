import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  static readonly emailRegex= new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
  static readonly lowerCaseRegex= new RegExp("[a-z]");
  static readonly upperCaseRegex= new RegExp("[A-Z]");
  static readonly imgFormats :string[] = [ "image/png", "image/jpg" , "image/jpeg"]
  static readonly specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-="
  constructor() { }
  validateImgFormat (format){
    return ValidatorsService.imgFormats.includes(format);
  }
  validateEmail (email:string){
    return ValidatorsService.emailRegex.test(email);
  }
  validatePassword (pass:string){
    //check length
    console.log(pass);
    if(pass.length<8 || pass.length>24){
          console.log("false")
          return false;
    }
    let hasSpecChar:boolean =false;
    let hasUpperCase: boolean= false;
    let hasLowerCase: boolean = false;
    let cnt: number = 0;
      //check special char
    for(let i=0;i<ValidatorsService.specialChars.length;i++) {
      if(pass.indexOf(ValidatorsService.specialChars.charAt(i))>-1)
        hasSpecChar=true;
    }
    
    //check uppercaselowercase 
    for(let i=0;i<pass.length;i++){
      //uppercase
      if(ValidatorsService.upperCaseRegex.test(pass.charAt(i)))
        hasUpperCase=true;
      //lowercase
      if(ValidatorsService.lowerCaseRegex.test(pass.charAt(i)))
        hasLowerCase=true;
      //three same chars in a row
      if(i>0){
        if(pass.charAt(i)==pass.charAt(i-1))
          cnt++;
        else
          cnt=0;
        if(cnt==3){
          console.log(false);
          return false; //three same characters
        }
      }
    }
    console.log(hasSpecChar && hasLowerCase && hasUpperCase);
    return hasSpecChar && hasLowerCase && hasUpperCase;
  }

}
