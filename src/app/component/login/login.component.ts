/**
 * Created by WH1709040 on 2018/10/11.
 */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/api-service/user.service';
import {Router} from '@angular/router';
import {Result} from '../../core/entity/result';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
    validateForm: FormGroup;

    constructor(private fb: FormBuilder,
                private userService: UserService,
                private message: NzMessageService,
                private router: Router) {
    }

    submitForm(): void {
        if (this.validateForm.controls) {
            for (const key of Object.keys(this.validateForm.controls)) {
                this.validateForm.controls[key].markAsDirty();
                this.validateForm.controls[key].updateValueAndValidity();
            }
        }
        if (this.validateForm.valid) {
            this.userService.login(this.validateForm.getRawValue()).then((e: Result) => {
                console.log(e);
                this.message.success(e.msg);
                if (e.code === 0) {
                    localStorage.setItem('userInfo', JSON.stringify(e.data[0]));
                    this.router.navigate(['user/user-list']).then(() => {
                    });
                }
            }, err => {
                this.message.error(err.msg);
            });
        }

    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userCode: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });
    }
}
