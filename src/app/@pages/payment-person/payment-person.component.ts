import { Component, OnInit } from '@angular/core';
import { AddPaymentPersonModel } from 'src/app/models/payment/add-payment-person-model';
import { AddTravellersModel } from 'src/app/models/trip/add-travellers-model';
import { GridItemModel } from 'src/app/models/grid-item-model';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { SingletonClientService } from 'src/app/services/clients/person-client.service';
import { TripClientService } from 'src/app/services/clients/trip-client.service';
import { MainPageService } from 'src/app/services/main-page.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { SelectService } from 'src/app/services/select.service';
import { TripCreationService } from 'src/app/services/trip-creation.service';

@Component({
  selector: 'app-payment-person',
  templateUrl: './payment-person.component.html',
  styleUrls: ['./payment-person.component.scss'],
})
export class PaymentPersonComponent implements OnInit {
  travellers: GridItemModel[] = [];

  constructor(
    private mainPageService: MainPageService,
    private applicationStateService: ApplicationStateService,
    private tripCreationService: TripCreationService,
    private tripClientService: TripClientService,
    private singletonClientService: SingletonClientService,
    private selectService: SelectService,
    private navigationService: NavigationService
  ) {}

  async ngOnInit() {
    this.tripCreationService.clearIdList();

    setTimeout(() => {
      this.mainPageService.setMainPageData({
        title: 'Payment',
        helperText: 'Select a person to pay for the trip',
        showFooterButtons: true,
        buttons: {
          buttonLeft: {
            showButton: true,
            buttonText: 'Later',
            action: async () => this.laterAction(),
          },
          buttonRight: {
            showButton: false,
            buttonText: '',
            action: async () => {},
          },
        },
      });
    }, 0);

    this.travellers = [];

    const travellersQueryResponse =
      await this.singletonClientService.getTravellers();

    travellersQueryResponse.forEach((traveller) =>
      this.travellers.push({
        id: traveller.personId,
        title: traveller.nameFull,
      })
    );

    this.selectService.setSelectAction(async () =>
      this.assignPaymentPersonAction(this.selectService.lastSelectedId)
    );
  }

  async assignPaymentPersonAction(id: string) {
    // post selected traveller to API
    const payload: AddPaymentPersonModel = {
      tripId: this.applicationStateService.currentTripId,
      assignToPersonId: id,
    };

    await this.tripClientService.resumeTrip('payment/assignPerson', payload);

    const state = await this.tripClientService.getTripState(
      this.applicationStateService.currentTripId
    );

    this.navigationService.navigateToTripState(state.currentState);
  }

  async laterAction() {
    this.navigationService.navigate(['agents']);
  }
}
