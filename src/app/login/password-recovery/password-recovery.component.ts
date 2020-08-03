import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordRecoveryService} from './password-recovery.service';

@Component({
    selector: 'app-password-recovery',
    templateUrl: './password-recovery.component.html',
    styleUrls: ['./password-recovery.component.scss']
})

export class PasswordRecoveryComponent {

    constructor(private passwordRecoveryService: PasswordRecoveryService) {
    }

    showNextStepsMessage = false;

    userEmail = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
    });

    recoverPassword(email: string): void {
        this.passwordRecoveryService.recoverPasswordFor(email);
        this.showNextStepsMessage = true;
    }

}
