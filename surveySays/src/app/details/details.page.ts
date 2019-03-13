import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage {

    gender: string;
    xp: number;

  constructor(private router: Router/*, public http: Http*/) {}
  // var  user {
  //  gender: string,
  //  age: number
  //  }
  //
  //   detailForm(){
  //     console.log(this.user);
  //   }


  genderFn(genderCheck: boolean){
    // if(genderCheck){
    //   gender = "Male";
    // }
    // else{
    //   gender = "Female";
    // }
    // console.log(this.user);

  }

  countries: any[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    }
  ];

  industries: any[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    }
  ];

  roles: any[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    }
  ];

  salaries: any[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
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
