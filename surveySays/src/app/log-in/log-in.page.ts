import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {

  credentials = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  goToSignUp(){
    this.router.navigateByUrl('/sign-up');
  }

}
