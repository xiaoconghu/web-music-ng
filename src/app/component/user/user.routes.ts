/**
 * Created by WH1709040 on 2018/10/11.
 */
import {Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {AddUserComponent} from './add-user/add-user.component';
import {UserListComponent} from './user-list/user-list.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {path: 'user-detail/:type', component: AddUserComponent},
      {path: 'user-list', component: UserListComponent},
    ]
  },

];
