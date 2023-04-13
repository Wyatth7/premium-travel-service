import { Component, OnInit } from '@angular/core';
import { PersonModel } from 'src/app/models/person-model';
import { GridItemModel } from 'src/app/models/grid-item-model';

import { PersonClientService } from 'src/app/services/clients/person-client.service';
import { GridItemComponent } from 'src/app/components/grid/grid-item/grid-item.component';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
})
export class AgentsComponent implements OnInit {
  agents!: PersonModel[];

  constructor(private personClientService: PersonClientService) {}

  async ngOnInit() {
    this.agents = await this.personClientService.getAgents();
    console.log(this.agents);
  }

  getGridItems() {
    const gridItems: GridItemModel[] = [];

    if (!this.agents) return [];

    this.agents.forEach((agent) =>
      gridItems.push({ title: agent.nameFull, id: agent.personId })
    );

    return gridItems;
  }
}
