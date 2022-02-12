import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './components/login/login.component';
import { PassChangeComponent } from './components/pass-change/pass-change.component';
import { BasicSearchComponent } from './components/basic-search/basic-search.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { UserApprovalComponent } from './components/user-approval/user-approval.component';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddRealEstateComponent } from './components/add-real-estate/add-real-estate.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RealEstateComponent } from './components/real-estate/real-estate.component'
import { RouterModule } from '@angular/router';
import { RealEstateCardComponent } from './components/real-estate-card/real-estate-card.component';
import {MatCardModule} from '@angular/material/card';
import { PromotedRealEstatesComponent } from './components/promoted-real-estates/promoted-real-estates.component';
import { GuestNavbarComponent } from './components/guest-navbar/guest-navbar.component';
import { RealEstateApprovalComponent } from './components/real-estate-approval/real-estate-approval.component';
import { RealEstatePromotionComponent } from './components/real-estate-promotion/real-estate-promotion.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRealEstatesComponent } from './components/user-real-estates/user-real-estates.component';
import { OffersComponent } from './components/offers/offers.component';
import { StatisticsComponent } from './components/statistics/statistics.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PassChangeComponent,
    BasicSearchComponent,
    UserApprovalComponent,
    AddRealEstateComponent,
    RealEstateComponent,
    RealEstateCardComponent,
    PromotedRealEstatesComponent,
    GuestNavbarComponent,
    RealEstateApprovalComponent,
    RealEstatePromotionComponent,
    UserProfileComponent,
    UserRealEstatesComponent,
    OffersComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    CommonModule,
    NgbModule,
    MatRadioModule,
    MatCheckboxModule,
    RouterModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
