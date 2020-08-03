import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { USPayUserDialogData } from '../apply-invoices.component';
import { UserContactInformation } from '../../../_lib/USPay/UserContactInformation';
import { Address } from '../../../_lib/USPay/Address';
import { SharedSecretType } from '../../../_lib/USPay/SharedSecretType';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplyService} from '../../apply.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../_lib/UserService';
import {USPayUser} from '../../../_lib/USPay/USPayUser';

@Component({
  selector: 'app-get-uspay-user-details-modal',
  templateUrl: './get-uspay-user-details-modal.component.html',
  styleUrls: ['./get-uspay-user-details-modal.component.scss']
})
export class GetUSPayUserDetailsModalComponent implements OnInit {

  sharedSecretTypeArray: string[];
  formGroupData: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GetUSPayUserDetailsModalComponent>,
    private applyService: ApplyService,
    private toastrService: ToastrService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: USPayUserDialogData
  ) {
      data.usPayUser.contactInformation = new UserContactInformation();
      data.usPayUser.contactInformation.address = new Address();
      this.formGroupData = new FormGroup({
          userId: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required]),
          firstName: new FormControl('', [Validators.required]),
          lastName: new FormControl('', [Validators.required]),
          phoneNumber: new FormControl('', [Validators.required]),
          emailAddress: new FormControl('', [Validators.required]),
          streetAddress1: new FormControl('', [Validators.required]),
          streetAddress2: new FormControl(''),
          city: new FormControl('', [Validators.required]),
          state: new FormControl('', [Validators.required]),
          zipPostalCode: new FormControl('', [Validators.required]),
          country: new FormControl('', [Validators.required]),
          sharedSecretType: new FormControl('', [Validators.required]),
          sharedSecretAnswer: new FormControl('', [Validators.required, Validators.minLength(4)]),
      });
  }

  ngOnInit() {
    this.sharedSecretTypeArray = SharedSecretType.values();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitData(): void {
      const usPayUser: USPayUser = new USPayUser();
      usPayUser.contactInformation = new UserContactInformation();
      usPayUser.contactInformation.address = new Address();
      usPayUser.userId = this.formGroupData.get('userId').value;
      usPayUser.password = this.formGroupData.get('password').value;
      usPayUser.sharedSecretType = this.formGroupData.get('sharedSecretType').value;
      usPayUser.sharedSecretAnswer = this.formGroupData.get('sharedSecretAnswer').value;
      usPayUser.contactInformation.firstName = this.formGroupData.get('firstName').value;
      usPayUser.contactInformation.lastName = this.formGroupData.get('lastName').value;
      usPayUser.contactInformation.phoneNumber = this.formGroupData.get('phoneNumber').value;
      usPayUser.contactInformation.emailAddress = this.formGroupData.get('emailAddress').value;
      usPayUser.contactInformation.address.streetAddress1 = this.formGroupData.get('streetAddress1').value;
      usPayUser.contactInformation.address.streetAddress2 = this.formGroupData.get('streetAddress2').value;
      usPayUser.contactInformation.address.city = this.formGroupData.get('city').value;
      usPayUser.contactInformation.address.state = this.formGroupData.get('state').value;
      usPayUser.contactInformation.address.zipPostalCode = this.formGroupData.get('zipPostalCode').value;
      usPayUser.contactInformation.address.country = this.formGroupData.get('country').value;
      this.applyService.createUSPayUser(usPayUser).subscribe(() => {
          console.log('USPay user has been successfully created');
          this.toastrService.success('Your USPay account has been successfully created. You can now proceed with the payment(s).');
          this.userService.setPayUserId(usPayUser.userId);
          this.dialogRef.close();
      }, (error) => {
          console.error('An error occurred while trying to create new USPay user: ', error);
          this.toastrService.error('We were unable to create your USPay account. Please make sure all the entered data is correct.');
      });
  }

}
