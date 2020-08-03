import { Injectable }          from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APIClient }           from './APIClient';
import { RequestResult }       from './RequestResult';
import { User }                from './User';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends APIClient<User> {

    public loggedInUser: User;

    public static getToken(): string {

        return localStorage.getItem('token');

    }

    public static isLoggedIn(): boolean {

        if (localStorage.getItem('token')) {

            return true;

        }

    }

    public isLoggedIn(): boolean {

        if (localStorage.getItem('token')) {

            return true;

        }

    }

    public login(email: string, password: string): Observable<RequestResult<User>> {

        let subject: Subject<RequestResult<User>> = new Subject();
        let self = this;
        this.post('users/login', { email, password }).subscribe((result: RequestResult<User>) => {
            if (!RequestResult.isError(result)) {
                localStorage.setItem('token', result.message);
                // localStorage.setItem('loggedInUserEmail', email);
                localStorage.setItem('user', JSON.stringify(result.data));
            }
            subject.next(result);

        }, (error) => {
            subject.error(error);
            self.toastrService.error('We are unable to log you in at the moment. Please try again later.');
        });

        return subject;

    }

    public logout(): void {

        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUserEmail');
        localStorage.removeItem('user');

    }

}
