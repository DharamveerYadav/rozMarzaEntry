import { Injectable, Injector } from '@angular/core';
import { MilkEntryDetailService } from '../milk-entry-detail/milk-entry-detail.service';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from '../user-details/user-details.service';
import { IMilkEntry } from 'src/app/shared/shared.interface';
import * as _ from 'lodash';
import { take } from 'rxjs/operators';
import { SharedUtilService } from '../shared-util/shared-util.service';

@Injectable({
  providedIn: 'root'
})
export class MilkEntryService {
  constructor(
    private milkEntryDetailService: MilkEntryDetailService,
    private agFirestore: AngularFirestore,
    private userService: UserDetailsService,
    private injector: Injector
  ) {}

  async updateMilkEntry(day: number, month: number, year: number, newEntry: number, oldValue: number) {
    const milkData = await this.updateFetchedDetails(day, month, year, newEntry, oldValue);
    console.log('insider updateMilkEntry milkData ', milkData);
    await this.agFirestore.doc(`users/${this.userService.getUId()}`).update({
      [`${month},${year}`]: milkData
    });
    this.milkEntryDetailService.setMilkDetailList(milkData);
  }

  async updateFetchedDetails(day: number, month: number, year: number, newQuantity: number, oldValue: number) {
    return new Promise((resolve, reject) => {
      const temp2: IMilkEntry[] = [];

      this.agFirestore
        .doc(`users/${this.userService.getUId()}`)
        .valueChanges()
        .pipe(take(1))
        .subscribe(values => {
          console.log('updateFetchedDetails ', values);
          _.forEach(values, (value, key) => {
            if (key === `${month},${year}`) {
              value.forEach((entries: IMilkEntry) => {
                if (newQuantity && entries.day == day && entries.quantity == oldValue) {
                  entries.quantity = newQuantity;
                  entries.money = newQuantity * entries.rate;
                  temp2.push(entries);
                } else {
                  temp2.push(entries);
                }
              });
              // return;
            }
          });
          resolve(_.sortBy(temp2, ['day']));
        });
    });
  }

  async fetchDetails(date): Promise<IMilkEntry[]> {
    return new Promise((resolve, reject) => {
      const temp: IMilkEntry[] = [];
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const data2 = this.agFirestore.doc(`users/${this.userService.getUId()}`);

      data2
        .valueChanges()
        .pipe(take(1))
        .subscribe(values => {
          _.forEach(values, (value, key) => {
            if (key === `${month},${year}`) {
              value.forEach(entries => temp.push(entries));
            }
          });
          resolve(_.sortBy(temp, ['day']));
        });
    });
  }

  async fetchCurrentMilkRate(): Promise<number> {
    return new Promise((resolve, reject) => {
      const data2 = this.agFirestore.doc(`users/${this.userService.getUId()}`);
      data2
        .valueChanges()
        .pipe(take(1))
        .subscribe(values => {
          _.forEach(values, (value, key) => {
            if (key === 'milk-rate') {
              resolve(value);
            }
          });
          resolve(null);
        });
    });
  }

  async updateCurrentMilkRate(milkRate: number) {
    console.log('insider  milkRate ', milkRate);

    await this.agFirestore.doc(`users/${this.userService.getUId()}`).update({
      'milk-rate': milkRate
    });
    this.milkEntryDetailService.setMilkRate(milkRate);
  }

  addMilkEntry(milkQuantity: number, dayValue?: number) {
    this.injector.get(SharedUtilService).presentLoading();
    let day = this.milkEntryDetailService.getDay();
    if (dayValue) {
      day = dayValue;
    }
    const month = this.milkEntryDetailService.getMonth();
    const year = this.milkEntryDetailService.getYear();
    this.agFirestore
      .doc(`users/${this.userService.getUId()}`)
      .update({
        [`${month},${year}`]: firestore.FieldValue.arrayUnion({
          day: day,
          month: month,
          year: year,
          quantity: milkQuantity,
          rate: this.milkEntryDetailService.getMilkRate(),
          money: milkQuantity * this.milkEntryDetailService.getMilkRate()
        })
      })
      .then(() => {
        this.injector.get(SharedUtilService).hideLoading();
        this.injector.get(SharedUtilService).createAlert('Entry Added Successfully !!!');
        this.fetchDetails(this.milkEntryDetailService.getCurrentDate()).then(entries => {
          console.log('entries after new new one ', entries);
          this.milkEntryDetailService.setMilkDetailList(entries);
        });
      });
  }

  async deleteMilkEntry(day: number, month: number, year: number, quantity: number) {
    const milkData = await this.updateFetchedForDeleteDetails(day, month, year, quantity);
    console.log('insider deleteMilkEntry milkData ', milkData);
    await this.agFirestore.doc(`users/${this.userService.getUId()}`).update({
      [`${month},${year}`]: milkData
    });
    this.milkEntryDetailService.setMilkDetailList(milkData);
    this.injector.get(SharedUtilService).createAlert('Entry deleted successfully !!!');
  }

  async updateFetchedForDeleteDetails(day: number, month: number, year: number, quantity: number) {
    return new Promise((resolve, reject) => {
      const temp2: IMilkEntry[] = [];

      this.agFirestore
        .doc(`users/${this.userService.getUId()}`)
        .valueChanges()
        .pipe(take(1))
        .subscribe(values => {
          console.log('updateFetchedForDeleteDetails ', values);
          _.forEach(values, (value, key) => {
            if (key === `${month},${year}`) {
              value.forEach((entries: IMilkEntry) => {
                if (entries.day == day && entries.quantity == quantity) {
                } else {
                  temp2.push(entries);
                }
              });
              // return;
            }
          });
          resolve(_.sortBy(temp2, ['day']));
        });
    });
  }
}
