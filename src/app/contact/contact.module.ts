import { CommonModule }     from '@angular/common';
import { NgModule }         from '@angular/core';
import { RouterModule }     from '@angular/router';
import { SharedModule }     from '../shared/shared.module';
import { ContactComponent } from './contact.component';

@NgModule({

    declarations: [

        ContactComponent

    ],

    imports: [

        CommonModule,
        RouterModule.forChild([

            {

                path: 'contact',
                component: ContactComponent

            }

        ]),
        SharedModule,

    ]

})
export class ContactModule {
}
