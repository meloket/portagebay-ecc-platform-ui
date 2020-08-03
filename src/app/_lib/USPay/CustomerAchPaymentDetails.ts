import { CreditCardType } from "./CreditCardType";

export class CustomerAchPaymentDetails {
    public userId: string;
    public studentId: number;
    // Credit
    public creditCardType: CreditCardType;
    public creditCardNumber: string;
    public creditCardExpYear: string;
    public creditCardExpMonth: string;
    public nameOnCreditCard: string;
    public cvv: number;
    // ACH
    // public bankRTN: string;
    // public accountNumber: string;
    // public accountType: string;
    // public accountCategory: string;
    public selectedPaymentMethod: string;
    public paymentAmount: number;

    // Payment
    invoiceId: string;
    fkStudentId: string;
    //
}

export enum BankAccountType {
    CHECKING,
    SAVINGS
}

export namespace BankAccountType {
    export function values() {
        return Object.keys(BankAccountType).filter(
            (type) => isNaN(<any>type) && type !== 'values'
        );
    }
}

export enum BankAccountCategoryType {
    BUSINESS,
    CONSUMER
}

export namespace BankAccountCategoryType {
    export function values() {
        return Object.keys(BankAccountCategoryType).filter(
            (type) => isNaN(<any>type) && type !== 'values'
        );
    }
}
