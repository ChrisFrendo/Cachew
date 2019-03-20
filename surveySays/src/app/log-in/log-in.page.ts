import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { async } from 'q';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {

  ip: string = '10.68.117.110';

  username: string;
  password: string;

  constructor(private router: Router, private http: Http, private toastController: ToastController, private storage: Storage) {}

  login(){
    var url = "http://"+this.ip+":4000/api/login/participant?username=" + this.username + "&password=" + this.password;

    this.http.get(url).subscribe(data => {
        this.storage.set('token', JSON.parse((<any>data)._body).token);
        this.presentToast("Login Successful");
        this.router.navigateByUrl('/dashboard');
    }, error => {
        console.log(error);
        this.presentToast("Login Failed");
    })

  }

  register(){
    this.router.navigateByUrl('/details');
  }

  async presentToast(displayMessage) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000
    });
    toast.present();
  }
}
