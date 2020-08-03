import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIClient }  from '../_lib/APIClient';

@Injectable({
    providedIn: 'root'
})
export class RegisterService extends APIClient<any> {

    public register(user: any): Observable<any> {

        return this.post('users/register', user);

    }

}
