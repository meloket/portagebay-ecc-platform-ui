import { PaymentPayNowOther } from "./PaymentPayNowOther.model";

export class Payment {
    public madeBy: string;
    public madeByOther: string;
    public financialAid: string;
    public email: string;
    public method: string;
    public creditCardType: string;
    public creditCardNumber: string;
    public nameOnCreditCard: string;
    public creditCardExpDate: string;
    public cvv: number;
    public wireAmount: string;
    public wireDate: Date;
    // public payForNowTypes: string[];
    public paymentPayNowOther: PaymentPayNowOther;
    public housingChoiceHomestayRanking: number;
    public housingChoiceResidenceHallRanking: number;
    public printedName: string;
    public date: Date;
 }
