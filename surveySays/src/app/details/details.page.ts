import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor() { }
    public form = [
      {val: 'Pepperoni', isChecked:true},
      {val: 'Sausage', isChecked: false},
      {val: 'Mushroom', isChecked: false}
    ];
  ngOnInit() {
  }

}
