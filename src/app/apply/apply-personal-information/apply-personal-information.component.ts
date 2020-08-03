import { Component } from '@angular/core';
import { ApplyFormService } from '../apply-form.service';
import { CountriesService } from '../../_lib/CountriesService';
import { FormPagesNames } from '../../_lib/FormPagesNamesEnum';
import { UserService } from '../../_lib/UserService';
import { CommonHelper } from '../../_lib/CommonHelper';
import { HttpClient } from '@angular/common/http';
import { ApplyService } from '../apply.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-apply-personal-information',
    templateUrl: './apply-personal-information.component.html',
    styleUrls: ['./apply-personal-information.component.scss'],
})
export class ApplyPersonalInformationComponent {

    next10Years = [];
    SEPTEMBER = 8;
    FALL_START_MONTH: number = this.SEPTEMBER;
    stateInfo: any[] = [];
    countryInfo: any[] = [];
    cityInfo: any[] = [];
    worldLanguages: any[] = [];
    studentPhoneCode = '+1';
    emergencyPersonPhoneCode = '+1';
    loggedInUserEmail = '';
    currentPage: string = FormPagesNames.PERSONAL_INFORMATION_PAGE;
    agentInformationLink = '/apply/agent-information';
    accomodationLink = '/apply/accomodations';
    nextLink = '/apply/agent-information';
    selectedFile: File;
    base64Data: any;

    public constructor(
        public applyFormService: ApplyFormService,
        private countriesService: CountriesService,
        private userService: UserService,
        private applyService: ApplyService,
        private httpClient: HttpClient,
        private datePipe: DatePipe
    ) {
        this.applyFormService.personalInformationformGroup.get('profileImage').valueChanges.subscribe(val => {
            this.base64Data = val;
        });
        const origin = this.applyFormService.personalInformationformGroup.get('dateOfBirth').value;
        this.applyFormService.personalInformationformGroup.get('dateOfBirth').setValue(this.datePipe.transform(origin, 'yyyy-MM-dd'));
    }

    ngOnInit() {
        this.populatePrimaryEmailIdFromSession();
        this.calculateNext10Years();
        this.getCountries();
        this.getLanguages();
        if (this.applyFormService.isSubmitted()) {
            this.applyFormService.personalInformationformGroup.disable();
        } else {
            this.applyFormService.personalInformationformGroup.enable();
        }
        if (this.userService.domestic) {
            this.nextLink = this.accomodationLink;
        }
    }

    private populatePrimaryEmailIdFromSession() {
        // this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
        this.loggedInUserEmail = this.userService.loggedInUser.email;
        this.applyFormService.personalInformationformGroup.get('contactEmail1').setValue(this.loggedInUserEmail);
        const loggedInStudentId: number = this.userService.loggedInUser.studentId;
        this.applyFormService.personalInformationformGroup.get('studentId').setValue(loggedInStudentId);
    }

    private calculateNext10Years() {
        const currentDate: Date = new Date();
        let currentYear: number = currentDate.getFullYear();
        if (currentDate.getMonth() >= this.FALL_START_MONTH) {
            // if current month has crossed September, start from next year
            currentYear = currentYear + 1;
        }
        for (let i = 0; i < 10; i++) {
            this.next10Years.push(currentYear++);
        }
    }

    private getCountries() {
        this.countriesService.allCountries().subscribe(
            data => {
                this.countryInfo = data.Countries;
                this.preSetStateAndCityIfExistingUser();
                //  console.log('Data:', this.countryInfo);
            },
            err => console.log(err),
            () => console.log('Countries populated')
        );
    }

    private getLanguages() {
        this.countriesService.allLanguages().subscribe(
            data => {
                for (const key in data) {
                    this.worldLanguages.push(data[key].name);
                }
            },
            err => console.log(err),
            () => console.log('Languages populated')
        );
    }

    private onChangeCountry(countryValueWithIndex: string) {
        console.log('formControlName-contactCountry value: ');
        console.log(this.applyFormService.personalInformationformGroup.get('contactCountry'));
        console.log('countryValueWithIndex: ');
        console.log(countryValueWithIndex);
        let contactCountry: string;
        const splitted: string[] = countryValueWithIndex.split('-');
        contactCountry = splitted[0];
        const countryIndex: number = +splitted[1];
        console.log(contactCountry);
        console.log(countryIndex);
        // this.applyFormService.personalInformationformGroup.get('contactCountry').setValue(contactCountry);
        this.stateInfo = this.countryInfo[countryIndex].States;
        console.log('Selected state: ');
        console.log(this.stateInfo);
        this.setStudentCountryCode(contactCountry);
    }


    private onChangeEmergencyContactCountry(countryValue: string) {
        console.log('formControlName-emergencyContactCountry value: ');
        console.log(this.applyFormService.personalInformationformGroup.get('emergencyContactCountry'));
        this.setEmergencyContactCountryCode(countryValue);
    }

