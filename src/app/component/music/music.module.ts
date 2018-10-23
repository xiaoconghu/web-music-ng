import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MusicComponent} from './music.component';
import {MusicListComponent} from './music-list/music-list.component';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './music.route';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import { MusicDetailComponent } from './music-detail/music-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [MusicComponent, MusicListComponent, MusicDetailComponent]
})
export class MusicModule { }
