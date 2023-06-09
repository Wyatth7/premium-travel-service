import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './@pages/main/main.component';
import { AgentsComponent } from './@pages/agents/agents.component';
import { GridComponent } from './components/grid/grid.component';
import { GridItemComponent } from './components/grid/grid-item/grid-item.component';
import { HttpClientModule } from '@angular/common/http';
import { TripsComponent } from './@pages/trips/trips.component';
import { TravellersComponent } from './@pages/travellers/travellers.component';
import { PackagesComponent } from './@pages/packages/packages.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaymentComponent } from './@pages/payment/payment.component';
import { ItineraryComponent } from './@pages/itinerary/itinerary.component';
import { ThankYouComponent } from './@pages/thank-you/thank-you.component';
import { PaymentPersonComponent } from './@pages/payment-person/payment-person.component';
import { ItineraryGroupComponent } from './@pages/itinerary/itinerary-group/itinerary-group.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AgentsComponent,
    GridComponent,
    GridItemComponent,
    TripsComponent,
    TravellersComponent,
    PackagesComponent,
    ModalComponent,
    PaymentComponent,
    ItineraryComponent,
    ThankYouComponent,
    PaymentPersonComponent,
    ItineraryGroupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
