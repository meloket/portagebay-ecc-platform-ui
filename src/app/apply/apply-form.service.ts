import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplyService } from './apply.service';
import { PersonalInformation } from '../_lib/Forms/PersonalInformation.model';
import { AgentInformation } from '../_lib/Forms/AgentInformation.model';
import { Arrival } from '../_lib/Forms/Arrival.model';
import { Accommodations } from '../_lib/Forms/Accommodations.model';
import { Homestay } from '../_lib/Forms/Homestay.model';
import { Payment } from '../_lib/Forms/Payment.model';
import { User } from '../_lib/User';
import { Residence } from '../_lib/Forms/Residence.model';
import { PaymentPayNowOther } from '../_lib/Forms/PaymentPayNowOther.model';
import { environment } from '../../environments/environment';
import { CommonHelper } from '../_lib/CommonHelper';
import { UserService } from '../_lib/UserService';
import { Application } from '../_lib/Forms/Application.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApplyFormService {

    private PHONE_NUM_REGEX = '^\\+[0-9]{1}\\s?[0-9]{0,3}\\-[0-9]{10}$';
    private IS_NUM_OR_DECIMAL_REGEX = '^[0-9]+(.[0-9]{0,2})?$';

    public personalInformationformGroup: FormGroup;
    public agentInformationformGroup: FormGroup;
    public accomodationsformGroup: FormGroup;
    public arrivalformGroup: FormGroup;
    public homestayformGroup: FormGroup;
    public residenceFormGroup: FormGroup;
    public paymentformGroup: FormGroup;
    public newApplication: boolean;

    public constructor(
        private applyService: ApplyService,
        private userService: UserService) {
        this.populateFormFieldsForSavedApplication();
    }

    public isSubmitted() {
        return !this.userService.getNew();
    }

    public setSubmittedUser() {
        this.userService.setSubmitted();
    }

    ngOnInit() {
        console.log('personalInformationformGroup.valid');
        console.log(this.personalInformationformGroup.valid);
        console.log(this.personalInformationformGroup.value);
        this.personalInformationformGroup.valueChanges.subscribe(change => {
            console.log(change);
            console.log(this.personalInformationformGroup.valid);
        });
    }

    public populateFormFieldsForSavedApplication() {
        console.log('populateFormFieldsForSavedApplication start');
        const user: User = (this.userService.loggedInUser) ? this.userService.loggedInUser : new User();
        if (CommonHelper.newApplication(user)) {
            console.log('New application');
            this.newApplication = true;
            this.populatePersonalInfoForm(new PersonalInformation());
            this.populateAgentInfoForm(new AgentInformation());
            this.populateArrivalForm(new Arrival());
            this.populateAccommodationsForm(new Accommodations());
            this.populateHomestayForm(new Homestay());
            this.populateResidenceForm(new Residence());
            this.populatePaymentForm(new Payment());
        } else {
            console.log('Old application');
            this.newApplication = false;
            this.populatePersonalInfoForm(user.application.personalInformation);
            this.populateAgentInfoForm(user.application.agentInformation);
            this.populateArrivalForm(user.application.arrival);
            this.populateAccommodationsForm(user.application.accommodations);
            this.populateHomestayForm(user.application.homestay);
            this.populateResidenceForm(user.application.residence);
            this.populatePaymentForm(user.application.payment);
        }
        console.log('populateFormFieldsForSavedApplication end');
    }

    private populatePersonalInfoForm(personalInfo: PersonalInformation) {
        console.log('populatePersonalInfoForm');
        console.log(personalInfo);

        this.personalInformationformGroup = new FormGroup({

            studentId: new FormControl(personalInfo.studentId),
            year: new FormControl(+personalInfo.year, Validators.required),
            quarter: new FormControl(personalInfo.quarter, Validators.required),
            studentType: new FormControl(personalInfo.studentType, Validators.required),

            nameFirst: new FormControl(personalInfo.nameFirst, Validators.required),
            nameMiddle: new FormControl(personalInfo.nameMiddle, Validators.required),
            nameLast: new FormControl(personalInfo.nameLast, Validators.required),
            gender: new FormControl(personalInfo.gender, Validators.required),
            dateOfBirth: new FormControl(personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth) : new Date(), [

                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10)

            ]),

            contactAddress: new FormControl(personalInfo.contactAddress, Validators.required),
            contactCity: new FormControl(personalInfo.contactCity, Validators.required),
            contactState: new FormControl(personalInfo.contactState, Validators.required),
            contactPostalCode: new FormControl(personalInfo.contactPostalCode, Validators.required),
            contactCountry: new FormControl(personalInfo.contactCountry, Validators.required),
            contactPhone: new FormControl(personalInfo.contactPhone, [
                Validators.required,
                Validators.pattern(this.PHONE_NUM_REGEX)
            ]),
            contactEmail1: new FormControl(personalInfo.contactEmail1, [
                Validators.required,
                Validators.email
            ]),
            contactEmail2: new FormControl(personalInfo.contactEmail2, Validators.email),

            countryOfBirth: new FormControl(personalInfo.countryOfBirth),
            countryOfCitizenship: new FormControl(personalInfo.countryOfCitizenship, Validators.required),
            nativeLanguage: new FormControl(personalInfo.nativeLanguage, Validators.required),

            emergencyContactName: new FormControl(personalInfo.emergencyContactName, Validators.required),
            emergencyContactPhone: new FormControl(personalInfo.emergencyContactPhone, [
                Validators.required,
                Validators.pattern(this.PHONE_NUM_REGEX)
            ]),
            emergencyContactEmail: new FormControl(personalInfo.emergencyContactEmail, [
                Validators.required,
                Validators.email
            ]),
            emergencyContactRelationship: new FormControl(personalInfo.emergencyContactRelationship),
            emergencyContactAddress: new FormControl(personalInfo.emergencyContactAddress),
            emergencyContactCountry: new FormControl(personalInfo.emergencyContactCountry),
            profileImage: new FormControl(personalInfo.profileImage),

        });
    }

    private populateAgentInfoForm(agentInformation: AgentInformation) {
        this.agentInformationformGroup = new FormGroup({

            agencyName: new FormControl(agentInformation.agencyName),
            contactPerson: new FormControl(agentInformation.contactPerson),
            countryCode: new FormControl(agentInformation.phone ?
                CommonHelper.getCountryCodeFromPhoneNum(agentInformation.phone) : '+1'),
            phone: new FormControl(agentInformation.phone, Validators.pattern(this.PHONE_NUM_REGEX)),
            email: new FormControl(agentInformation.email, Validators.email),

        });
    }

    private populateAccommodationsForm(accommodations: Accommodations) {
        this.accomodationsformGroup = new FormGroup({

            requireAssitance: new FormControl(accommodations.requireAssitance ?
                accommodations.requireAssitance : 'no', Validators.required),
            assistanceDetails: new FormControl(accommodations.assistanceDetails),
            hasMedicalConditions: new FormControl(accommodations.hasMedicalConditions ?
                accommodations.hasMedicalConditions : 'no', Validators.required),
            conditionsDetails: new FormControl(accommodations.conditionsDetails),
            consentName: new FormControl(accommodations.consentName, Validators.required),
            consentParent: new FormControl(accommodations.consentParent, Validators.required),
            acknowledgement: new FormControl(accommodations.acknowledgement || false, Validators.required),
            signatureParent: new FormControl(accommodations.signatureParent, Validators.required),
            signatureParentDate: new FormControl(accommodations.signatureParentDate ? new Date(accommodations.signatureParentDate) : new Date(), Validators.required),
            signatureWitness: new FormControl(accommodations.signatureWitness),
            signatureWitnessDate: new FormControl(accommodations.signatureWitnessDate ? new Date(accommodations.signatureWitnessDate) : new Date()),

        });
    }

    private populateHomestayForm(homestay: Homestay) {
        this.homestayformGroup = new FormGroup({

            level: new FormControl(homestay.level, Validators.required),
            choice1: new FormControl(homestay.choice1),
            choice2: new FormControl(homestay.choice2),
            choice3: new FormControl(homestay.choice3),
            dietaryNeeds: new FormControl(homestay.dietaryNeeds),
            specialRequest: new FormControl(homestay.specialRequest),
            smoking: new FormControl(homestay.smoking),
            introduction: new FormControl(homestay.introduction),
            signatureName: new FormControl(homestay.signatureName),
            signatureDate: new FormControl(homestay.signatureDate ? new Date(homestay.signatureDate) : new Date()),

        });
    }

    private populateArrivalForm(arrival: Arrival) {
        console.log('populateArrivalForm');
        console.log(arrival);
        this.arrivalformGroup = new FormGroup({

            type: new FormControl(arrival.type, Validators.required),
            flightDate: new FormControl(new Date(arrival.flightDate)),
            flightAirline: new FormControl(arrival.flightAirline),
            flightNumber: new FormControl(arrival.flightNumber),
            flightTime: new FormControl(arrival.flightTime),
            onMyOwn: new FormControl((arrival.onmyownDate || arrival.onmyownTime) ? true : false),
            onmyownDate: new FormControl(arrival.onmyownDate ? new Date(arrival.onmyownDate) : new Date()),
            onmyownTime: new FormControl(arrival.onmyownTime),

        });
    }

    private populatePaymentForm(payment: Payment) {
        if (!payment.paymentPayNowOther) {
            payment.paymentPayNowOther = new PaymentPayNowOther();
        }
        this.paymentformGroup = new FormGroup({

            madeBy: new FormControl(payment.madeBy, Validators.required),
            madeByOther: new FormControl(payment.madeByOther),
            financialAid: new FormControl(payment.financialAid),
            email: new FormControl(payment.email, [
                Validators.required,
                Validators.email
            ]),
            method: new FormControl(payment.method ? payment.method : 'credit', Validators.required),
            wireAmount: new FormControl(payment.wireAmount, Validators.pattern(this.IS_NUM_OR_DECIMAL_REGEX)),
            // wireAmount: new FormControl(payment.wireAmount),
            wireDate: new FormControl(new Date(payment.wireDate)),
            minAdvancedHomestayPayment: new FormControl(payment.paymentPayNowOther.minAdvancedHomestayPayment ?
                payment.paymentPayNowOther.minAdvancedHomestayPayment : false),
            orcaBusPass: new FormControl(payment.paymentPayNowOther.orcaBusPass ?
                payment.paymentPayNowOther.orcaBusPass : false),
            airportPickup: new FormControl(payment.paymentPayNowOther.airportPickup ?
                payment.paymentPayNowOther.airportPickup : false),
            housingRent: new FormControl(payment.paymentPayNowOther.housingRentAmount ?
                true : false),
            housingRentAmount: new FormControl(payment.paymentPayNowOther.housingRentAmount,
                Validators.pattern(this.IS_NUM_OR_DECIMAL_REGEX)),
            other: new FormControl(payment.paymentPayNowOther.otherAmount ?
                true : false),
            otherAmount: new FormControl(payment.paymentPayNowOther.otherAmount, Validators.pattern(this.IS_NUM_OR_DECIMAL_REGEX)),
            housingChoiceHomestayRanking: new FormControl(payment.housingChoiceHomestayRanking ?
                +payment.housingChoiceHomestayRanking : 1),
            housingChoiceResidenceHallRanking: new FormControl(payment.housingChoiceResidenceHallRanking ?
                +payment.housingChoiceResidenceHallRanking : 2),
            printedName: new FormControl(payment.printedName, Validators.required),
            date: new FormControl(payment.date ? new Date(payment.date) : new Date(), [
                Validators.required
            ])
        });
        console.log('paymentFormGroup');
        console.log(this.paymentformGroup.value);
    }

    private populateResidenceForm(residence: Residence) {
        this.residenceFormGroup = new FormGroup({

            contractFor: new FormControl(residence.contractFor),
            contractForOther: new FormControl(residence.contractForOther),
            ranierPlaceRank: new FormControl(residence.ranierPlaceRank),
            stanierCtRank: new FormControl(residence.stanierCtRank),
            sophieCtRank: new FormControl(residence.sophieCtRank),
            roomTypeChoice1: new FormControl(residence.roomTypeChoice1),
            roomTypeChoice2: new FormControl(residence.roomTypeChoice2),
            roomTypeChoice3: new FormControl(residence.roomTypeChoice3),
            apartmentType: new FormControl(residence.apartmentType),
            athleteAtEdCC: new FormControl(residence.athleteAtEdCC ? residence.athleteAtEdCC : 'no'),
            athleteAtEdCCSport: new FormControl(residence.athleteAtEdCCSport),
            smoke: new FormControl(residence.smoke ? residence.smoke : 'never'),
            allergicToSmoke: new FormControl(residence.allergicToSmoke ? residence.allergicToSmoke : 'no'),
            hobbies: new FormControl(residence.hobbies ? residence.hobbies : ''),
            vegetarian: new FormControl(residence.vegetarian ? residence.vegetarian : 'no'),
            someoneToLiveWith: new FormControl(residence.someoneToLiveWith ? residence.someoneToLiveWith : ''),
            otherPreferences: new FormControl(residence.otherPreferences ? residence.otherPreferences : ''),
            veteran: new FormControl(residence.veteran ? residence.veteran : 'no')
        });
    }

    public submit(): Observable<any> {
        const populatedUserWithAdditionalInfo: User = this.getPopulatedUserWithAdditionalInfo();
        return this.applyService.submitAdditionalInfo(populatedUserWithAdditionalInfo);
    }

    public patch(): Observable<any> {
        const populatedUserWithAdditionalInfo: User = this.getPopulatedUserWithAdditionalInfo();
        return this.applyService.patchAdditionalInfo(populatedUserWithAdditionalInfo);
    }

    private getPopulatedUserWithAdditionalInfo(): User {
        const user: User = new User();
        user.email = this.getPersonalInfo().contactEmail1 || this.userService.loggedInUser.email;
        user.studentId = this.getPersonalInfo().studentId || this.userService.loggedInUser.studentId;
        user.application = new Application();
        user.application.personalInformation = this.getPersonalInfo();
        user.application.agentInformation = this.getAgentInfo();
        user.application.accommodations = this.getAccommodations();
        user.application.arrival = this.getArrival();
        user.application.homestay = this.getHomestay();
        user.application.payment = this.getPayment();
        user.application.residence = this.getResidence();
        return user;
    }

    private getPersonalInfo(): PersonalInformation {
        const personalInformation: PersonalInformation = new PersonalInformation();
        const personalInfoFG: FormGroup = this.personalInformationformGroup;
        personalInformation.studentId = this.getFormGroupValue(personalInfoFG, 'studentId');
        personalInformation.year = this.getFormGroupValue(personalInfoFG, 'year');
        personalInformation.quarter = this.getFormGroupValue(personalInfoFG, 'quarter');
        personalInformation.studentType = this.getFormGroupValue(personalInfoFG, 'studentType');
        personalInformation.nameFirst = this.getFormGroupValue(personalInfoFG, 'nameFirst');
        personalInformation.nameMiddle = this.getFormGroupValue(personalInfoFG, 'nameMiddle');
        personalInformation.nameLast = this.getFormGroupValue(personalInfoFG, 'nameLast');
        personalInformation.gender = this.getFormGroupValue(personalInfoFG, 'gender');
        let dateOfBirth: Date = new Date(this.getFormGroupValue(personalInfoFG, 'dateOfBirth'))
        dateOfBirth.setMinutes((dateOfBirth.getMinutes() - dateOfBirth.getTimezoneOffset()));
        personalInformation.dateOfBirth = dateOfBirth;
        personalInformation.contactAddress = this.getFormGroupValue(personalInfoFG, 'contactAddress');
        personalInformation.contactCity = this.getFormGroupValue(personalInfoFG, 'contactCity');
        personalInformation.contactState = this.getFormGroupValue(personalInfoFG, 'contactState');
        const valueWithIndex = this.getFormGroupValue(personalInfoFG, 'contactCountry');
        personalInformation.contactCountry = CommonHelper.removeIndexFromValue(valueWithIndex);
        personalInformation.contactPostalCode = this.getFormGroupValue(personalInfoFG, 'contactPostalCode');
        personalInformation.contactPhone = this.getFormGroupValue(personalInfoFG, 'contactPhone');
        personalInformation.contactEmail1 = this.getFormGroupValue(personalInfoFG, 'contactEmail1');
        personalInformation.contactEmail2 = this.getFormGroupValue(personalInfoFG, 'contactEmail2');
        personalInformation.countryOfBirth = this.getFormGroupValue(personalInfoFG, 'countryOfBirth');
        personalInformation.countryOfCitizenship = this.getFormGroupValue(personalInfoFG, 'countryOfCitizenship');
        personalInformation.nativeLanguage = this.getFormGroupValue(personalInfoFG, 'nativeLanguage');
        personalInformation.emergencyContactName =
            this.getFormGroupValue(personalInfoFG, 'emergencyContactName');
        personalInformation.emergencyContactPhone = this.getFormGroupValue(personalInfoFG, 'emergencyContactPhone');
        personalInformation.emergencyContactEmail =
            this.getFormGroupValue(personalInfoFG, 'emergencyContactEmail');
        personalInformation.emergencyContactRelationship = this.getFormGroupValue(personalInfoFG, 'emergencyContactRelationship');
        personalInformation.emergencyContactAddress =
            this.getFormGroupValue(personalInfoFG, 'emergencyContactAddress');
        personalInformation.emergencyContactCountry =
            this.getFormGroupValue(personalInfoFG, 'emergencyContactCountry');
        personalInformation.profileImage =
            this.getFormGroupValue(personalInfoFG, 'profileImage');
        return personalInformation;
    }

    private getAgentInfo(): AgentInformation {
        const agentInformation: AgentInformation = new AgentInformation();
        const agentInfoFG: FormGroup = this.agentInformationformGroup;
        agentInformation.agencyName = this.getFormGroupValue(agentInfoFG, 'agencyName');
        agentInformation.contactPerson = this.getFormGroupValue(agentInfoFG, 'contactPerson');
        agentInformation.phone = this.getFormGroupValue(agentInfoFG, 'phone');
        agentInformation.email = this.getFormGroupValue(agentInfoFG, 'email');
        return agentInformation;
    }

    private getAccommodations(): Accommodations {
        const accommodations: Accommodations = new Accommodations();
        const accommodationsFG: FormGroup = this.accomodationsformGroup;
        accommodations.requireAssitance = this.getFormGroupValue(accommodationsFG, 'requireAssitance');
        accommodations.assistanceDetails = this.getFormGroupValue(accommodationsFG, 'assistanceDetails');
        accommodations.hasMedicalConditions =
            this.getFormGroupValue(accommodationsFG, 'hasMedicalConditions');
        accommodations.conditionsDetails = this.getFormGroupValue(accommodationsFG, 'conditionsDetails');
        accommodations.consentName = this.getFormGroupValue(accommodationsFG, 'consentName');
        accommodations.consentParent = this.getFormGroupValue(accommodationsFG, 'consentParent');
        accommodations.acknowledgement = this.getFormGroupValue(accommodationsFG, 'acknowledgement');
        accommodations.signatureParent = this.getFormGroupValue(accommodationsFG, 'signatureParent');
        let signatureParentDate: Date = new Date(this.getFormGroupValue(accommodationsFG, 'signatureParentDate'))
        signatureParentDate.setMinutes((signatureParentDate.getMinutes() - signatureParentDate.getTimezoneOffset()));
        accommodations.signatureParentDate = signatureParentDate;
        accommodations.signatureWitness = this.getFormGroupValue(accommodationsFG, 'signatureWitness');
        let signatureWitnessDate: Date = new Date(this.getFormGroupValue(accommodationsFG, 'signatureWitnessDate'))
        signatureWitnessDate.setMinutes((signatureWitnessDate.getMinutes() - signatureWitnessDate.getTimezoneOffset()));
        accommodations.signatureWitnessDate = signatureWitnessDate;
        return accommodations;
    }

    private getArrival(): Arrival {
        const arrival: Arrival = new Arrival();
        const arrivalFG: FormGroup = this.arrivalformGroup;
        arrival.type = this.getFormGroupValue(arrivalFG, 'type');
        let flightDate: Date = new Date(this.getFormGroupValue(arrivalFG, 'flightDate'))
        flightDate.setMinutes((flightDate.getMinutes() - flightDate.getTimezoneOffset()));
        arrival.flightDate = flightDate;
        arrival.flightNumber = this.getFormGroupValue(arrivalFG, 'flightNumber');
        arrival.flightAirline = this.getFormGroupValue(arrivalFG, 'flightAirline');
        arrival.flightTime = this.getFormGroupValue(arrivalFG, 'flightTime');
        let onmyownDate: Date = new Date(this.getFormGroupValue(arrivalFG, 'onmyownDate'))
        onmyownDate.setMinutes((onmyownDate.getMinutes() - onmyownDate.getTimezoneOffset()));
        arrival.onmyownDate = onmyownDate;
        arrival.onmyownTime = this.getFormGroupValue(arrivalFG, 'onmyownTime');
        return arrival;
    }

    private getHomestay(): Homestay {
        const homestay: Homestay = new Homestay();
        const homestayFG: FormGroup = this.homestayformGroup;
        homestay.level = this.getFormGroupValue(homestayFG, 'level');
        homestay.choice1 = this.getFormGroupValue(homestayFG, 'choice1');
        homestay.choice2 = this.getFormGroupValue(homestayFG, 'choice2');
        homestay.choice3 = this.getFormGroupValue(homestayFG, 'choice3');
        homestay.dietaryNeeds = this.getFormGroupValue(homestayFG, 'dietaryNeeds');
        homestay.specialRequest = this.getFormGroupValue(homestayFG, 'specialRequest');
        homestay.smoking = this.getFormGroupValue(homestayFG, 'smoking');
        homestay.introduction = this.getFormGroupValue(homestayFG, 'introduction');
        homestay.signatureName = this.getFormGroupValue(homestayFG, 'signatureName');
        let signatureDate: Date = new Date(this.getFormGroupValue(homestayFG, 'signatureDate'))
        signatureDate.setMinutes((signatureDate.getMinutes() - signatureDate.getTimezoneOffset()));
        homestay.signatureDate = signatureDate;
        return homestay;
    }

    private getPayment(): Payment {
        const payment: Payment = new Payment();
        const paymentFG: FormGroup = this.paymentformGroup;
        payment.madeBy = this.getFormGroupValue(paymentFG, 'madeBy');
        payment.madeByOther = this.getFormGroupValue(paymentFG, 'madeByOther');
        payment.financialAid = this.getFormGroupValue(paymentFG, 'financialAid');
        payment.email = this.getFormGroupValue(paymentFG, 'email');
        payment.method = this.getFormGroupValue(paymentFG, 'method');
        payment.wireAmount = this.getFormGroupValue(paymentFG, 'wireAmount');
        let wireDate: Date = new Date(this.getFormGroupValue(paymentFG, 'wireDate'));
        wireDate.setMinutes((wireDate.getMinutes() - wireDate.getTimezoneOffset()));
        payment.wireDate = wireDate;
        payment.paymentPayNowOther = new PaymentPayNowOther();
        if (this.getFormGroupValue(paymentFG, 'minAdvancedHomestayPayment') == true) {
            payment.paymentPayNowOther.minAdvancedHomestayPayment = environment.MIN_ADVANCED_HOMESTAY_PAYMENT;
        }
        if (this.getFormGroupValue(paymentFG, 'orcaBusPass') == true) {
            payment.paymentPayNowOther.orcaBusPass = environment.ORCA_BUS_PASS;
        }
        if (this.getFormGroupValue(paymentFG, 'airportPickup') == true) {
            payment.paymentPayNowOther.airportPickup = environment.AIRPORT_PICKUP;
        }
        if (this.getFormGroupValue(paymentFG, 'housingRent') == true) {
            payment.paymentPayNowOther.housingRentAmount =
                this.getFormGroupValue(paymentFG, 'housingRentAmount');
        }
        if (this.getFormGroupValue(paymentFG, 'other') == true) {
            payment.paymentPayNowOther.otherAmount =
                this.getFormGroupValue(paymentFG, 'otherAmount');
        }
        payment.housingChoiceHomestayRanking = this.getFormGroupValue(paymentFG, 'housingChoiceHomestayRanking');
        payment.housingChoiceResidenceHallRanking = this.getFormGroupValue(paymentFG, 'housingChoiceResidenceHallRanking');
        payment.printedName = this.getFormGroupValue(paymentFG, 'printedName');
        let date: Date = new Date(this.getFormGroupValue(paymentFG, 'date'))
        date.setMinutes((date.getMinutes() - date.getTimezoneOffset()));
        payment.date = date;
        return payment;
    }

    private getResidence(): Residence {
        const residence: Residence = new Residence();
        const residenceFG: FormGroup = this.residenceFormGroup;
        const contractForOther: string = this.getFormGroupValue(residenceFG, 'contractForOther');
        if (CommonHelper.isSet(contractForOther)) {
            residence.contractFor = contractForOther;
        } else {
            residence.contractFor = this.getFormGroupValue(residenceFG, 'contractFor');
        }
        residence.ranierPlaceRank = this.getFormGroupValue(residenceFG, 'ranierPlaceRank');
        residence.stanierCtRank = this.getFormGroupValue(residenceFG, 'stanierCtRank');
        residence.sophieCtRank = this.getFormGroupValue(residenceFG, 'sophieCtRank');
        residence.roomTypeChoice1 = this.getFormGroupValue(residenceFG, 'roomTypeChoice1');
        residence.roomTypeChoice2 = this.getFormGroupValue(residenceFG, 'roomTypeChoice2');
        residence.roomTypeChoice3 = this.getFormGroupValue(residenceFG, 'roomTypeChoice3');
        residence.apartmentType = this.getFormGroupValue(residenceFG, 'apartmentType');
        residence.athleteAtEdCC = this.getFormGroupValue(residenceFG, 'athleteAtEdCC');
        residence.athleteAtEdCCSport = this.getFormGroupValue(residenceFG, 'athleteAtEdCCSport');
        residence.smoke = this.getFormGroupValue(residenceFG, 'smoke');
        residence.allergicToSmoke = this.getFormGroupValue(residenceFG, 'allergicToSmoke');
        residence.hobbies = this.getFormGroupValue(residenceFG, 'hobbies');
        residence.vegetarian = this.getFormGroupValue(residenceFG, 'vegetarian');
        residence.someoneToLiveWith = this.getFormGroupValue(residenceFG, 'someoneToLiveWith');
        residence.otherPreferences = this.getFormGroupValue(residenceFG, 'otherPreferences');
        residence.veteran = this.getFormGroupValue(residenceFG, 'veteran');
        return residence;
    }

    private getFormGroupValue(group: FormGroup, controlName: string): any {
        return group.get(controlName).value;
    }

}
