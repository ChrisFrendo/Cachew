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
  ip: string = '10.60.10.66';

  //set to number of questions to answer
  notification: Array<number>;

  noStudy= false;
  roles: Array<string>;
  studyTitles: Array<any>;
  studyId: Array<any>;
  indicatorCheck: Array<boolean>;

  constructor(private menu: MenuController,private storage: Storage, private router: Router, private http: Http, private toastController: ToastController) { }

  ionViewWillEnter(){
    this.storage.get('token').then((val) => {
    this.http.get('http://'+this.ip+':4000/api/study/subscribed?token=' + val).subscribe(data => {
      this.studyTitles = JSON.parse((<any>data)._body).array;
      this.studyId = JSON.parse((<any>data)._body).array;
      this.notification = JSON.parse((<any>data)._body).notifications;
      this.indicatorCheck = JSON.parse((<any>data)._body).flag;
      for(var i=0; i<this.studyTitles.length; i++){
        this.studyTitles[i] = this.studyTitles[i].title;
        this.studyId[i] = this.studyId[i]._id;
        this.noStudy = true;
      }
    }, error => {
      this.presentToast("Error when retrieving data. Please try again later");
      console.log(error);
    })
  })
}

  openFirst() {
    this.menu.enable(true, 'start');
    this.menu.open('start');
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

  }

  delete(index: number){
    console.log(index);

    this.storage.get('token').then((val) => {
      // console.log('Your token is', val);

      let postData = {
        studyID: this.studyId[index]
      }
      console.log(postData);
      this.http.put('http://'+this.ip+':4000/api/study/subscribed?token=' + val, postData).subscribe(data => {
        this.studyTitles = JSON.parse((<any>data)._body).array;
        this.studyId = JSON.parse((<any>data)._body).array;
        for(var i=0; i<this.studyTitles.length; i++){
          this.studyTitles[i] = this.studyTitles[i].title;
          this.studyId[i] = this.studyId[i]._id;
        }
        if(this.studyTitles.length==0){
          this.noStudy = false;
        }
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
