/**
 * Created by WH1709040 on 2018/10/11.
 */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/api-service/user.service';
import {Router} from '@angular/router';
import {Result} from '../../core/entity/result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.userService.login(this.validateForm.getRawValue()).then((e: Result) => {
        console.log(e);
        if (e.code === 0) {
          this.router.navigate(['user/user-list']).then(e => {
          });
        }
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
