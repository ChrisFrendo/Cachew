import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  constructor(private router: Router, private http: HttpClient) { }

  username: string;
  password: string;
  usertype = 'participant';
  ip: string = '10.68.117.110';

  generateUsername(){
    this.http.get('http://'+this.ip+':4000/api/usernamegen')
    .subscribe( data => {
      this.username = (<any>data).username;
    });
  }

  post(){
     let postData = {
      "username": this.username,
      "password": this.password,
      "usertype": this.usertype
    }
    console.log(postData);
  }

}
