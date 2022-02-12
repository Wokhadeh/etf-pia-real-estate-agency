import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddRealEstateComponent } from './components/add-real-estate/add-real-estate.component';
import { BasicSearchComponent } from './components/basic-search/basic-search.component';
import { LoginComponent } from './components/login/login.component';
import { PromotedRealEstatesComponent } from './components/promoted-real-estates/promoted-real-estates.component';
import { RealEstateComponent } from './components/real-estate/real-estate.component';
import { RegisterComponent } from './components/register/register.component';
import { RealEstateApprovalComponent } from './components/real-estate-approval/real-estate-approval.component';
import { RealEstatePromotionComponent } from './components/real-estate-promotion/real-estate-promotion.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRealEstatesComponent } from './components/user-real-estates/user-real-estates.component';
import { UserApprovalComponent } from './components/user-approval/user-approval.component';
import { PassChangeComponent } from './components/pass-change/pass-change.component';
import { OffersComponent } from './components/offers/offers.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  { path: '', component: BasicSearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'realEstate/:id', component: RealEstateComponent },
  { path: 'addRealEstate', component: AddRealEstateComponent },
  { path: 'promotedRealEstates', component: PromotedRealEstatesComponent },
  { path: 'search', component: BasicSearchComponent },
  { path: 'realEstateApproval', component: RealEstateApprovalComponent },
  { path: 'promotion', component: RealEstatePromotionComponent },
  { path: 'user/:username', component: UserProfileComponent },
  { path: 'myRealEstates', component: UserRealEstatesComponent },
  { path: 'userApproval', component: UserApprovalComponent },
  { path: 'changePass', component: PassChangeComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
