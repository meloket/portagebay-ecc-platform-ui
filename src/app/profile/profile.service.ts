import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIClient }  from '../_lib/APIClient';
import { User }       from '../_lib/User';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends APIClient<User> {

    public getMyProfile(): Observable<User> {

        return this.get('users/my');

    }

}
