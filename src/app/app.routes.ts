/**
 * Created by wh1709040 on 2018/9/15.
 */
import {Routes} from '@angular/router';
import {IndexComponent} from './component/index/index.component';
import {GISMapComponent} from './component/gis-map/gis-map.component';

export const ROUTER_CONFIG: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/index'},
  {path: 'index', component: IndexComponent},
  {path: 'gis-map', component: GISMapComponent},
];
