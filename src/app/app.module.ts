import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './@pages/main/main.component';
import { AgentsComponent } from './@pages/agents/agents.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AgentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
