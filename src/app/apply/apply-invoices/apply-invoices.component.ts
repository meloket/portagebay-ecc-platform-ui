import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../../_lib/InvoicesService';
import { Invoice } from '../../_lib/Invoice.model';
import { UserService } from '../../_lib/UserService';
import { PersonalInformation } from '../../_lib/Forms/PersonalInformation.model';
import { ApplyService } from '../apply.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetUSPayUserDetailsModalComponent } from './get-uspay-user-details-modal/get-uspay-user-details-modal.component';
import { USPayUser } from '../../_lib/USPay/USPayUser';
import { CustomerAchPaymentDetails } from '../../_lib/USPay/CustomerAchPaymentDetails';
import { MakeUSPayPaymentModalComponent } from './make-uspay-payment-modal/make-uspay-payment-modal.component';
import { Router } from '@angular/router';
import { ApplyFormService } from '../apply-form.service';
import { Application } from '../../_lib/Forms/Application.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-apply-invoices',
  templateUrl: './apply-invoices.component.html',
  styleUrls: ['./apply-invoices.component.scss']
})
export class ApplyInvoicesComponent implements OnInit {

  unpaidInvoiceList: Invoice[];
  paidInvoiceList: Invoice[];
  invoicesStudentDetail: InvoicesStudentDetail;

  constructor(private invoicesService: InvoicesService,
    private userService: UserService,
    private applyService: ApplyService,
    private applyFormService: ApplyFormService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
      this.invoicesService.setInvoiceList([]);
      this.populateInvoiceLists();
      this.populateStudentDetails();
    this.invoicesService.getInvoiceList(this.userService.loggedInUser.id).subscribe((result: any) => {
        this.invoicesService.setInvoiceList(result.data);
        if (this.userService.loggedInUser.application && typeof this.userService.loggedInUser.application !== 'string') {
            this.invoicesService.setSelectedPaymentMethod(this.userService.loggedInUser.application.payment.method);
        }
        this.populateInvoiceLists();
        this.populateStudentDetails();
    }, (error) => {
        this.invoicesService.setInvoiceList([]);
        this.populateInvoiceLists();
        this.populateStudentDetails();
    });
  }

  ngOnInit() {

  }

  // Payment
  populateInvoiceLists(): void {
    // this.unpaidInvoiceList = (this.invoicesService.invoiceList ? this.invoicesService.invoiceList : []);
    this.unpaidInvoiceList = [];
    this.invoicesService.invoiceList.forEach((_invoice) => {
      if (_invoice.totalPaid && _invoice.totalPaid.length > 0) {
        if (!this.paidInvoiceList) {
          this.paidInvoiceList = [];
        }
        if (this.paidInvoiceList.indexOf(_invoice) === -1) {
          this.paidInvoiceList.push(_invoice);
        }
      } else {
        if (!this.unpaidInvoiceList) {
          this.unpaidInvoiceList = [];
        }
        if (this.unpaidInvoiceList.indexOf(_invoice) === -1) {
          this.unpaidInvoiceList.push(_invoice);
        }
      }
    });
  }
  //

  populateStudentDetails(): void {
    this.invoicesStudentDetail = new InvoicesStudentDetail();
    this.invoicesStudentDetail.studentId = this.userService.loggedInUser.studentId;
    const studentApplication: Application = this.userService.loggedInUser.application;
    let studentPersonalInfo: PersonalInformation;
    if (studentApplication && studentApplication.personalInformation) {
      console.log('this.userService.loggedInUser', this.userService.loggedInUser);
      studentPersonalInfo = studentApplication.personalInformation;
      this.invoicesStudentDetail.firstName = studentPersonalInfo.nameFirst;
      this.invoicesStudentDetail.lastName = studentPersonalInfo.nameLast;
      this.invoicesStudentDetail.dateOfBirth = studentPersonalInfo.dateOfBirth;
      this.invoicesStudentDetail.appliedForYear = studentPersonalInfo.year;
      this.invoicesStudentDetail.appliedForQuarter = studentPersonalInfo.quarter;
    } else {
      console.log('this.applyFormService.personalInformationformGroup', this.applyFormService.personalInformationformGroup);
      this.invoicesStudentDetail.firstName = this.applyFormService.personalInformationformGroup.get('nameFirst').value;
      this.invoicesStudentDetail.lastName = this.applyFormService.personalInformationformGroup.get('nameLast').value;
      this.invoicesStudentDetail.dateOfBirth = this.applyFormService.personalInformationformGroup.get('dateOfBirth').value;
      this.invoicesStudentDetail.appliedForYear = this.applyFormService.personalInformationformGroup.get('year').value;
      this.invoicesStudentDetail.appliedForQuarter = this.applyFormService.personalInformationformGroup.get('quarter').value;
    }
    this.invoicesStudentDetail.selectedPaymentMethod = this.invoicesService.selectedPaymentMethod;
  }

  openUSPayUserDetailsModal(): void {
    const usPayUser: USPayUser = new USPayUser();

    const dialogRef = this.dialog.open(GetUSPayUserDetailsModalComponent, {
      width: '400px',
      data: { usPayUser: usPayUser }
    });

    // dialogRef.beforeClosed().subscribe(result => {
    //   console.log('Create user dialog closed', result);
    //   if (result) {
    //     this.applyService.createUSPayUser(usPayUser).subscribe(() => {
    //       console.log('USPay user has been successfully created');
    //       this.toastrService.success('Your USPay account has been successfully created. You can now proceed with the payment(s).');
    //       this.userService.setPayUserId(usPayUser.userId);
    //     }, (error) => {
    //       console.error('An error occurred while trying to create new USPay user: ', error);
    //       this.toastrService.error('We were unable to create your USPay account. Please make sure all the entered data is correct.');
    //     });
    //   }
    // });
  }

  // Payment
  makeUSPayPayment(invoice: Invoice, quarterBalance: number): void {
    console.log('Make USPay payment', this.invoicesStudentDetail.selectedPaymentMethod);
    if (this.invoicesStudentDetail && this.invoicesStudentDetail.selectedPaymentMethod === 'credit') {
      const customerAchPaymentDetails: CustomerAchPaymentDetails = new CustomerAchPaymentDetails();
      customerAchPaymentDetails.studentId = this.invoicesStudentDetail.studentId;
      customerAchPaymentDetails.selectedPaymentMethod = 'credit';
      customerAchPaymentDetails.paymentAmount = quarterBalance;
      // Payment
      customerAchPaymentDetails.invoiceId = invoice.id;
      customerAchPaymentDetails.fkStudentId = invoice.fkStudentId;
      //

      const dialogRef = this.dialog.open(MakeUSPayPaymentModalComponent, {
        width: '400px',
        data: { customerAchPaymentDetails: customerAchPaymentDetails }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Make payment dialog closed', customerAchPaymentDetails);
        if (result) {
          invoice.justPaid = true;
        } else {
          invoice.justPaid = false;
        }
      });
    }
  }
  //

}

export class InvoicesStudentDetail {
  studentId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  appliedForYear: string;
  appliedForQuarter: string;
  selectedPaymentMethod: string;
}

export class USPayUserDialogData {
  usPayUser: USPayUser;
}

export class CustomerAchPaymentDetailsDialogData {
  customerAchPaymentDetails: CustomerAchPaymentDetails;
}
