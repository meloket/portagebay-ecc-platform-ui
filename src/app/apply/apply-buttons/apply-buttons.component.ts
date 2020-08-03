import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgressBarService } from '../../_lib/ProgressBarService';
import { ApplyFormService } from '../apply-form.service';

@Component({
    selector: 'app-apply-buttons',
    templateUrl: './apply-buttons.component.html',
    styleUrls: ['./apply-buttons.component.scss']
})
export class ApplyButtonsComponent {

    @Input() public backLink: string;
    @Input() public forwardLink: string;
    @Input() public forwardLabel = 'Next Section';
    @Input() public forwardEnabled: boolean;
    @Input() public currentPage: string;

    @Output() public forwardClick: EventEmitter<any> = new EventEmitter();

    constructor(private progressBarService: ProgressBarService,
        private applyFormService: ApplyFormService) { }

    public onForwardClick(): void {
        if (this.forwardLabel != 'Submit') {
            this.applyFormService.patch().subscribe((result: any) => {
                console.log('Application patched');
                console.log('Response:');
                console.log(result);
            }, (error) => {
                console.log('An error occurred while trying to patch the application', error);
            });
        }

        this.forwardClick.emit();
        this.progressBarService.incrementProgress(this.currentPage);
        console.log('onForwardClick');
        console.log(this.progressBarService.progressInfo);
    }

}
