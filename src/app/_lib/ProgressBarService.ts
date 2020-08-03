import { Injectable } from "@angular/core";
import { UserService } from "./UserService";

@Injectable({
    providedIn: 'root'
})
export class ProgressBarService {

    constructor(private userService: UserService) {
        this.setDisplayProgressBar();
    }
    
    private progressedForms: string[] = [];
    public canDisplay: boolean
    public progressInfo: ProgressInfo = { progressStatus: 2 };

    public incrementProgress(progressOf: string) {
        if (this.progressedForms.indexOf(progressOf) == -1) {
            this.progressInfo.progressStatus += 14;
            this.progressedForms.push(progressOf);
            console.log("Incrementing progress to: " + this.progressInfo.progressStatus);
        }
    }

    public setDisplayProgressBar() {
        console.log("setDisplayProgressBar start");
        this.canDisplay = this.userService.isUserLoggedIn();
        console.log(this.canDisplay);
        console.log("setDisplayProgressBar end");
    }
}

export interface ProgressInfo {
    progressStatus: number
}
