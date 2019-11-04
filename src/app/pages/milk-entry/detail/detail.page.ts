import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from 'src/app/services/user-details/user-details.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit {
  milkData = [];
  totalQuantity: number;
  totalMoney: number;
  selectedDate: string = new Date().toISOString();

  constructor(private agFirestore: AngularFirestore, private userService: UserDetailsService) {}
  ngOnInit() {
    console.log('printing date ', this.selectedDate);
    this.totalQuantity = 0;
    this.totalMoney = 0;
    const values = [
      { quantity: 5, day: 2, rate: 60, money: 300 },
      { quantity: 2, day: 3, rate: 60, money: 120 },
      { quantity: 1, day: 4, rate: 60, money: 60 },
      { quantity: 5, day: 2, rate: 60, money: 300 },
      { quantity: 2, day: 3, rate: 60, money: 120 },
      { quantity: 1, day: 4, rate: 60, money: 60 },
      { quantity: 5, day: 2, rate: 60, money: 300 },
      { quantity: 2, day: 3, rate: 60, money: 120 },
      { quantity: 1, day: 4, rate: 60, money: 60 },
      { quantity: 5, day: 2, rate: 60, money: 300 },
      { quantity: 2, day: 3, rate: 60, money: 120 },
      { quantity: 1, day: 4, rate: 60, money: 60 },
      { quantity: 5, day: 2, rate: 60, money: 300 },
      { quantity: 2, day: 3, rate: 60, money: 120 },
      { quantity: 1, day: 4, rate: 60, money: 60 }
    ];
    this.milkData = values;
    this.milkData.forEach(entries => {
      this.totalMoney += entries.money;
      this.totalQuantity += entries.quantity;
    });
  }

  doSomething(date: string) {
    console.log('Printing selected date ', date);
    this.fetchDetails(this.selectedDate);
  }
  ionViewWillEnter() {
    this.fetchDetails(this.selectedDate);
  }

  fetchDetails(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);

    // const data = this.agFirestore.doc(`users/${this.userService.getUId()}`);
    // data.valueChanges().subscribe(values => {
    //   _.forEach(values, (value, key) => {
    //     if(key === `${month},${year}`){
    //       value.forEach(entries => this.milkData.push(entries));
    //     }
    //   });
    // })
  }
}
