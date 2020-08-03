import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ResetService} from './reset.service';
import {UserService} from '../../_lib/UserService';

@Component({
  selector: 'app-login-forgot',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    displayLoadingSpinner: boolean;
    public formGroup: FormGroup = new FormGroup({
        oldPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        password2: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        email: new FormControl('', [
            Validators.required,
        ]),
    });
  constructor(private resetService: ResetService,
              private toastService: ToastrService,
              private router: Router,
  ) { }

  ngOnInit() {
  }

    public onResetClick(): void {
        if (this.formGroup.get('password').value !== this.formGroup.get('password2').value) {
            this.displayLoadingSpinner = false;
            this.toastService.error('New password not matched');
            return;
        }
        this.displayLoadingSpinner = true;
        console.log('Please set reset logic');
        this.resetService.reset(
            this.formGroup.get('email').value, this.formGroup.get('oldPassword').value, this.formGroup.get('password').value
        ).subscribe((result: any) => {
            this.displayLoadingSpinner = false;
            this.toastService.success('You have successfully reset password!');
            this.router.navigate([ '/login' ]);
        }, (error) => {
            this.displayLoadingSpinner = false;
            this.toastService.error('Try again.');
        });
    }

}
