import { Component, OnInit } from '@angular/core';
import { ApplyFormService } from '../apply-form.service';
import { ToastrService } from 'ngx-toastr';
import { InvoicesService } from '../../_lib/InvoicesService';
import { Router } from '@angular/router';
import {Invoice} from '../../_lib/Invoice.model';

@Component({
  selector: 'app-apply-submit',
  templateUrl: './apply-submit.component.html',
  styleUrls: ['./apply-submit.component.scss']
})
export class ApplySubmitComponent implements OnInit {

  displayLoadingSpinner: boolean;
  isDisabled = false;

  constructor(private applyFormService: ApplyFormService,
    private toastrService: ToastrService,
    private invoicesService: InvoicesService,
    private router: Router) { }

  ngOnInit() {
    console.log('here is submit');
    this.isDisabled = this.applyFormService.isSubmitted();
  }

  public onSubmitClick(): void {
    if (this.isDisabled) { return; }
    console.log('Submit clicked');
    this.displayLoadingSpinner = true;
    this.isDisabled = true;
    this.applyFormService.submit().subscribe((result: any) => {
      console.log('Application submitted');
      this.toastrService.success('Your data has been successfully saved.');
      console.log('Response:');
      console.log(result);
      this.invoicesService.setInvoiceList(result.data);
      this.invoicesService.setSelectedPaymentMethod(this.applyFormService.paymentformGroup.get('method').value);
      this.displayLoadingSpinner = false;
      this.applyFormService.setSubmittedUser();
      this.isDisabled = true;
      this.router.navigateByUrl('/apply/invoices');
    }, (error) => {
      console.log('An error occurred while trying to submit the application', error);
      this.invoicesService.setInvoiceList([new Invoice()]);
      this.displayLoadingSpinner = false;
      this.isDisabled = false;
      this.toastrService.error('Your data was not saved properly. Please try again later.');
    });
  }

}
