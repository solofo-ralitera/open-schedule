import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../Services/title.service";
import {I18nService} from "../../Services/i18n.service";

@Component({
  moduleId: module.id,
  selector: 'app-404',
  template: `
    <section style="font-size: 10em;text-align: center;color: gold;">
      <i class="glyphicon glyphicon-warning-sign"></i>      
    </section>
  `
})

export class PageNotFoundComponent implements OnInit {
  constructor(
    private titleSrv: TitleService,
    private i18n: I18nService
  ) { }

  ngOnInit() {
    this.titleSrv.set('404 - ' + this.i18n.trans('Page not found'));

  }
}
