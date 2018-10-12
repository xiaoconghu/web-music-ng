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

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG),
  ],
  exports: [],
  declarations: [UserComponent, AddUserComponent, UserListComponent],
  entryComponents: []
})
export class UserModule {
}
