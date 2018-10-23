/**
 * Created by wh1709040 on 2018/10/23.
 */
import {Routes} from '@angular/router';
import {MusicComponent} from './music.component';
import {MusicListComponent} from './music-list/music-list.component';
import {MusicDetailComponent} from './music-detail/music-detail.component';

export const ROUTER_CONFIG: Routes = [
  {path: '', component: MusicComponent},
  {path: 'music-list', component: MusicListComponent},
  {path: 'music-detail/:type', component: MusicDetailComponent},
];
