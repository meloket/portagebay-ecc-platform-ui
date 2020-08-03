import { Component }        from '@angular/core';
import { ApplyFormService } from '../apply-form.service';
import { FormPagesNames } from '../../_lib/FormPagesNamesEnum';
import { UserService } from '../../_lib/UserService';
import {Validators} from '@angular/forms';

@Component({
    selector: 'app-apply-arrival',
    templateUrl: './apply-arrival.component.html',
    styleUrls: [ './apply-arrival.component.scss' ]
})
export class ApplyArrivalComponent {

    private currentPage: string = FormPagesNames.ARRIVAL_PAGE;

    public constructor(
        public applyFormService: ApplyFormService,
        private userService: UserService) {}
    ngOnInit() {
        if (this.applyFormService.isSubmitted()) {
            this.applyFormService.arrivalformGroup.disable();
        } else {
            this.applyFormService.arrivalformGroup.enable();
            if (this.applyFormService.arrivalformGroup.get('onMyOwn').value == true) {
                this.applyFormService.arrivalformGroup.get('onmyownDate').setValidators([Validators.required]);
                this.applyFormService.arrivalformGroup.get('onmyownTime').setValidators([Validators.required]);
                this.applyFormService.arrivalformGroup.get('onmyownDate').updateValueAndValidity();
                this.applyFormService.arrivalformGroup.get('onmyownTime').updateValueAndValidity();
            }
        }
    }

    public setValidation(checked) {
        console.log(checked);
        if (checked) {
            this.applyFormService.arrivalformGroup.get('onmyownDate').setValidators([Validators.required]);
            this.applyFormService.arrivalformGroup.get('onmyownTime').setValidators([Validators.required]);
        } else {
            this.applyFormService.arrivalformGroup.get('onmyownDate').setValidators([]);
            this.applyFormService.arrivalformGroup.get('onmyownTime').setValidators([]);
            this.applyFormService.arrivalformGroup.get('onmyownDate').setValue('');
            this.applyFormService.arrivalformGroup.get('onmyownTime').setValue('');
        }
        this.applyFormService.arrivalformGroup.get('onmyownDate').updateValueAndValidity();
        this.applyFormService.arrivalformGroup.get('onmyownTime').updateValueAndValidity();
    }
}
