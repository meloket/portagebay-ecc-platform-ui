import { Component, OnInit } from '@angular/core';
import { UserService } from '../_lib/UserService';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  constructor(private userService: UserService) {

  }

  ngOnInit() {
      console.log('new user is right?', this.userService.newUser);
  }

}
