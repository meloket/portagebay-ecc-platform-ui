import { Component }                          from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User }                               from '../../_lib/User';
import { ProfileService }                     from '../profile.service';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: [ './profile-settings.component.scss' ]
})
export class ProfileSettingsComponent {

    public user: User;

    public changePasswordFormGroup: FormGroup = new FormGroup({

        password: new FormControl('', [

            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(255)

        ]),

        password2: new FormControl('', [

            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(255)

        ])

    });

    public constructor(private profileService: ProfileService) {

        profileService.getMyProfile().subscribe((user: User) => {

            console.log(user);

            this.user = user;

        });

    }

}
