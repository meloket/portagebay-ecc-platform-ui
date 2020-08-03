import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {JwtInterceptor} from './_lib/JwtInterceptor';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {AppComponent} from './app.component';
import {ApplyModule} from './apply/apply.module';
import {ContactModule} from './contact/contact.module';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {LoginModule} from './login/login.module';
import {ProfileModule} from './profile/profile.module';
import {RegisterModule} from './register/register.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@NgModule({

    declarations: [

        AppComponent,
        HeaderComponent,
        FooterComponent

    ],

    imports: [

        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,

        RouterModule.forRoot([]),

        ApplyModule,
        ContactModule,
        LoginModule,
        ProfileModule,
        RegisterModule,

        ToastrModule.forRoot({

            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            progressBar: true,
            enableHtml: true,
            closeButton: true

        }),

        MatProgressBarModule,
    ],

    providers: [
        DatePipe,
        {

            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,

        }

    ],

    bootstrap: [AppComponent]

})
export class AppModule {
}
