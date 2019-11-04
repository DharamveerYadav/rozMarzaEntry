import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from 'src/app/services/user-details/user-details.service';
import * as _ from 'lodash';
import { PopoverController } from '@ionic/angular';
import { EditEntryComponent } from 'src/app/shared/components/edit-entry/edit-entry.component';
import { IMilkEntry } from 'src/app/shared/shared.interface';
import { MilkEntryDetailService } from 'src/app/services/milk-entry-detail/milk-entry-detail.service';
import { MilkEntryService } from 'src/app/services/milk-entry/milk-entry.service';

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

  constructor(
    private agFirestore: AngularFirestore,
    private userService: UserDetailsService,
    private popoverController: PopoverController,
    private milkEntryService: MilkEntryService,
    private milkEntryDetailService: MilkEntryDetailService
  ) {
    this.milkEntryDetailService.getMilkDetailList().subscribe(entries => {
      this.milkData = entries;
      this.totalMoney = 0;
      this.totalQuantity = 0;
      entries.forEach(entries => {
        this.totalMoney += entries.money;
        this.totalQuantity += entries.quantity;
      });
    });
  }
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
    // this.milkData = values;
  }

  async doSomething(date: string) {
    console.log('Printing selected date ', date);
    this.refreshContent();
  }
  ionViewWillEnter() {
    this.refreshContent();
  }

  async refreshContent() {
    this.milkEntryService.fetchDetails(this.selectedDate).then(entries => {
      this.milkEntryDetailService.setMilkDetailList(entries);
      // this.milkData = entries
    });
  }

  async editEntryPopover(entry: IMilkEntry) {
    console.log('printing event  ', event);
    const popover = await this.popoverController.create({
      component: EditEntryComponent,
      componentProps: { passValue: entry.quantity }
    });
    popover.onDidDismiss().then(dataReturned => {
      if (dataReturned !== null) {
        console.log('Printing date returned ', dataReturned);
        // this.milkRate = dataReturned.data;
        this.milkEntryService.updateMilkEntry(entry.day, entry.month, entry.year, dataReturned.data, entry.quantity);
      }
    });

    return await popover.present();
  }
}
