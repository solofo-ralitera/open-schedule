import { Component, OnInit } from '@angular/core';
import {TitleService} from "../Services/title.service";

@Component({
  moduleId: module.id,
  selector: 'app-401',
  template: `
    <section style="font-size: 10em;text-align: center;color: red;">
      <i class="glyphicon glyphicon-warning-sign"></i>
    </section>
  `
})
export class PageForbiddenComponent implements OnInit {

  constructor(
    private titleSrv: TitleService
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('401 - Forbidden');
  }

}
