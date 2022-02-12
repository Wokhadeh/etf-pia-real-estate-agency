import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from 'src/app/models/realEstate';
import { RealEstatesService } from 'src/app/services/real-estates.service';


@Component({
  selector: 'app-real-estate-approval',
  templateUrl: './real-estate-approval.component.html',
  styleUrls: ['./real-estate-approval.component.css']
})
export class RealEstateApprovalComponent implements OnInit {
  notApprovedRealEstates: RealEstate[];
  msg: String;
  constructor(private realEstateService: RealEstatesService,private router: Router) { }

  ngOnInit(): void {
    this.getNotApprovedRealEstates();

  }

  accept(realEstateId){
    this.realEstateService.approveRE(realEstateId,true).subscribe(
      (mess)=>{
        if(mess['mess']=="approved"){
          this.msg="Real estate approved!"
        }
        else if(mess['mess']=="declined"){
          this.msg="Real estate deleted!"
        }
      }
      )
      this.getNotApprovedRealEstates()
  }
  decline(realEstateId){
    this.realEstateService.approveRE(realEstateId,false).subscribe(
      (mess)=>{
        if(mess['mess']=="approved"){
          this.msg="Real estate approved!";
        }
        else if(mess['mess']=="declined"){
          this.msg="Real estate deleted!";
        }
      }
    )
    this.getNotApprovedRealEstates()

  }
  getNotApprovedRealEstates(){
    this.realEstateService.getNotApprovedRealEstates().subscribe(
      (result: RealEstate[])=>{
        this.notApprovedRealEstates=result;
      }
    )
  }
  goToDetails(id){
    console.log(id);
    this.router.navigate(['/realEstate/'+ id])

  }
  

}
