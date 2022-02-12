import { HttpClientModule, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../models/offer';
@Injectable({
  providedIn: 'root'
})
export class RealEstatesService {

  uri='http://localhost:4000/realEstates/'
  constructor(private http: HttpClient) { }


  addRealestate(realEstate){
    return this.http.post(this.uri+"addRealEstate",realEstate)
  }
   
  uploadPhotos(photos:FileList,id){
    const fd= new FormData();
    for(let i=0;i<photos.length;i++){
      fd.append('photos',photos.item(i),'photo'+i)
    }
    fd.append('id',id)
    return this.http.post(this.uri+"photos",fd);
  }
  getRealEstateId(id){
    let data= {
      id: id
    }
    return this.http.post(this.uri+"id",data);
  }
  getPromotedRealEstates(){
    return this.http.get(this.uri+"promoted")
  }
  search(city,minPrice,maxPrice){
    let data={
      city: city,
      minPrice: minPrice,
      maxPrice: maxPrice,
    }
    console.group(data);
    return this.http.post(this.uri+"search",data);
  }
  getNotApprovedRealEstates(){
    return this.http.get(this.uri+"notApproved")
  }



  approveRE(id,flag){
    let data={
      id: id,
      flag: flag
    }
    return this.http.post(this.uri+"approveRE",data);
  }
  promoteRE(id,flag){
    let data={
      id: id,
      flag: flag
    }
    return this.http.post(this.uri+"promoteRE",data);

  }


  getAllRealEstates(){
    return this.http.get(this.uri+"allRealEstates");
  }

  getRealEstatesOwner(username){
    let data={
      owner: username
    }
    return this.http.post(this.uri+"owner",data)
  }
  addOffer(realEstateId,owner,offeror,price,credit){
    let offer: Offer = new Offer();
    offer.realEstateId=realEstateId;
    offer.owner=owner;
    offer.offeror= offeror;
    offer.price= price;
    offer.status=false;
    return this.http.post(this.uri+"addOffer",offer)
  }
  getOffersUser(username){
    let data={
      owner: username
    }
    return this.http.post(this.uri+"offers",data)
  }
  acceptOffer(offer){
    return this.http.post(this.uri+"acceptOffer",offer)
  }
  
  declineOffer(offer){
    return this.http.post(this.uri+"declineOffer",offer)
  }
  getAcceptedOffersUser(username){
    let data={
      owner: username
    }
    return this.http.post(this.uri+"acceptedOffers",data)
  }
  updateRealEstate(id,desc,price,typeSale){
      let data={
        id: id,
        desc: desc,
        price: price,
        typeSale: typeSale
      }
      return this.http.post(this.uri+"update",data)
  }


}
