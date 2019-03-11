import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {

  constructor(private router: Router/*, public http: Http*/) {}
  // var  user {
  //  gender: string,
  //  age: number
  //  }
  //
  //   detailForm(){
  //     console.log(this.user);
  //   }


  gender(genderCheck: boolean){
  //   if(genderCheck){
  //     this.user.gender = "Male";
  //   }
  //   else{
  //     this.user.gender = "Female";
  //   }
  }

  users: any[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    },
    {
      id: 3,
      first: 'Charlie',
      last: 'Rosenburg',
    }
  ];

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;

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

}
