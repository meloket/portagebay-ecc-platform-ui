import {Injectable} from '@angular/core';
import {APIClient} from '../../_lib/APIClient';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ForgotService extends APIClient<any> {

    public reset(resetData: any): Observable<any> {

        return this.post('users/reset/submit', resetData);

    }

}
