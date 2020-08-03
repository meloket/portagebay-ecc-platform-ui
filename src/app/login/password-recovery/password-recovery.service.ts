import {Injectable} from '@angular/core';
import {APIClient} from '../../_lib/APIClient';
import {User} from '../../_lib/User';

@Injectable({
    providedIn: 'root'
})
export class PasswordRecoveryService extends APIClient<User> {

    public recoverPasswordFor(email: string): void {
        this.post('users/reset/new', {email: email}).subscribe((result: any) => {
            console.log(result);
        });
    }
}
