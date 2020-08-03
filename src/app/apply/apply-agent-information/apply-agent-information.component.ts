import { Component }        from '@angular/core';
import { ApplyFormService } from '../apply-form.service';
import { CountriesService } from '../../_lib/CountriesService';
import { FormControl, Validators } from '@angular/forms';
import { FormPagesNames } from '../../_lib/FormPagesNamesEnum';
import { UserService } from '../../_lib/UserService';

@Component({
    selector: 'app-apply-agent-information',
    templateUrl: './apply-agent-information.component.html',
    styleUrls: [ './apply-agent-information.component.scss' ]
})
export class ApplyAgentInformationComponent {

    private USA_CODE: string = '+1';
    private DEFAULT_COUNTRY_CODE: string = this.USA_CODE;
    private countriesCodes: string[] = [];
    private currentPage: string = FormPagesNames.AGENT_INFORMATION_PAGE;

    public constructor(
        private applyFormService: ApplyFormService,
        private countriesService: CountriesService,
        private userService: UserService) {}

    ngOnInit() {
        this.getCountriesCodes();
        if (this.applyFormService.isSubmitted()) {
            this.applyFormService.agentInformationformGroup.disable();
        } else {
            this.applyFormService.agentInformationformGroup.enable();
        }
    }

    private getCountriesCodes() {
        this.countriesService.allCountryCodes().subscribe(
            data => {
                data.forEach((element: { dial_code: string; }) => {
                    this.countriesCodes.push(element.dial_code);
                });
            },
            err => console.log(err),
            () => console.log('Country codes populated')
        );
        if (this.countriesCodes.length > 1) {
            this.countriesCodes.sort();
        }
    }

    private updatePhoneNum(countryCodeInput: string, phoneNumInput: string) {
        if (phoneNumInput.length > 0) {
            console.log("phoneNumInput: " + phoneNumInput);
            phoneNumInput = this.replaceCountryCode(phoneNumInput);
            this.applyFormService.agentInformationformGroup.get('phone').setValue(
                countryCodeInput + '-' + phoneNumInput);
        }
    }

    private prependPhoneCode(countryCodeInput: string, phoneNumInput: string) {
        console.log("prependPhoneCode");
        console.log("countryCodeInput: " + countryCodeInput);
        if (!countryCodeInput) {
            countryCodeInput = this.DEFAULT_COUNTRY_CODE;
        }
        if (phoneNumInput.length > 0) {
            phoneNumInput = this.replaceCountryCode(phoneNumInput);
        }
        this.applyFormService.agentInformationformGroup.get('phone').setValue(countryCodeInput + '-' + phoneNumInput);
    }

    private replaceCountryCode(phoneNum: string) {
        return phoneNum.substring(phoneNum.indexOf('-') + 1, phoneNum.length);
    }
}
