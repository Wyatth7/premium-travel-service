import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPersonComponent } from './payment-person.component';

describe('PaymentPersonComponent', () => {
  let component: PaymentPersonComponent;
  let fixture: ComponentFixture<PaymentPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
