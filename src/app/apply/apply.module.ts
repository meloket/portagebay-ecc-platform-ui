import { CommonModule }                      from '@angular/common';
import { NgModule }                          from '@angular/core';
import { RouterModule }                      from '@angular/router';
import { AuthGuard }                         from '../_lib/AuthGuard';
import { SharedModule }                      from '../shared/shared.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ApplyAccomodationsComponent }       from './apply-accomodations/apply-accomodations.component';
import { ApplyAgentInformationComponent }    from './apply-agent-information/apply-agent-information.component';
import { ApplyArrivalComponent }             from './apply-arrival/apply-arrival.component';
import { ApplyButtonsComponent }             from './apply-buttons/apply-buttons.component';
import { ApplyHomestayComponent }            from './apply-homestay/apply-homestay.component';
import { ApplyIntroductionComponent }        from './apply-introduction/apply-introduction.component';
import { ApplyPaymentComponent }             from './apply-payment/apply-payment.component';
import { ApplyPersonalInformationComponent } from './apply-personal-information/apply-personal-information.component';
import { ApplyResidenceComponent }           from './apply-residence/apply-residence.component';
import { ApplySubmitComponent }              from './apply-submit/apply-submit.component';
import { ApplyComponent }                    from './apply.component';
import { ApplyInvoicesComponent } from './apply-invoices/apply-invoices.component';
import { GetUSPayUserDetailsModalComponent } from './apply-invoices/get-uspay-user-details-modal/get-uspay-user-details-modal.component';
import { MakeUSPayPaymentModalComponent } from './apply-invoices/make-uspay-payment-modal/make-uspay-payment-modal.component';

@NgModule({

    declarations: [

        ApplyComponent,

        ApplyIntroductionComponent,

        ApplyPersonalInformationComponent,

        ApplyAgentInformationComponent,

        ApplyAccomodationsComponent,

        ApplyArrivalComponent,

        ApplyPaymentComponent,

        ApplyHomestayComponent,

        ApplyResidenceComponent,

        ApplySubmitComponent,

        ApplyButtonsComponent,

        ApplyInvoicesComponent,

        GetUSPayUserDetailsModalComponent,

        MakeUSPayPaymentModalComponent

    ],

    imports: [

        CommonModule,
        MaterialFileInputModule,
        RouterModule.forChild([

            {

                path: 'apply',
                component: ApplyComponent,

                children: [

                    {

                        path: 'introduction',
                        component: ApplyIntroductionComponent,
                        canActivate: [ AuthGuard ]

                    }, {

                        path: 'personal-information',
                        component: ApplyPersonalInformationComponent,
                        canActivate: [ AuthGuard ]

                    }, {

                        path: 'agent-information',
                        component: ApplyAgentInformationComponent,
                        canActivate: [ AuthGuard ]

                    }, {

                        path: 'accomodations',
                        component: ApplyAccomodationsComponent,
                        canActivate: [ AuthGuard ]

                    }, {

                        path: 'arrival',
                        component: ApplyArrivalComponent,
                        canActivate: [ AuthGuard ]

                    }, {

                        path: 'payment',
                        component: ApplyPaymentComponent,
                        canActivate: [ AuthGuard ]

                    }, {

                        path: 'homestay',
                        component: ApplyHomestayComponent,
                        canActivate: [ AuthGuard ]

                    }, {

                        path: 'residence',
                        component: ApplyResidenceComponent,
                        canActivate: [ AuthGuard ]

                    }, {

                        path: 'submit',
                        component: ApplySubmitComponent,
                        canActivate: [ AuthGuard ]

                    }, {

                        path: 'invoices',
                        component: ApplyInvoicesComponent,
                        canActivate: [ AuthGuard ]

                    }, {

                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'introduction'

                    }

                ]

            }

        ]),

        SharedModule

    ],

    entryComponents : [
        GetUSPayUserDetailsModalComponent,
        MakeUSPayPaymentModalComponent
    ]

})
export class ApplyModule {
}
