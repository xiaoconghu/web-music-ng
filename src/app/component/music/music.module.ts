import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MusicComponent} from './music.component';
import {MusicListComponent} from './music-list/music-list.component';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './music.route';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import { MusicDetailComponent } from './music-detail/music-detail.component';
import { SingerListComponent } from './singer-list/singer-list.component';
import { CdListComponent } from './cd-list/cd-list.component';
import { SingerDetailComponent } from './singer-detail/singer-detail.component';
import { CdDetailComponent } from './cd-detail/cd-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [MusicComponent, MusicListComponent, MusicDetailComponent, SingerListComponent, CdListComponent, SingerDetailComponent, CdDetailComponent]
})
export class MusicModule { }
