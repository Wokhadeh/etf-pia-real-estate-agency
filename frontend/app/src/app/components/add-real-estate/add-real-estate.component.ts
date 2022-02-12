import { Component, OnInit } from '@angular/core';
import { RealEstate } from 'src/app/models/realEstate';
import { User } from 'src/app/models/user';
import { RealEstatesService } from 'src/app/services/real-estates.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import uniqid from 'uniqid'
@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.css']
})
export class AddRealEstateComponent implements OnInit {
  realEstate: RealEstate = new RealEstate();
  photos: FileList;
  errMsg: String;
  succMsg: String;
  user: User;
  constructor(private customValidator: ValidatorsService,private realEstateService: RealEstatesService) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('user'))){
      this.user=JSON.parse(localStorage.getItem('user'))[0];
    }
  }
  
  addRealEstate(){
    this.succMsg=null;
    this.errMsg=null;
    this.realEstate.promoted=false;
    this.realEstate.approved=false;
    this.realEstate.status = 'active';
    this.realEstate.id=uniqid('re-');
    this.realEstate.numOfPhotos= this.photos.length;
    let owner: User =  JSON.parse(localStorage.getItem("user"));
    if(owner[0].type=="agent"){
      this.realEstate.owner="agency"
    }
    else if(owner[0].type=="user"){
      this.realEstate.owner=owner[0].username;
    }
    this.realEstateService.addRealestate(this.realEstate).subscribe((mess)=>{
      if(mess['mess']=="re added"){
        console.log("Real estate successfully added!")
        this.realEstateService.uploadPhotos(this.photos,this.realEstate.id).subscribe((mess)=>{
          if(mess['mess']=="photos uploaded"){
            this.succMsg="Real estate successfully added!"
            console.log("PHOTOS UPLOADED!")
          }
        });
      }
      else{
        this.errMsg="Error while adding real estate!"
      }
    })
  }
  onFileSelected(event: Event) {
    this.photos = (event.target as HTMLInputElement).files;
    if(this.photos.length<3){
      this.errMsg="Must select at least 3 photos!"
      this.photos = null;
      document.getElementById("addImgButton").innerText = "Add images";
      return;
    }
    else{
      for(let i=0;i<this.photos.length;i++){
        if(!this.customValidator.validateImgFormat(this.photos.item(i).type)){
          this.errMsg="Not supported file format!"
          this.photos = null;
          document.getElementById("addImgButton").innerText = "Add images";
          return;
        }
      }
      document.getElementById("addImgButton").innerText = (this.photos.length+ " photos selected");
    }

  }
}
