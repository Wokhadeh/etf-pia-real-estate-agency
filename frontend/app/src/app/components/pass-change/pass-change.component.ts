import { Component, OnInit } from '@angular/core';
import { Router, ɵangular_packages_router_router_b } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-pass-change',
  templateUrl: './pass-change.component.html',
  styleUrls: ['./pass-change.component.css']
})
export class PassChangeComponent implements OnInit {

  constructor(private passValidator: ValidatorsService, private userService: UsersService, private router: Router) { }
  password: string;
  newPassword: string;
  confirmPassword: string;
  validPassword: boolean = true;;
  msg: string;
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))[0]
  }

  validatePass() {
    this.validPassword = this.passValidator.validatePassword(this.newPassword);
  }

  changePassword() {
    this.userService.changePassword(this.user.username, this.newPassword).subscribe(
      (mess) => {
        if (mess['mess'] == 'pass changed') {
          localStorage.clear();
          this.router.navigate(["/"])
        }
      }
    )
  }

}
