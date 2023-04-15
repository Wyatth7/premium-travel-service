import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './@pages/main/main.component';
import { AgentsComponent } from './@pages/agents/agents.component';
import { GridComponent } from './components/grid/grid.component';
import { GridItemComponent } from './components/grid/grid-item/grid-item.component';
import { HttpClientModule } from '@angular/common/http';
import { TripsComponent } from './@pages/trips/trips.component';
import { TravellersComponent } from './@pages/travellers/travellers.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AgentsComponent,
    GridComponent,
    GridItemComponent,
    TripsComponent,
    TravellersComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
