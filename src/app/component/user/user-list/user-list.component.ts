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
        {title: '用户昵称', key: 'userName'},
        {title: '用户代码', key: 'userCode'},
        {title: '手机号', key: 'phoneNumber'},
        {title: '用户邮箱', key: 'email'},
        {title: '创建时间', key: 'createTime'},
        {title: '操作', key: ''},
      ],
      showPagination: true,
      bordered: false,
      operation: [
        {
          text: '删除',
          handle: (currentIndex) => {
            console.log(currentIndex);
            this.deleteUserById(currentIndex.id);
          }
        },
        {
          text: '修改',
          handle: (currentIndex) => {
            console.log(currentIndex);
            this.$router.navigate(['/user/user-detail/update'], {queryParams: {id: currentIndex.id}}).then(e => {
            });
          }
        }
      ],
      topButtons: [
        {
          text: '新增用户',
          handle: (currentIndex) => {
            this.addUser();
          }
        },
        {
          text: '批量删除',
          handle: (currentIndex) => {
            const ids = currentIndex.map(item => item.id);
            console.log(ids);
            this.batchDelete(ids);
          }
        },
      ]
    };
    this.getUserList();
  }

  addUser() {
    this.$router.navigate(['/user/user-detail/add']).then(e => {
    });
  }

  getUserList() {
    this.userService.getAllUser().then((result: any) => {
      console.log(result);
      this.dataSet = result.data;
    });
  }

  deleteUserById(id) {
    this.userService.deleteUserById(id).then((result) => {
      this.getUserList();
    });
  }

  batchDelete(ids) {
    this.userService.deleteUserByBatch(ids).then(result => {
      this.getUserList();
    });
  }

  pageChange(event) {

  }
}
