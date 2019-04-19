import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { async } from 'q';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {

  ip: string = '10.60.10.66';

  username: string;
  password: string;

  constructor(private router: Router, private http: Http,
     private toastController: ToastController, private storage: Storage,
       public fcm: FCM) {}

  login(){
    var url = "http://"+this.ip+":4000/api/login/participant?username=" + this.username + "&password=" + this.password;

    this.http.get(url).subscribe(data => {
      var authToken = JSON.parse((<any>data)._body).token
        this.storage.set('token', authToken);
        this.presentToast("Login Successful");
        var fcmUrl = "http://"+this.ip+":4000/api/fcm?token=" + authToken;

        this.fcm.getToken().then(token => {
          // this.presentToast(token);
          this.storage.set('fcm', token);

          let payload = {
            fcmToken: token
          }

          this.http.put(fcmUrl, payload).subscribe(()=>{
              this.router.navigateByUrl('/dashboard');
          })
        });
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
