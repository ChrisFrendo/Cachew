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

user = {
username: "string",
password: "string"
};

  signForm(){
    console.log(this.user);
  }

  generateUsername(){
    // this.http.get('http://localhost:4000/api/usernamegen')
    // .subscribe( data => {
    //   this.username = data.username;
    // });
     this.user.username = "Testing";
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
    this.router.navigateByUrl('/log-in');
  }

}
