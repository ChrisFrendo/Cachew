import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { ToastController } from '@ionic/angular';
import { async } from 'q';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
  styleUrls: ['./study.page.scss'],
})
export class StudyPage implements OnInit {
  ip: string = '10.60.10.66';

  genreSelect: string[] = [];
  studyTitles: Array<any>;
  studyId: Array<any>;

  constructor(private menu: MenuController,private storage: Storage, private router: Router, private http: Http, private toastController: ToastController) { }

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
    //get selected subscribed to study
    // this.input="";
    // this.genreSelect[0]="all";
    // console.log(this.genreSelect);
    // this.storage.get('token').then((val) => {
    //   console.log('Your token is', val);
    //   this.http.get('http://'+this.ip+':4000/api/study/notsubscribed?token=' + val+"&title=" + this.input+"&genres=" + this.genreSelect).subscribe(data => {
    //     this.studyTitles = JSON.parse((<any>data)._body).array;
    //     this.studyId = JSON.parse((<any>data)._body).array;
    //     for(var i=0; i<this.studyTitles.length; i++){
    //       this.studyTitles[i] = this.studyTitles[i].title;
    //       this.studyId[i] = this.studyId[i]._id;
    //     }
    //   }, error => {
    //     this.presentToast("Error when retrieving data. Please try again later");
    //     console.log(error);
    //   })
    // })
  }

  async presentToast(displayMessage) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000
    });
    toast.present();
  }
}
