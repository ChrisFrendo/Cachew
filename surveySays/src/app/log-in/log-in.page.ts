import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {

  username: string;
  password: string;

  constructor(private router: Router/*, public http: Http*/) {}

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
