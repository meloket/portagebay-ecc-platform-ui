import { Injectable } from '@angular/core';
import { Invoice } from './Invoice.model';
import {APIClient} from './APIClient';
import {User} from './User';

@Injectable({
    providedIn: 'root'
})
export class InvoicesService extends APIClient<User> {

    invoiceList: Invoice[];
    selectedPaymentMethod: string;

    setInvoiceList(_invoiceList: Invoice[]) {
        this.invoiceList = _invoiceList;
    }

    setSelectedPaymentMethod(_selectedPaymentMethod: string) {
        this.selectedPaymentMethod = _selectedPaymentMethod;
    }

    getInvoiceList(id) {
        console.log('Invoice test');
        return this.get('users/invoices/' + id.toString());
    }
}
