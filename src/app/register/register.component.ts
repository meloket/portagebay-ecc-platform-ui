import { Component }                          from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { ToastrService }                      from 'ngx-toastr';
import { RegisterService }                    from './register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent {

    displayLoadingSpinner: boolean;
    public formGroup: FormGroup = new FormGroup({
        studentId: new FormControl('', [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
        ]),
        email: new FormControl('', [
            Validators.required
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        password2: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
    });

    public constructor(private registerService: RegisterService,
                       private toastrService: ToastrService,
                       private router: Router) {}

    public onRegisterClick(): void {
        this.displayLoadingSpinner = true;
        this.registerService.register(this.formGroup.value).subscribe((result: any) => {
            if (result.result === 'ok') {
                this.displayLoadingSpinner = false;
                this.toastrService.success('You have successfuly registered! You may now login..');
                this.router.navigate([ '/login' ]);
                
            } else {
                this.displayLoadingSpinner = false;
                this.toastrService.error(result.message);
            }
            console.log(result);
        }, (error) => {
            this.displayLoadingSpinner = false;
        });
    }

}
