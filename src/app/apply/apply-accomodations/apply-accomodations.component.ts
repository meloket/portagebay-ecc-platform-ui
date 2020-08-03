import { Component }        from '@angular/core';
import { ApplyFormService } from '../apply-form.service';
import { FormPagesNames } from '../../_lib/FormPagesNamesEnum';
import { UserService } from '../../_lib/UserService';

@Component({
    selector: 'app-apply-accomodations',
    templateUrl: './apply-accomodations.component.html',
    styleUrls: [ './apply-accomodations.component.scss' ]
})
export class ApplyAccomodationsComponent {

    private currentPage: string = FormPagesNames.ACCOMODATIONS_PAGE;
    agentLink = '/apply/agent-information';
    personalLink = '/apply/personal-information';
    public constructor(
        public applyFormService: ApplyFormService,
        private userService: UserService) {}
    ngOnInit() {
        if (this.applyFormService.isSubmitted()) {
            this.applyFormService.accomodationsformGroup.disable();
        } else {
            this.applyFormService.accomodationsformGroup.enable();
        }
    }
}
