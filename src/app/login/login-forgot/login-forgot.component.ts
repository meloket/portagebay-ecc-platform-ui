import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ForgotService } from './forgot.service';

@Component({
    selector: 'app-login-forgot',
    templateUrl: './login-forgot.component.html',
    styleUrls: ['./login-forgot.component.scss']
})
export class LoginForgotComponent implements OnInit {
    displayLoadingSpinner: boolean;
    passwordResetToken: String;

    public formGroup: FormGroup = new FormGroup({
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        password2: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
    });
    constructor(private loginForgotService: ForgotService,
        private toastService: ToastrService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.passwordResetToken = params.token;
                }
            );
    }

    public onResetClick(): void {
        this.displayLoadingSpinner = true;
        console.log('Please set reset logic');
        const resetData = { token: this.passwordResetToken, password: this.formGroup.get('password').value };

        this.loginForgotService.reset(resetData).subscribe((result: any) => {
            this.toastService.success('You have successfully reset password!');
            this.router.navigate(['/login']);
        }, (error) => {
            this.displayLoadingSpinner = false;
        });
    }

}
