import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  constructor(private router: Router/*, public http: Http*/) { }

  username: string;
  password: string;

  generateUsername(){
     this.username = "Testing";
  }

  post(){
    //  let postData = {
    //   "username": this.username,
    //   "password": this.password,
    // }
    // this.http.post('http://local')
    //     .subscribe(data => {
    //        console.log(data);
    //      });
    this.router.navigateByUrl('/details');
  }

}
