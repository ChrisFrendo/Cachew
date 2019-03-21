import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { ToastController } from '@ionic/angular';
import { async } from 'q';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})

export class NewPage implements OnInit {

    ip: string = '10.60.10.66';

    roles: Array<string>;
    genreSelect: Array<string>;
    genres: string;
    studyTitles: Array<any>;
    studyId: Array<any>;
    input: string;

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

      this.http.get('http://'+this.ip+':4000/api/references/study/genres').subscribe(data => {
        this.genres = JSON.parse((<any>data)._body).array;
      }, error => {
        this.presentToast("Error when retrieving data. Please try again later");
        console.log(error);
      })

      this.input="";
      this.genreSelect="all";
      console.log(this.genreSelect);
      this.storage.get('token').then((val) => {
          console.log('Your token is', val);
        this.http.get('http://'+this.ip+':4000/api/study/notsubscribed?token=' + val+"&title=" + this.input+"&genres=" + this.genreSelect).subscribe(data => {
          this.studyTitles = JSON.parse((<any>data)._body).array;
          this.studyId = JSON.parse((<any>data)._body).array;
          for(var i=0; i<this.studyTitles.length; i++){
            this.studyTitles[i] = this.studyTitles[i].title;
            this.studyId[i] = this.studyId[i]._id;
          }
        }, error => {
          this.presentToast("Error when retrieving data. Please try again later");
          console.log(error);
        })
     })
   }

    add(index: number){
      // console.log(this.genreSelect);
      this.storage.get('token').then((val) => {
        // console.log('Your token is', val);

        let postData = {
          studyID: this.studyId[index]
        }

        this.http.put('http://'+this.ip+':4000/api/study?token=' + val, postData).subscribe(data => {
          this.studyTitles = JSON.parse((<any>data)._body).array;
          this.studyId = JSON.parse((<any>data)._body).array;
          for(var i=0; i<this.studyTitles.length; i++){
            this.studyTitles[i] = this.studyTitles[i].title;
            this.studyId[i] = this.studyId[i]._id;
          }
        }, error => {
          this.presentToast("Error when retrieving data. Please try again later");
          console.log(error);
        })
      })
      window.location.reload(true)
    }

search (){
  this.storage.get('token').then((val) => {
    if(this.genreSelect == ""){
      this.genreSelect="all";
    }

    this.http.get('http://'+this.ip+':4000/api/study/notsubscribed?token=' + val +"&title=" + this.input+"&genres=" + this.genreSelect).subscribe(data => {
      this.studyTitles = JSON.parse((<any>data)._body).array;
      this.studyId = JSON.parse((<any>data)._body).array;
      for(var i=0; i<this.studyTitles.length; i++){
        this.studyTitles[i] = this.studyTitles[i].title;
        this.studyId[i] = this.studyId[i]._id;
      }
    }, error => {
      this.presentToast("Error when retrieving data. Please try again later");
      console.log(error);
    })
  })
}

options(index: number){
  // console.log(this.genreSelect);
}

    async presentToast(displayMessage) {
      const toast = await this.toastController.create({
        message: displayMessage,
        duration: 2000
      });
      toast.present();
    }
  }
