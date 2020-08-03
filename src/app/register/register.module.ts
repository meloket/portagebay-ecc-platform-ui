import { CommonModule }      from '@angular/common';
import { NgModule }          from '@angular/core';
import { RouterModule }      from '@angular/router';
import { SharedModule }      from '../shared/shared.module';
import { RegisterComponent } from './register.component';

@NgModule({

    declarations: [

        RegisterComponent

    ],

    imports: [

        CommonModule,
        RouterModule.forChild([

            {

                path: 'register',
                component: RegisterComponent

            }

        ]),
        SharedModule,

    ]

})
export class RegisterModule {
}
