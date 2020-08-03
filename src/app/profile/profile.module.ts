import { CommonModule }                 from '@angular/common';
import { NgModule }                     from '@angular/core';
import { RouterModule }                 from '@angular/router';
import { SharedModule }                 from '../shared/shared.module';
import { ProfileApplicationsComponent } from './profile-applications/profile-applications.component';
import { ProfileSettingsComponent }     from './profile-settings/profile-settings.component';
import { ProfileComponent }             from './profile.component';

@NgModule({

    declarations: [

        ProfileComponent,
        ProfileApplicationsComponent,
        ProfileSettingsComponent

    ],

    imports: [

        CommonModule,

        RouterModule.forChild([

            {

                path: 'profile',
                component: ProfileComponent,

                children: [

                    {

                        path: 'applications',
                        component: ProfileApplicationsComponent

                    }, {

                        path: 'settings',
                        component: ProfileSettingsComponent

                    }, {

                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'applications',

                    }

                ]

            }

        ]),

        SharedModule

    ]

})
export class ProfileModule {
}
