import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddTransactionModel } from 'src/app/models/payment/add-transaction-model';
import { TripPaymentType } from 'src/app/models/trip/trip-payment-type';
import { TripStateType } from 'src/app/models/trip/trip-state-type';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { TripClientService } from 'src/app/services/clients/trip-client.service';
import { MainPageService } from 'src/app/services/main-page.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @ViewChild('form') paymentForm!: NgForm;
  paymentType = TripPaymentType.card;
  amount = 0;

  constructor(
    private mainPageService: MainPageService,
    private tripClientService: TripClientService,
    private applicationStateService: ApplicationStateService,
    private navigationService: NavigationService
  ) {}

  async ngOnInit() {
    setTimeout(() => {
      this.mainPageService.setMainPageData({
        title: 'Payment',
        helperText: 'Enter payment details below to finalize this trip',
        showFooterButtons: true,
        errorText: 'This form contains an error',
        buttons: {
          buttonLeft: {
            showButton: true,
            buttonText: 'Later',
            action: async () => this.laterAction(),
          },
          buttonRight: {
            showButton: true,
            buttonText: 'Pay',
            action: () => this.submitPaymentAction(),
          },
        },
      });
    }, 0);

    await this.setAmount();
  }

  async laterAction() {
    this.navigationService.navigate(['trips']);
  }

  async submitPaymentAction() {
    console.log(this.paymentForm.value);
    if (this.paymentForm.invalid) {
      this.mainPageService.shouldDisplayError(true);
      return;
    }

    // get complete form
    // call resume state

    const transaction: AddTransactionModel = {
      tripId: this.applicationStateService.currentTripId,
      personId: this.applicationStateService.agentId,
      amount: this.paymentForm.value.amount,
      paymentType: +this.paymentType,
      card: this.paymentForm.value.card || {},
      check: this.paymentForm.value.check || {},
      cash: this.paymentForm.value.cash || {},
    };

    await this.tripClientService.resumeTrip('payment', transaction);

    const state = await this.tripClientService.getTripState(
      this.applicationStateService.currentTripId
    );

    if (state.currentState === TripStateType.Payment) {
      //refresh amount
      await this.setAmount();
      this.paymentForm.resetForm();

      return;
    }

    this.navigationService.navigateToTripState(state.currentState);
  }

  private async setAmount() {
    const amountResponse = await this.tripClientService.getRemainingTripBalance(
      this.applicationStateService.currentTripId
    );

    this.amount = amountResponse;
  }
}
