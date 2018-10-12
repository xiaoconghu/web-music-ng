/**
 * Created by WH1709040 on 2018/10/11.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: `./user.component.html`,
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  constructor(private $router: Router) {
  }

  ngOnInit(): void {
  }

  public navigate(target) {
    this.$router.navigate(['/user/user-list']).catch();
  }

}
