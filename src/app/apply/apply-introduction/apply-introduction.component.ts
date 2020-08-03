import { Component, OnInit } from '@angular/core';
import { ApplyFormService } from '../apply-form.service';

@Component({
  selector: 'app-apply-introduction',
  templateUrl: './apply-introduction.component.html',
  styleUrls: ['./apply-introduction.component.scss']
})
export class ApplyIntroductionComponent implements OnInit {

  constructor(private applyFormService: ApplyFormService,) { }

  ngOnInit() {
  }

}
