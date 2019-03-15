import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { ToastController } from '@ionic/angular';
import { async } from 'q';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage {

  ip: string = '10.60.10.241';

  alive = true;
  passwordCheck = false;

  countries: Array<string>;
  roles: Array<string>;
  salaries: Array<number>;
  industries: Array<string>;
  timezones: Array<string>;

  gender: string;
  countrySelect: string;
  industrySelect: string;
  jobRoleSelect: string;
  salarySelect: string;
  timezoneSelect: string;
  xp: number;
  dob: any;
  student: any;

  constructor(private router: Router, public http: Http, public toastController: ToastController) {}

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

    this.http.get('http://'+this.ip+':4000/api/references/users/timezone').subscribe(data => {
      this.timezones = JSON.parse((<any>data)._body).array;
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

  usernameCheck: boolean = false;
  username: string;
  password: string;
  confirmPassword: string;
  usertype = 'participant';

  generateUsername(){
    this.http.get('http://'+this.ip+':4000/api/usernamegen')
    .subscribe( data => {
      this.username = JSON.parse((<any>data)._body).username;
    });
    this.usernameCheck=true;
  }

  postData;

  post(){
    if (!this.gender){
      this.presentToast("Select Gender");
      return;
    }

    if (!this.dob){
      this.presentToast("Select Date Of Birth");
      return;
    }

    if (!this.timezoneSelect){
      this.presentToast("Select timezone");
      return;
    }
    this.alive = !this.alive;
  }

  enable(){
    if(this.password == this.confirmPassword){
      this.passwordCheck=true;
    }
  else{
      this.passwordCheck=false;
    }
    if(!this.password || !this.confirmPassword){
      this.passwordCheck=false;
    }
  }

  // return this.http.request(new Request(this.requestoptions))
  //       .catch((error: any) => {
  //           if (error.status === 400){
  //             this.presentToast("User already exists");
  //           }
  //       });
  // }

  back(){
    this.alive = !this.alive;
  }

  signUp(){

    if (!this.usernameCheck){
      this.presentToast("Enter username");
      return;
    }

    if (this.password.length < 8){
      this.presentToast("Password length must be at least 8 characters!");
      return;
    }

    if (!this.password || !this.confirmPassword){
      this.presentToast("Enter password");
      return;
    }

    if (this.password != this.confirmPassword){
      this.presentToast("Passwords do not match");
      // this.password = "";
      this.confirmPassword = "";
      return;
    }

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
      "student": this.student,
      "timezones": this.timezoneSelect
    }

    // var newParticipant = JSON.stringify(postData);

    this.http.post('http://'+this.ip+':4000/api/register', postData).subscribe(data => {
      console.log("register requrest successful");
      this.presentToast("Register Successful");
      this.router.navigateByUrl('/log-in');
      // add error handling
    })

  }

  async presentToast(displayMessage) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000
    });
    toast.present();
  }

}
