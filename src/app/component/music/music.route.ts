/**
 * Created by wh1709040 on 2018/10/23.
 */
import {Routes} from '@angular/router';
import {MusicComponent} from './music.component';
import {MusicListComponent} from './music-list/music-list.component';
import {MusicDetailComponent} from './music-detail/music-detail.component';
import {CdListComponent} from './cd-list/cd-list.component';
import {SingerListComponent} from './singer-list/singer-list.component';
import {SingerDetailComponent} from './singer-detail/singer-detail.component';

export const ROUTER_CONFIG: Routes = [
  {path: '', component: MusicComponent},
  {path: 'cd-list', component: CdListComponent},
  {path: 'singer-list', component: SingerListComponent},
  {path: 'singer-detail/:type', component: SingerDetailComponent},
  {path: 'music-list', component: MusicListComponent},
  {path: 'music-detail/:type', component: MusicDetailComponent},
];
