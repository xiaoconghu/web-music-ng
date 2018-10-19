import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/api-service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Result} from '../../../core/entity/result';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.less']
})
export class AddUserComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm);
    if (this.validateForm.valid) {
      const {email, password, userCode, userName, phoneNumber} = this.validateForm.getRawValue();
      this.userService.register({email, password, userCode, userName, phoneNumber}).then(result => {
        console.log(result);
        this.router.navigate(['/user/user-list']);
      });
    }
    console.log(this.validateForm.getRawValue());
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }


  ngOnInit(): void {
    const type = this.activeRoute.snapshot.params.type;
    if (type === 'update') {
      this.activeRoute.queryParams.subscribe(e => {
        console.log(e);
        this.userService.getUserById(e.id).then((result: Result) => {
          console.log(result.data);
        });
      });
    }
    this.validateForm = this.fb.group({
      email: [null, [Validators.email]],
      userCode: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      userName: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      agree: [false]
    });
  }
}
