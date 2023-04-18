import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TripPaymentType } from 'src/app/models/trip-payment-type';
import { TripStateType } from 'src/app/models/trip-state-type';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { TripClientService } from 'src/app/services/clients/trip-client.service';
import { MainPageService } from 'src/app/services/main-page.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @ViewChild('form') paymentForm!: NgForm;

  formData = {
    paymentType: 1,
    card: {
      nameOnCard: 'test',
      cardNumber: '1111 2222 3333 4444',
      expirationDate: Date.now,
      securityCode: '123',
      address: {
        street: '123 street ln',
        city: 'city ways',
        state: 'ga',
        zip: '30707',
      },
    },
    amount: 599,
  };

  constructor(
    private mainPageService: MainPageService,
    private tripClientService: TripClientService,
    private applicationStateService: ApplicationStateService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.mainPageService.setMainPageData({
        title: 'Payment',
        helperText: 'Enter payment details below to finalize this trip',
        showFooterButtons: true,
        buttons: {
          buttonLeft: {
            showButton: true,
            buttonText: 'Later',
            action: async () => {},
          },
          buttonRight: {
            showButton: true,
            buttonText: 'Pay',
            action: () => this.submitPaymentAction(),
          },
        },
      });
    }, 0);
  }

  async submitPaymentAction() {
    // get complete form
    // if form is invalid/incomplete, return
    // call resume state
  }
}
