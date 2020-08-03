import { Component }             from '@angular/core';
import { AuthenticationService } from '../_lib/AuthenticationService';
import { ProgressBarService, ProgressInfo } from '../_lib/ProgressBarService';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent {
    
    private progressInfo: ProgressInfo;

    public constructor(
        public authenticationService: AuthenticationService,
        private progressBarService: ProgressBarService) {
            this.progressInfo = progressBarService.progressInfo;
        }

}
