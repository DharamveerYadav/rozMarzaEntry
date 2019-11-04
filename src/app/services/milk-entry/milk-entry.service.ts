import { Injectable } from '@angular/core';
import { MilkEntryDetailService } from '../milk-entry-detail/milk-entry-detail.service';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from '../user-details/user-details.service';
import { IMilkEntry } from 'src/app/shared/shared.interface';
import * as _ from 'lodash';
import { debug } from 'util';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MilkEntryService {
  constructor(
    private milkEntryDetailService: MilkEntryDetailService,
    private agFirestore: AngularFirestore,
    private userService: UserDetailsService
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
          resolve(temp2);
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

          resolve(temp);
        });
    });
  }
}
