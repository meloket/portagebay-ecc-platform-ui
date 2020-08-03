import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../_lib/AuthenticationService';
import { RequestResult } from '../../_lib/RequestResult';
import { User } from '../../_lib/User';
import { ApplyFormService } from '../../apply/apply-form.service';
import { UserService } from '../../_lib/UserService';
import { ProgressBarService } from '../../_lib/ProgressBarService';
import {InvoicesService} from '../../_lib/InvoicesService';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

    displayLoadingSpinner: boolean;
    public formGroup: FormGroup = new FormGroup({
        email: new FormControl('', [
            Validators.required
        ]),
        password: new FormControl('', [
            Validators.required
        ]),
    });

    public constructor(private authenticationService: AuthenticationService,
        private router: Router,
        private toastrService: ToastrService,
        private userService: UserService,
        private applyFormService: ApplyFormService,
        private progressBarService: ProgressBarService,
        private invoiceService: InvoicesService
    ) {}

    public onLoginClick(): void {
        this.displayLoadingSpinner = true;
        this.authenticationService.login(this.formGroup.get('email').value, this.formGroup.get('password').value)
            .subscribe((result: RequestResult<User>) => {
                console.log('->' + result);
                if (RequestResult.isError(result)) {
                    this.displayLoadingSpinner = false;
                    this.toastrService.error(result.message);
                } else {
                    this.userService.setLoggedInUser();
                    this.applyFormService.populateFormFieldsForSavedApplication();
                    this.progressBarService.setDisplayProgressBar();
                    this.displayLoadingSpinner = false;
                    this.toastrService.success('You\'ve successfully logged in!');
                    // this.applyFormService.populateFormFieldsForSavedApplication();
                    if (this.userService.getNew()) {
                        this.router.navigate(['/apply']);
                    } else {
                        this.router.navigate(['/apply/invoices']);
                    }
                }
            }, (error) => {
                console.error('An error occurred while trying to log user in.', error);
                this.displayLoadingSpinner = false;
                this.toastrService.error('We are unable to log you in at the moment. Please try again later.');
            });
    }

    public onForgotClick(): void {}

}
