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

  studyID: any;
  questions: Array<any>;
  genreSelect: string[] = [];
  studyTitle: string;
  studyId: Array<any>;
  text : boolean;
  scale: boolean;
  ask: boolean;
  multi: boolean;
  optionSelect: boolean[] = [];
  options = ([
    "one", "two", "three"
  ]);

  constructor(private menu: MenuController,private storage: Storage, private router: Router, private http: Http, private toastController: ToastController) { }

  ionViewWillEnter(){
    this.storage.get('studyID').then((id) => {
      this.studyId=id;
    })
    this.storage.get('studyTitle').then((title) => {
      this.studyTitle=title;
    })
    this.storage.get('token').then((val) => {
      console.log('Your token is', val);
      this.http.get('http://'+this.ip+':4000/api/question?token=' + val + '&studyID=' + this.studyId).subscribe(data => {
        this.questions = JSON.parse((<any>data)._body).array;
        for (var i = 0; i < this.questions.length; i++){
          if(this.questions[i] == null){
            this.questions.splice(i,1);
          }
        }
        console.log(this.questions);
      }, error => {
        this.presentToast("Error when retrieving data. Please try again later");
        console.log(error);
      })
    })
    this.setType("0");
  }

setType(index: number){
  console.log(this.questions[0].type);

  if(this.questions[index].type == "Free Text"){
    this.text = true;
    this.scale = false;
    this.ask = false;
    this.multi = false;
  }
  else if(this.questions[index].type == "Scale"){
    this.text = false;
    this.scale = true;
    this.ask = false;
    this.multi = false;
  }
  else if(this.questions[index].type == "Boolean"){
    this.text = false;
    this.scale = false;
    this.ask = true;
    this.multi = false;
  }
  else if(this.questions[index].type == "Multiple Choice"){
    this.text = false;
    this.scale = false;
    this.ask = false;
    this.multi = true;
  }
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

  askFn(askCheck: boolean){
      if(!askCheck){
        console.log("false");
      }
      else{
        console.log("true");
      }
  }

  submit(){
    this.router.navigateByUrl('/study');
  }

  async presentToast(displayMessage) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000
    });
    toast.present();
  }
}
