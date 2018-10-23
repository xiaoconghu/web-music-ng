/**
 * Created by WH1709040 on 2018/10/10.
 */
import {Routes} from '@angular/router';
import {IndexComponent} from './index.component';
import {LoginComponent} from '../login/login.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
