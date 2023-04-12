import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from './@pages/agents/agents.component';

// paths: agents, trips, create

const routes: Routes = [
  { path: 'agents', component: AgentsComponent },
  { path: '**', redirectTo: 'agents' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
