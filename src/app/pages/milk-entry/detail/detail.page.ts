import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from 'src/app/services/user-details/user-details.service';
import * as _ from 'lodash';
import { PopoverController } from '@ionic/angular';
import { EditEntryComponent } from 'src/app/shared/components/edit-entry/edit-entry.component';
import { IMilkEntry } from 'src/app/shared/shared.interface';
import { MilkEntryDetailService } from 'src/app/services/milk-entry-detail/milk-entry-detail.service';
import { MilkEntryService } from 'src/app/services/milk-entry/milk-entry.service';
import { SharedUtilService } from 'src/app/services/shared-util/shared-util.service';

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
    private milkEntryDetailService: MilkEntryDetailService,
    private sharedUtilService: SharedUtilService
  ) {
    this.sharedUtilService.setDayMonthYear(this.selectedDate);
    this.milkEntryDetailService.getMilkDetailList().subscribe(entries => {
      console.log('entries in subscribe method ', entries);
      this.milkData = entries;
      this.totalMoney = 0;
      this.totalQuantity = 0;
      entries.forEach(entries => {
        this.totalMoney += entries.money;
        this.totalQuantity += entries.quantity;
      });
      this.sharedUtilService.hideLoading();
    });
  }
  ngOnInit() {
    console.log('printing date ', this.selectedDate);
    this.totalQuantity = 0;
    this.totalMoney = 0;
  }

  async monthYearChanged(date: string) {
    this.sharedUtilService.setDayMonthYear(date);
    this.refreshContent();
  }
  ionViewWillEnter() {
    this.refreshContent();
  }

  addNewEntry() {
    this.sharedUtilService.addMilkEntry();
  }

  async refreshContent() {
    this.sharedUtilService.presentLoading();
    this.milkEntryService.fetchDetails(this.selectedDate).then(entries => {
      this.milkEntryDetailService.setMilkDetailList(entries);
    });
  }

  async editEntryPopover(entry: IMilkEntry, deletable?: boolean) {
    console.log('printing event  ', event);
    const popover = await this.popoverController.create({
      component: EditEntryComponent,
      componentProps: { passValue: entry.quantity, deletable: true }
    });
    popover.onDidDismiss().then(dataReturned => {
      if (dataReturned && dataReturned.data) {
        this.sharedUtilService.presentLoading();
        console.log('Printing date returned ', dataReturned);
        // this.milkRate = dataReturned.data;
        if (dataReturned.data == 'delete') {
          this.milkEntryService.deleteMilkEntry(entry.day, entry.month, entry.year, entry.quantity);
        } else {
          this.milkEntryService.updateMilkEntry(entry.day, entry.month, entry.year, dataReturned.data, entry.quantity);
        }
      }
    });

    return await popover.present();
  }
}
