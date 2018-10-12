import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/entity/user';
import {TableConfig} from '../../../core/entity/tableConfig';
import {Router} from '@angular/router';
import {UserService} from '../../../core/api-service/user.service';
import {PageBean} from '../../../core/entity/pageBean';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  dataSet: User[] = [];
  tableConfig: TableConfig;
  pageBean: PageBean = new PageBean(10, 1, 1);
  constructor(private $router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.tableConfig = {
      columnConfig: [
        {title: '用户昵称', key: 'userName', width: '200px'},
        {title: '用户代码', key: 'userCode', width: '200px'},
        {title: '手机号', key: 'phoneNumber', width: '200px'},
        {title: '用户邮箱', key: 'email', width: '200px'},
        {title: '创建时间', key: 'createTime', width: '200px'},
      ],
      showPagination: true,
      bordered: false
    };
    this.getUserList();
  }

  addUser() {
    this.$router.navigate(['/user/add-user']).then(e => {
    });
  }

  getUserList() {
    this.userService.getAllUser().then((result: any) => {
      console.log(result);
      this.dataSet = result.data;
    });
  }

}
