import { Injectable } from '@angular/core';
import { APIClient }  from '../_lib/APIClient';
import { Observable } from 'rxjs';
import { USPayUser } from '../_lib/USPay/USPayUser';
import { CustomerAchPaymentDetails } from '../_lib/USPay/CustomerAchPaymentDetails';

@Injectable({
    providedIn: 'root'
})
export class ApplyService extends APIClient<any> {
    
    public submitAdditionalInfo(user: any): Observable<any> {
        console.log("Populated user");
        console.log(user);
        return this.post('applications/submit', user);
    }

    public patchAdditionalInfo(user: any): Observable<any> {
        console.log("Populated user");
        console.log(user);
        return this.post('applications/patch', user);
    }

    public createUSPayUser(usPayUser: USPayUser): Observable<any> {
        return this.post('applications/create-uspay-user', usPayUser);
    }

    public makePayment(customerAchPaymentDetails: CustomerAchPaymentDetails) {
        return this.post('applications/make-payment', customerAchPaymentDetails);
    }

    public getImage() {
        return this.get('applications/getProfileImage');
    }

    public upload(uploadImageData) {
        return this.post('applications/uploadProfileImage', uploadImageData);
    }

}
