import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {LoginForgotComponent} from './login-forgot/login-forgot.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {LoginComponent} from './login.component';
import {LogoutComponent} from './logout/logout.component';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';
import {PasswordRecoveryService} from './password-recovery/password-recovery.service';

@NgModule({

    declarations: [

        LoginComponent,

        LogoutComponent,

        LoginFormComponent,

        LoginForgotComponent,

        ResetPasswordComponent,

        PasswordRecoveryComponent,

    ],

    imports: [

        CommonModule,
        RouterModule.forChild([

            {

                path: 'login',
                component: LoginComponent,

                children: [

                    {

                        path: '',
                        pathMatch: 'full',
                        component: LoginFormComponent

                    },
                    {

                        path: 'forgot/:token',
                        component: LoginForgotComponent

                    },
                    {

                        path: 'password-recovery',
                        component: PasswordRecoveryComponent

                    }

                ]

            }, {

                path: 'logout',
                component: LogoutComponent

            }, {
                path: 'reset-password',
                component: ResetPasswordComponent
            }, {

                path: '',
                pathMatch: 'full',
                redirectTo: 'login'

            }

        ]),
        SharedModule,

    ],
    providers: [
        PasswordRecoveryService
    ]

})
export class LoginModule {
}
