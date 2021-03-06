/**
 * Created by wh1709040 on 2018/9/15.
 */
import {Routes} from '@angular/router';
import {IndexComponent} from './component/index/index.component';
import {LoginComponent} from './component/login/login.component';

export const ROUTER_CONFIG: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/index/login'},
  {path: 'index', loadChildren: './component/index/index.module#IndexModule'},
  {path: 'user', loadChildren: './component/user/user.module#UserModule'},
];
