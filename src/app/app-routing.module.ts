import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from './@pages/agents/agents.component';
import { TripsComponent } from './@pages/trips/trips.component';

// paths: agents, trips, create

const routes: Routes = [
  { path: 'agents', component: AgentsComponent },
  { path: 'trips', component: TripsComponent}
  { path: '**', redirectTo: 'agents' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
