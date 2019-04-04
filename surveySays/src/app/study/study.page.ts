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

  content: String;
  typeAns: String;
  trueValue: String;
  falseValue: String;
  answerQ: String;
  studyID: any;
  questions: Array<any>;
  currentQ: any;
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
      console.log(this.studyTitle);
    })
    this.storage.get('token').then((val) => {
      console.log('Your token is', val);
      this.http.get('http://'+this.ip+':4000/api/question?token=' + val + '&studyID=' + this.studyId).subscribe(data => {
        this.questions = JSON.parse((<any>data)._body).array;
        // console.log(this.questions);
        for (var i = 0; i < this.questions.length; i++){
          if(this.questions[i] == null){
            this.questions.splice(i,1);
          }
        }
        console.log(this.questions)
        this.setType(0);
        this.currentQ = this.questions[0].title;
        this.content = this.questions[0].content;
        console.log(this.questions[0]);
      }, error => {
        this.presentToast("Error when retrieving data. Please try again later");
        console.log(error);
      })
    })
  }

setType(index: number){
  console.log(index);
  console.log(this.questions[index].type);

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

    this.trueValue = this.questions[index].boolean.trueValue;
    this.falseValue = this.questions[index].boolean.falseValue;
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
  }

  askFn(askCheck: boolean){
      if(!askCheck){
        console.log("false");
        this.answerQ = this.falseValue;
      }
      else{
        console.log("true");
        this.answerQ = this.trueValue;
      }
  }

 submit(){
        this.storage.get('token').then((val) => {
        let postData = {}

          if(this.questions[0].type == "Free Text"){
            postData = {
              "answer": {"freetextAnswer": this.answerQ},
              "id": this.questions[0]._id
            };
          }
          else if(this.questions[0].type == "Scale"){
            postData = {
              "answer": {"scaleAnswer": this.answerQ},
              "id": this.questions[0]._id
            };
          }
          else if(this.questions[0].type == "Boolean"){
            postData = {
              "answer": {"booleanAnswer": this.answerQ},
              "id": this.questions[0]._id
            };
          }
          else if(this.questions[0].type == "Multiple Choice"){
            postData = {
              "answer": {"multAnswer": this.answerQ},
              "id": this.questions[0]._id
            };
          }
          this.answerQ = "";
        console.log(postData);
        this.http.put('http://'+this.ip+':4000/api/answer?token=' + val, postData).subscribe(data => {
          if (this.questions.length == 1){
            this.router.navigateByUrl('/dashboard');
          }
          else{
            this.ionViewWillEnter();
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
