import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  username: ''

  generateUsername(){}
  constructor(private router: Router) { }

  confirm(){
    this.router.navigateByUrl('/details');
  }
  ngOnInit() {
  }

}
