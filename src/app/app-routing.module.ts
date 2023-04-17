import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from './@pages/agents/agents.component';
import { ItineraryComponent } from './@pages/itinerary/itinerary.component';
import { PackagesComponent } from './@pages/packages/packages.component';
import { PaymentComponent } from './@pages/payment/payment.component';
import { ThankYouComponent } from './@pages/thank-you/thank-you.component';
import { TravellersComponent } from './@pages/travellers/travellers.component';
import { TripsComponent } from './@pages/trips/trips.component';

// paths: agents, trips, create

const routes: Routes = [
  { path: 'agents', component: AgentsComponent },
  { path: 'trips', component: TripsComponent },
  {
    path: 'trip',
    children: [
      {
        path: 'edit',
        children: [
          { path: 'travellers', component: TravellersComponent },
          { path: 'packages', component: PackagesComponent },
          { path: 'payment', component: PaymentComponent },
          { path: 'note', component: ThankYouComponent },
        ],
      },
      {
        path: 'view',
        component: ItineraryComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'agents' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
