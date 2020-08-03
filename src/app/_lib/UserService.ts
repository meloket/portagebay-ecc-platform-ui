import { Injectable } from "@angular/core";
import { User } from "./User";
import { CommonHelper } from "./CommonHelper";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public loggedInUser: User;
    public newUser: boolean = true;
    public domestic: boolean = false;
    public isSubmitted: boolean = false;

    constructor() {
        this.setLoggedInUser();
    }

    public getNew() {
        const application: any = JSON.parse(localStorage.getItem('user')).application;

        if(!application) return true;
        return !(typeof application === "string" && application === "exists") && !application.stampSubmitted && !this.isSubmitted;
    }

    public setSubmitted() {
        this.newUser = false;
        let tUser = JSON.parse(localStorage.getItem('user'));
        if (!tUser.application) {
            tUser.application = "exists";
        }
        localStorage.setItem('user', JSON.stringify(tUser));
    }

    public setPayUserId(puId: String) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.payUserId = puId;
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getPayUserId() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user.payUserId || '';
    }
    public setLoggedInUser() {
        this.newUser = true;
        this.loggedInUser = this.getLoggedInUser();
        console.log(this.loggedInUser);
        if (this.isUserLoggedIn()) {
            if (!CommonHelper.newApplication(this.loggedInUser)) {
                this.newUser = false;
            }
        }
        if (this.loggedInUser && this.loggedInUser.application && this.loggedInUser.application.personalInformation && this.loggedInUser.application.personalInformation.studentType === 'domestic') {
            this.domestic = true;
        }
    }

    private getLoggedInUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    public isUserLoggedIn(): boolean {
        if (this.getLoggedInUser()) {
            return true;
        } else {
            return false;
        }
    }
}
