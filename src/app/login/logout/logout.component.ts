import { Component }             from '@angular/core';
import { Router }                from '@angular/router';
import { ToastrService }         from 'ngx-toastr';
import { AuthenticationService } from '../../_lib/AuthenticationService';
import { ApplyFormService } from '../../apply/apply-form.service';
import { ProgressBarService } from '../../_lib/ProgressBarService';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: [ './logout.component.scss' ]
})
export class LogoutComponent {

    public constructor(private authenticationService: AuthenticationService,
                       private router: Router,
                       private toastrService: ToastrService,
                       private applyFormService: ApplyFormService,
                       private progressBarService: ProgressBarService) {
        authenticationService.logout();
        progressBarService.setDisplayProgressBar();
        // this.resetAllForms();
        toastrService.success('You\'ve been logged out!');
        router.navigate([ '/login' ]);
    }

    private resetAllForms() {
        this.applyFormService.personalInformationformGroup.reset();
        this.applyFormService.agentInformationformGroup.reset();
        this.applyFormService.homestayformGroup.reset();
        this.applyFormService.arrivalformGroup.reset();
        this.applyFormService.paymentformGroup.reset();
        this.applyFormService.residenceFormGroup.reset();
        this.restoreDefaultValues();
    }

    private restoreDefaultValues() {
        this.applyFormService.agentInformationformGroup.get('countryCode').setValue('+1');
        this.applyFormService.accomodationsformGroup.get('requireAssitance').setValue('no');
        this.applyFormService.accomodationsformGroup.get('hasMedicalConditions').setValue('no');
        this.applyFormService.paymentformGroup.get('method').setValue('credit');
        this.applyFormService.paymentformGroup.get('housingChoiceHomestayRanking').setValue(1);
        this.applyFormService.paymentformGroup.get('housingChoiceResidenceHallRanking').setValue(2);
        this.applyFormService.residenceFormGroup.get('athleteAtEdCC').setValue('no');
        this.applyFormService.residenceFormGroup.get('smoke').setValue('never');
        this.applyFormService.residenceFormGroup.get('allergicToSmoke').setValue('no');
        this.applyFormService.residenceFormGroup.get('vegetarian').setValue('no');
        this.applyFormService.residenceFormGroup.get('vegetarian').setValue('no');
        this.applyFormService.residenceFormGroup.get('veteran').setValue('no');
    }

}
