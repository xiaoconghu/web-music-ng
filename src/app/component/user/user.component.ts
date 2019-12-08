/**
 * Created by WH1709040 on 2018/10/11.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {global} from '@angular/core/src/util';
import {UserService} from '../../core/api-service/user.service';
import {Result} from '../../core/entity/result';

@Component({
    selector: 'app-user',
    templateUrl: `./user.component.html`,
    styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
    constructor(private $router: Router,
                private $userService: UserService) {
    }

    ngOnInit(): void {
    }

    public navigate(target) {
        this.$router.navigate([target]).catch();
    }

    public logout() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const body = {userCode: userInfo.userCode};
        this.$userService.logout(body).then((result: Result) => {
            // 退出成功跳转到登录页面
            if (result.code === 0) {
                this.$router.navigate(['/index/login']).then();
            }
        }).catch();
    }

}
