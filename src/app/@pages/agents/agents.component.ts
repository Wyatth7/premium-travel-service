import { Component, OnInit } from '@angular/core';
import { GridItemModel } from 'src/app/models/grid-item-model';
import { SingletonClientService } from 'src/app/services/clients/person-client.service';
import { SelectService } from 'src/app/services/select.service';
import { MainPageService } from 'src/app/services/main-page.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
})
export class AgentsComponent implements OnInit {
  agents: GridItemModel[] = [];

  constructor(
    private personClientService: SingletonClientService,
    private selectService: SelectService,
    private mainPageService: MainPageService,
    private navigationService: NavigationService,
    private applicationStateService: ApplicationStateService
  ) {}

  async ngOnInit() {
    const agentsResponse = await this.personClientService.getAgents();

    if (!agentsResponse) {
      this.agents = [];
      return;
    }

    agentsResponse.forEach((agent) =>
      this.agents.push({ id: agent.personId, title: agent.nameFull })
    );

    this.selectService.setSelectAction(() =>
      this.actionOnAgentClicked(this.selectService.lastSelectedId)
    );

    this.mainPageService.setMainPageData({
      title: 'Agents',
      helperText: 'Select an agent to create and view trips',
      showFooterButtons: false,
    });
  }

  async actionOnAgentClicked(id: string) {
    this.applicationStateService.agentId = id;
    this.navigationService.navigate(['trips']);
  }
}
