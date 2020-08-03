import {Injectable} from '@angular/core';
import {APIClient} from '../../_lib/APIClient';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResetService extends APIClient<any> {

    public reset(email, oldPassword, password ): Observable<any> {

        return this.post('users/reset/password', {email, oldPassword, password});

    }

}
