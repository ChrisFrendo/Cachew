import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { ToastController } from '@ionic/angular';
import { async } from 'q';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  ip: string = '10.68.117.110';

  roles: Array<string>;

  constructor(private menu: MenuController,private storage: Storage, private router: Router, private http: Http, private toastController: ToastController) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  subscribed(){
    this.router.navigateByUrl('/dashboard');
  }

  new(){
    this.router.navigateByUrl('/new');
  }

  ngOnInit() {
    this.http.get('http://'+this.ip+':4000/api/references/users/jobroles').subscribe(data => {
      this.roles = JSON.parse((<any>data)._body).array;
    }, error => {
      this.presentToast("Error when retrieving data. Please try again later");
      console.log(error);
    })
  }

  delete(index: number){
    console.log(index);
    this.storage.get('token').then((val) => {
      console.log('Your token is', val);

      this.http.delete('http://'+this.ip+':4000/api/references/users/jobroles?token=' + val + '&index='+index).subscribe(data => {
        this.roles = JSON.parse((<any>data)._body).array;
      }, error => {
        this.presentToast("Error when retrieving data. Please try again later");
        console.log(error);
      })
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
