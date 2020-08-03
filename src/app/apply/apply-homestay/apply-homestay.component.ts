import { Component }        from '@angular/core';
import { ApplyFormService } from '../apply-form.service';
import { FormPagesNames } from '../../_lib/FormPagesNamesEnum';
import { UserService } from '../../_lib/UserService';

@Component({
    selector: 'app-apply-homestay',
    templateUrl: './apply-homestay.component.html',
    styleUrls: [ './apply-homestay.component.scss' ]
})
export class ApplyHomestayComponent {

    private currentPage: string = FormPagesNames.HOMESTAY_PAGE;

    public constructor(
        public applyFormService: ApplyFormService,
        private userService: UserService) {}
    
    ngOnInit() {
        if (this.applyFormService.isSubmitted()) {
            this.applyFormService.homestayformGroup.disable();
        } else {
            this.applyFormService.homestayformGroup.enable();
        }
    }

}
