import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  constructor(private router: Router) { }

//   var firstNameSyllables: Array;
  username: string;
  password: string;
  industry: string;
  salary: string;
//   check: boolean = false;
//
// fill(){
//     firstNameSyllables = new Array();
//     firstNameSyllables.Push("mon");
//     firstNameSyllables.Push("fay");
//     firstNameSyllables.Push("shi");
//     firstNameSyllables.Push("zag");
//     firstNameSyllables.Push("blarg");
//     firstNameSyllables.Push("rash");
//     firstNameSyllables.Push("izen");
//     check == true;
//   }
//
  generateUsername(){
//     if (!check){
//       fill();
//     }
//     //Creates a first name with 2-3 syllables
//      var firstName: string;
//      var numberOfSyllablesInFirstName: int = Random.Range(2, 4);
//      for (var i: int = 0; i < numberOfSyllablesInFirstName; i++)
//      {
//          firstName += firstNameSyllables[Random.Range(0, firstNameSyllables.length)];
//      }
//      var firstNameLetter: string;
//      firstNameLetter = firstName.Substring(0,1);
//      firstName = firstName.Remove(0,1);
//      firstNameLetter = firstNameLetter.ToUpper();
//      this.username = firstNameLetter + firstName;
//
     this.username = "Testing";
  }

  confirm(){
    // let postData = {
    //   "username": this.username,
    //   "password": this.password,
    //   "salary": this.salary,
    //   "industry": this.industry
    }
    // this.http.post('http://localhost')
  }
