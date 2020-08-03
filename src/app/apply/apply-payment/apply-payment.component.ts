import { Component } from '@angular/core';
import { ApplyFormService } from '../apply-form.service';
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { FormPagesNames } from '../../_lib/FormPagesNamesEnum';
import { UserService } from '../../_lib/UserService';

@Component({
    selector: 'app-apply-payment',
    templateUrl: './apply-payment.component.html',
    styleUrls: ['./apply-payment.component.scss']
})
export class ApplyPaymentComponent {

    studentFirstName: string;
    studentLastName: string;
    studentId: number;
    _minAdvancedHomestayPayment: number = environment.MIN_ADVANCED_HOMESTAY_PAYMENT;
    _orcaBusPass: number = environment.ORCA_BUS_PASS;
    _airportPickup: number = environment.AIRPORT_PICKUP;
    _payForNowTypes = [
        {
            id: PayForNowTypes.MinAdvancedHomestayPayment,
            name: 'Minimum Advanced Payment for Homestay', amount: this._minAdvancedHomestayPayment
        },
        { id: PayForNowTypes.ORCABusPass, name: 'ORCA Bus Pass', amount: this._orcaBusPass },
        { id: PayForNowTypes.AirportPickup, name: 'Airport Pickup (for arrival dates only)', amount: this._airportPickup },
        { id: PayForNowTypes.HousingRent, name: 'Housing Rent:', amount: '' },
        { id: PayForNowTypes.Other, name: 'Other:', amount: '' }
    ];
    types: FormArray;
    homestayUrl = '/apply/homestay';
    residenceUrl = '/apply/residence';
    private currentPage: string = FormPagesNames.FEE_PAYMENT_AND_HOUSING_CHOICE;
    private DATE_REGEX = '/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/';
    private IS_NUM_OR_DECIMAL_REGEX = '^[0-9]+(.[0-9]{0,2})?$';

    public constructor(
        private applyFormService: ApplyFormService,
        private formBuilder: FormBuilder,
        private userService: UserService) { }

    ngOnInit() {
        this.populateStudentPersonalInfo();
        this.requireWireDetailsOnWireMethod();
        console.log('Payment form: ', this.applyFormService.paymentformGroup.valueChanges);
        if (this.applyFormService.isSubmitted()) {
            this.applyFormService.paymentformGroup.disable();
        } else {
            this.applyFormService.paymentformGroup.enable();
        }
    }

    private requireWireDetailsOnWireMethod() {
        this.applyFormService.paymentformGroup.get('method').valueChanges.subscribe(checked => {
            if (checked === 'wire') {
                this.applyFormService.paymentformGroup.get('wireAmount')
                    .setValidators([Validators.required, Validators.pattern(this.IS_NUM_OR_DECIMAL_REGEX)]);
                this.applyFormService.paymentformGroup.get('wireDate')
                    .setValidators([Validators.required]);
            } else {
                this.applyFormService.paymentformGroup.get('wireAmount')
                    .setValidators([Validators.pattern(this.IS_NUM_OR_DECIMAL_REGEX)]);
                this.applyFormService.paymentformGroup.get('wireDate')
                    .setValidators([]);
            }
            this.applyFormService.paymentformGroup.get('wireAmount').updateValueAndValidity();
            this.applyFormService.paymentformGroup.get('wireDate').updateValueAndValidity();
        });
    }

    private setValidator() {
        if (this.applyFormService.paymentformGroup.get('method').value === 'wire') {
            this.applyFormService.paymentformGroup.get('wireAmount')
                .setValidators([Validators.required, Validators.pattern(this.IS_NUM_OR_DECIMAL_REGEX)]);
            this.applyFormService.paymentformGroup.get('wireDate')
                .setValidators([Validators.required]);
        } else {
            this.applyFormService.paymentformGroup.get('wireAmount')
                .setValidators([Validators.pattern(this.IS_NUM_OR_DECIMAL_REGEX)]);
            this.applyFormService.paymentformGroup.get('wireDate')
                .setValidators([]);
        }
        this.applyFormService.paymentformGroup.get('wireAmount').updateValueAndValidity();
        this.applyFormService.paymentformGroup.get('wireDate').updateValueAndValidity();
    }

    private populateStudentPersonalInfo() {
        this.studentFirstName = this.applyFormService.personalInformationformGroup.get('nameFirst').value;
        this.studentLastName = this.applyFormService.personalInformationformGroup.get('nameLast').value;
        this.studentId = this.applyFormService.personalInformationformGroup.get('studentId').value;
    }

    toggleResidenceHallRanking() {
        const housingChoiceHomestayRanking: number = this.applyFormService.paymentformGroup.get('housingChoiceHomestayRanking').value;
        housingChoiceHomestayRanking == 1 ?
            this.applyFormService.paymentformGroup.get('housingChoiceResidenceHallRanking').setValue(2)
            : this.applyFormService.paymentformGroup.get('housingChoiceResidenceHallRanking').setValue(1);
    }

    toggleHomestayRanking() {
        const housingChoiceResidenceHallRanking: number = this.applyFormService.paymentformGroup.get('housingChoiceResidenceHallRanking').value;
        housingChoiceResidenceHallRanking == 1 ?
            this.applyFormService.paymentformGroup.get('housingChoiceHomestayRanking').setValue(2)
            : this.applyFormService.paymentformGroup.get('housingChoiceHomestayRanking').setValue(1);
    }

}

export enum PayForNowTypes {
    MinAdvancedHomestayPayment,
    ORCABusPass,
    AirportPickup,
    HousingRent,
    Other
}
