import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplyService } from '../../apply.service';
import { CustomerAchPaymentDetailsDialogData } from '../apply-invoices.component';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {CreditCardType} from '../../../_lib/USPay/CreditCardType';
import {UserService} from '../../../_lib/UserService';

const moment = _rollupMoment || _moment;

export const EXP_DATE_FORMAT = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-make-uspay-payment-modal',
  templateUrl: './make-uspay-payment-modal.component.html',
  styleUrls: ['./make-uspay-payment-modal.component.scss'],
    providers: [
        {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },

        {provide: MAT_DATE_FORMATS, useValue: EXP_DATE_FORMAT},
      ],
})
export class MakeUSPayPaymentModalComponent implements OnInit {

  // accountTypeArray: string[];
  // accountCategoryArray: string[];
  creditCardExpDate: FormControl;
  formGroupData: FormGroup;

  constructor(public dialogRef: MatDialogRef<MakeUSPayPaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerAchPaymentDetailsDialogData,
    private applyService: ApplyService,
    private userService: UserService,
    private toastrService: ToastrService,
  ) {
      this.formGroupData = new FormGroup({
          userId: new FormControl(this.userService.getPayUserId(), [Validators.required]),
          creditCardType: new FormControl('VISA', [Validators.required]),
          creditCardNumber: new FormControl(this.data.customerAchPaymentDetails.creditCardNumber, [Validators.required]),
          nameOnCreditCard: new FormControl(this.data.customerAchPaymentDetails.nameOnCreditCard, [Validators.required]),
          cvv: new FormControl(this.data.customerAchPaymentDetails.cvv, [Validators.required]),
          paymentAmount: new FormControl(this.data.customerAchPaymentDetails.paymentAmount || 0, [Validators.required]),
          showDate: new FormControl(' ', [Validators.required]),
      });
  }

  ngOnInit() {
    const currentDate: Moment = moment();
    this.creditCardExpDate = new FormControl(currentDate, [Validators.required]);
    this.data.customerAchPaymentDetails.creditCardExpYear = currentDate.year().toString();
    const month = currentDate.month().toString();
    this.data.customerAchPaymentDetails.creditCardExpMonth = month.length === 1 ? '0' + month : month;
    // this.accountTypeArray = BankAccountType.values();
    // this.accountCategoryArray = BankAccountCategoryType.values();
  }

  makeUSPayPayment(): void {
    this.data.customerAchPaymentDetails.userId = this.formGroupData.get('userId').value;
    this.data.customerAchPaymentDetails.creditCardNumber = this.formGroupData.get('creditCardNumber').value;
    this.data.customerAchPaymentDetails.creditCardType = this.formGroupData.get('creditCardType').value;
    this.data.customerAchPaymentDetails.nameOnCreditCard = this.formGroupData.get('nameOnCreditCard').value;
    this.data.customerAchPaymentDetails.cvv = this.formGroupData.get('cvv').value;
    console.log('this.data.customerAchPaymentDetails', this.data.customerAchPaymentDetails);

    this.applyService.makePayment(this.data.customerAchPaymentDetails).subscribe(() => {
      console.log('Payment successfully made');
      this.toastrService.success('Your payment has been successfully made.');
      this.dialogRef.close(true);
    }, (error) => {
      this.toastrService.error(error.error);
      this.dialogRef.close(false);
    });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.creditCardExpDate.value;
    ctrlValue.year(normalizedYear.year());
    this.creditCardExpDate.setValue(ctrlValue);
    if (this.formGroupData.get('showDate').value.length < 2) { this.formGroupData.get('showDate').setValue( '01/' + normalizedYear.year().toString()); }
    else {
        this.formGroupData.get('showDate').setValue(this.formGroupData.get('showDate').value.slice(0, 3) + normalizedYear.year().toString());
    }
    this.data.customerAchPaymentDetails.creditCardExpYear = normalizedYear.year().toString();
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.creditCardExpDate.value;
    ctrlValue.month(normalizedMonth.month());
    console.log(ctrlValue);
    this.creditCardExpDate.setValue(ctrlValue);
    const month = (normalizedMonth.month() + 1).toString();
    console.log(month);
    this.data.customerAchPaymentDetails.creditCardExpMonth = month.length === 1 ? '0' + month : month;
    this.formGroupData.get('showDate').setValue((month.length === 1 ? '0' + month : month) + '/' + normalizedMonth.year().toString());
    datepicker.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
