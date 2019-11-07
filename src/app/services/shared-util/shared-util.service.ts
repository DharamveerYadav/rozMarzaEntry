import { Injectable, Injector } from '@angular/core';
import { AlertController, PopoverController, LoadingController } from '@ionic/angular';
import { MilkEntryDetailService } from '../milk-entry-detail/milk-entry-detail.service';
import { NewEntryComponent } from 'src/app/shared/components/new-entry/new-entry.component';
import { MilkEntryService } from '../milk-entry/milk-entry.service';

@Injectable({
  providedIn: 'root'
})
export class SharedUtilService {
  constructor(
    private alertCtrl: AlertController,
    private milkEntryDetailService: MilkEntryDetailService,
    private popoverController: PopoverController,
    private injector: Injector,
    private loadingCtrl: LoadingController
  ) {}

  async createAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000
    });
    await loading.present();
  }

  async hideLoading() {
    try {
      this.loadingCtrl.dismiss();
    } catch (error) {
      console.log('not laoding ctrl found');
    }
  }

  async addMilkEntry() {
    const popover = await this.popoverController.create({
      component: NewEntryComponent,
      componentProps: {}
    });
    popover.onDidDismiss().then(dataReturned => {
      if (dataReturned !== null) {
        console.log('Printing date returned ', dataReturned);
        this.presentLoading();
        // this.milkRate = dataReturned.data;
        this.injector.get(MilkEntryService).addMilkEntry(dataReturned.data.quantity, dataReturned.data.day);
      }
    });

    return await popover.present();
  }

  setDayMonthYear(date: string) {
    if (date) {
      const year = +date.slice(0, 4);
      const month = +date.slice(5, 7);
      const day = +date.slice(8, 10);
      this.milkEntryDetailService.setDay(day);
      this.milkEntryDetailService.setMonth(month);
      this.milkEntryDetailService.setYear(year);
      this.milkEntryDetailService.setCurrentDate(date);
    }
  }
}