    private onChangeState(stateValueWithIndex: string) {
        console.log('stateValue: ');
        console.log(stateValueWithIndex);
        const stateIndex = stateValueWithIndex.split('-')[1];
        this.cityInfo = this.stateInfo[stateIndex].Cities;
        console.log('Selected state cities: ');
        console.log(this.cityInfo);
    }

    private preSetStateAndCityIfExistingUser() {
        console.log('preSetStateAndCityIfExistingUser');
        console.log('Is new application? ' + CommonHelper.newApplication(this.userService.loggedInUser));
        if (!CommonHelper.newApplication(this.userService.loggedInUser)) {
            const studentCountryIndex: number = this.getStudentCountryIndexForExistingUser();
            console.log('studentCountryIndex: ' + studentCountryIndex);
            this.stateInfo = this.countryInfo[studentCountryIndex].States;
            const studentStateIndex: number = this.getStudentStateIndexForExistingUser();
            console.log('studentStateIndex: ' + studentStateIndex);
            this.cityInfo = this.stateInfo[studentStateIndex].Cities;
        }
    }

    private getStudentCountryIndexForExistingUser(): number {
        const studentCountry: string = this.userService.loggedInUser.application.personalInformation.contactCountry;
        console.log('studentCountry: ' + studentCountry);
        for (let i = 0; i < this.countryInfo.length; i++) {
            if (this.countryInfo[i].CountryName === studentCountry) {
                return i;
            }
        }
    }

    private getStudentStateIndexForExistingUser(): number {
        const studentState: string = this.userService.loggedInUser.application.personalInformation.contactState;
        for (let i = 0; i < this.stateInfo.length; i++) {
            if (this.stateInfo[i].StateName === studentState) {
                return i;
            }
        }
    }

    private setStudentCountryCode(contactCountry: string) {
        this.countriesService.allCountryCodes().subscribe(
            data => {
                data.forEach((element: { name: string; dial_code: string; }) => {
                    if (element.name === contactCountry) {
                        console.log('contactCountry changed');
                        this.studentPhoneCode = element.dial_code;
                        this.onChangeContactPhone();
                    }
                });
            }
        );
    }

    /**
     * set userservice domestic value
     * @param studentType
     */
    private onChangeStudentType(studentType: string) {
        this.userService.domestic = (studentType === 'domestic');

        // According this domestic value, the next page link will be changed.
        if (this.userService.domestic) {
            this.nextLink = this.accomodationLink;
        } else {
            this.nextLink = this.agentInformationLink;
        }
    }

    private setEmergencyContactCountryCode(contactCountry: string) {
        this.countriesService.allCountryCodes().subscribe(
            data => {
                data.forEach((element: { name: string; dial_code: string; }) => {
                    if (element.name === contactCountry) {
                        console.log('emergencyContactCountry changed');
                        this.emergencyPersonPhoneCode = element.dial_code;
                        this.onChangeEmergencyContactPhone();
                    }
                });
            }
        );
    }

    private onChangeContactPhone() {
        console.log('Contact phone number changed: ');
        let enteredPhNumber: string = this.applyFormService.personalInformationformGroup.get('contactPhone').value;
        console.log(enteredPhNumber);
        enteredPhNumber = this.updateStudentPhoneNumCode(enteredPhNumber);
        this.applyFormService.personalInformationformGroup.get('contactPhone').setValue(enteredPhNumber);
    }

    private onChangeEmergencyContactPhone() {
        console.log('Emergency Contact phone number changed: ');
        let enteredPhNumber: string = this.applyFormService.personalInformationformGroup.get('emergencyContactPhone').value;
        console.log(enteredPhNumber);
        enteredPhNumber = this.updateEmergencyPersonPhoneNumCode(enteredPhNumber);
        this.applyFormService.personalInformationformGroup.get('emergencyContactPhone').setValue(enteredPhNumber);
    }

    private updateStudentPhoneNumCode(phoneNum: string): string {
        return this.updatePhoneNumCode(phoneNum, this.studentPhoneCode);
    }

    private updateEmergencyPersonPhoneNumCode(phoneNum: string): string {
        return this.updatePhoneNumCode(phoneNum, this.emergencyPersonPhoneCode);
    }

    private updatePhoneNumCode(phoneNum: string, code: string): string {
        if (phoneNum && phoneNum.length > 0) {
            if (phoneNum.indexOf('-') > -1) {
                phoneNum = phoneNum.substring(phoneNum.indexOf('-') + 1);
            }
            return code + '-' + phoneNum;
        }
        return '';
    }

    public onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

        let setR64 = (r64) => this.applyFormService.personalInformationformGroup.get('profileImage').setValue(r64);

        var reader = new FileReader();
        reader.onloadend = function () {
            setR64(reader.result);
        }
        reader.readAsDataURL(this.selectedFile);
    }
}
