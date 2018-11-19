import {Component, OnInit} from '@angular/core';
// import {NzI18nService, zh_TW} from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WLS';

  constructor() {
  }

  ngOnInit(): void {
    // this.i18n.setLocale(zh_TW);
  }
}
