import { Component }        from '@angular/core';
import { ApplyFormService } from '../apply-form.service';
import { RoomTypes } from '../../_lib/RoomTypesEnum';
import { FormPagesNames } from '../../_lib/FormPagesNamesEnum';
import { UserService } from '../../_lib/UserService';

@Component({
    selector: 'app-apply-residence',
    templateUrl: './apply-residence.component.html',
    styleUrls: [ './apply-residence.component.scss' ]
})
export class ApplyResidenceComponent {

    private singleBed_4_2: string = RoomTypes.SINGLE_BED_4_2;
    private singleBed_Master_Studio_2: string = RoomTypes.SINGLE_BED_MASTER_STUDIO_2;
    private singleStudioRanier: string = RoomTypes.SINGLE_STUDIO_RANIER;
    private anyRoomType: string = RoomTypes.ANY_TYPE;
    private currentPage: string = FormPagesNames.RESIDENCE_HALL_PAGE;

    paymentUrl = '/apply/payment';
    homestayUrl = '/apply/homestay';

    public constructor(
        public applyFormService: ApplyFormService,
        private userService: UserService) {}
    ngOnInit() {
        if (this.applyFormService.isSubmitted()) {
            this.applyFormService.residenceFormGroup.disable();
        } else {
            this.applyFormService.residenceFormGroup.enable();
        }
    }

    private toggleStanierAndSophieCt() {
        if (this.applyFormService.residenceFormGroup.get('ranierPlaceRank').value == 
                this.applyFormService.residenceFormGroup.get('stanierCtRank').value) {
            this.applyFormService.residenceFormGroup.get('stanierCtRank').setValue('Not set');
        } else if (this.applyFormService.residenceFormGroup.get('ranierPlaceRank').value == 
                this.applyFormService.residenceFormGroup.get('sophieCtRank').value) {
            this.applyFormService.residenceFormGroup.get('sophieCtRank').setValue('Not set');
        }
    }

    private toggleRanierPlaceAndSophieCt() {
        if (this.applyFormService.residenceFormGroup.get('stanierCtRank').value == 
                this.applyFormService.residenceFormGroup.get('ranierPlaceRank').value) {
            this.applyFormService.residenceFormGroup.get('ranierPlaceRank').setValue('Not set');
        } else if (this.applyFormService.residenceFormGroup.get('stanierCtRank').value == 
                this.applyFormService.residenceFormGroup.get('sophieCtRank').value) {
            this.applyFormService.residenceFormGroup.get('sophieCtRank').setValue('Not set');
        }
    }

    private toggleRanierPlaceAndStanierCt() {
        if (this.applyFormService.residenceFormGroup.get('sophieCtRank').value == 
                this.applyFormService.residenceFormGroup.get('ranierPlaceRank').value) {
            this.applyFormService.residenceFormGroup.get('ranierPlaceRank').setValue('Not set');
        } else if (this.applyFormService.residenceFormGroup.get('sophieCtRank').value == 
                this.applyFormService.residenceFormGroup.get('stanierCtRank').value) {
            this.applyFormService.residenceFormGroup.get('stanierCtRank').setValue('Not set');
        }
    }

    private clearSportIfNonAthlete() {
        console.log("clearSportIfNonAthlete");
        console.log("selected value: " + this.applyFormService.residenceFormGroup.get('athleteAtEdCC').value);
        if (this.applyFormService.residenceFormGroup.get('athleteAtEdCC').value == 'no') {
            this.applyFormService.residenceFormGroup.get('athleteAtEdCCSport').setValue('');
        }
    }
}
