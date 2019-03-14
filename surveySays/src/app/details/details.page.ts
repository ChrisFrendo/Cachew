import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage {

  ip: string = '10.68.112.7';

  alive = true;


  countries: Array<string>;
  roles: Array<string>;
  salaries: Array<number>;
  industries: Array<string>;

  gender: string;
  countrySelect: string;
  industrySelect: string;
  jobRoleSelect: string;
  salarySelect: string;
  xp: number;
  dob: any;
  student: any;

  constructor(private router: Router, public http: Http) {}

  ngOnInit(){

    this.http.get('http://'+this.ip+':4000/api/references/users/salaries').subscribe(data => {
      this.salaries = JSON.parse((<any>data)._body).array;
    })

    this.http.get('http://'+this.ip+':4000/api/references/users/countries').subscribe(data => {
      this.countries = JSON.parse((<any>data)._body).array;
    })

    this.http.get('http://'+this.ip+':4000/api/references/users/jobroles').subscribe(data => {
      this.roles = JSON.parse((<any>data)._body).array;
    })

    this.http.get('http://'+this.ip+':4000/api/references/users/industry').subscribe(data => {
      this.industries = JSON.parse((<any>data)._body).array;
    })

  }

  genderFn(genderCheck: boolean){
    if(genderCheck){
      this.gender = "Male";
    }
    else{
      this.gender = "Female";
    }
  }

  username: string;
  password: string;
  usertype = 'participant';

  generateUsername(){
    this.http.get('http://'+this.ip+':4000/api/usernamegen')
    .subscribe( data => {
      this.username = JSON.parse((<any>data)._body).username;
    });
  }

  postData;

  post(){
    this.alive = false;
  }

  signUp(){
    let postData = {
     "username": this.username,
     "password": this.password,
     "usertype": this.usertype,
     "gender": this.gender,
     "country": this.countrySelect,
     "industry": this.industrySelect,
     "jobrole": this.jobRoleSelect,
     "yearsExp": this.xp,
     "salary": this.salarySelect,
     "dob": this.dob,
     "student": this.student
   }

   console.log(postData);
  }

}
