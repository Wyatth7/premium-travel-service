import { Component, OnInit } from '@angular/core';
import { PersonModel } from 'src/app/models/person-model';
import { GridItemModel } from 'src/app/models/grid-item-model';
import { PersonClientService } from 'src/app/services/clients/person-client.service';
import { SelectService } from 'src/app/services/select.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
})
export class AgentsComponent implements OnInit {
  agents: GridItemModel[] = [];

  constructor(
    private personClientService: PersonClientService,
    private selectService: SelectService
  ) {}

  async ngOnInit() {
    const agentsResponse = await this.personClientService.getAgents();

    if (!agentsResponse) {
      this.agents = [];
      return;
    }

    console.log(agentsResponse);

    agentsResponse.forEach((agent) =>
      this.agents.push({ id: agent.personId, title: agent.nameFull })
    );

    this.selectService.setSelectAction(this.actionOnAgentClicked);
  }

  async actionOnAgentClicked() {
    console.log('agent was clicked');
  }
}
