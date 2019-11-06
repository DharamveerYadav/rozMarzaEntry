import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from 'src/app/services/user-details/user-details.service';
import { firestore } from 'firebase';
import { EditEntryComponent } from 'src/app/shared/components/edit-entry/edit-entry.component';
import { MilkEntryDetailService } from 'src/app/services/milk-entry-detail/milk-entry-detail.service';
import { MilkEntryService } from 'src/app/services/milk-entry/milk-entry.service';
import { SharedUtilService } from 'src/app/services/shared-util/shared-util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  milkRate: number;
  uid: string;
  constructor(
    private navCtrl: NavController,
    private agFirestore: AngularFirestore,
    private userService: UserDetailsService,
    private milkEntryDetailsService: MilkEntryDetailService,
    private popoverController: PopoverController,
    private milkEntryService: MilkEntryService,
    private sharedUtilService: SharedUtilService
  ) {}

  async ngOnInit() {
    this.sharedUtilService.setDayMonthYear(new Date().toISOString());
    this.milkRate = await this.milkEntryService.fetchCurrentMilkRate();
    if (this.milkRate) {
      this.milkEntryDetailsService.setMilkRate(this.milkRate);
    } else {
      this.milkRate = 60;
      this.milkEntryService.updateCurrentMilkRate(60);
    }
  }
  showDetails() {
    this.navCtrl.navigateForward(['/milk-detail']);
  }

  addDetails(milkQuantity: number) {
    this.milkEntryService.addMilkEntry(milkQuantity);
  }

  async editEntryPopover(event) {
    console.log('printing event  ', event);
    const popover = await this.popoverController.create({
      component: EditEntryComponent,
      componentProps: { passValue: this.milkRate }
    });
    popover.onDidDismiss().then(dataReturned => {
      if (dataReturned !== null) {
        console.log('Printing date returned ', dataReturned);
        this.milkRate = dataReturned.data;
        this.milkEntryDetailsService.setMilkRate(this.milkRate);
        this.milkEntryService.updateCurrentMilkRate(this.milkRate);
      }
    });

    return await popover.present();
  }
}
