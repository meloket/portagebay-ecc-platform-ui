export class Invoice {
    id: string;
    feesTotal: number;
    quarterBalance: number;
    totalPaid: string;
    createdDate: number;
    justPaid: boolean;
    // Payment
    fkStudentId: string;
    //
}
