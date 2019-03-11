import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(private router: Router/*, public http: Http*/) {}

  female: boolean;
  male: boolean;
  age: number;

  post(){
    //  let postData = {
    //   "username": this.username,
    //   "password": this.password,
    // }
    // this.http.post('http://local')
    //     .subscribe(data => {
    //        console.log(data);
    //      });
    this.router.navigateByUrl('/sign-up');
  }

  ngOnInit(){

  }
}
