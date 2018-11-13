/**
 * Created by WH1709040 on 2018/10/11.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './user.routes';
import {UserComponent} from './user.component';
import {AddUserComponent} from './add-user/add-user.component';
import {SharedModule} from '../../shared/shared.module';
import {UserListComponent} from './user-list/user-list.component';
import {PlayComponent} from '../play/play.component';
import {CoreModule} from '../../core/core.module';
import {PlayProgressComponent} from '../play/play-progress/play-progress.component';

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forChild(ROUTER_CONFIG),
  ],
  exports: [],
  declarations: [UserComponent, AddUserComponent, UserListComponent, PlayProgressComponent, PlayComponent],
  entryComponents: [PlayProgressComponent]
})
export class UserModule {
}
