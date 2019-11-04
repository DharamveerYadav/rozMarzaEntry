import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from 'src/app/services/user-details/user-details.service';
import { firestore } from 'firebase';
import { EditEntryComponent } from 'src/app/shared/components/edit-entry/edit-entry.component';
import { MilkEntryDetailService } from 'src/app/services/milk-entry-detail/milk-entry-detail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  milkRate: number = 60;
  uid: string;
  constructor(
    private navCtrl: NavController,
    private agFirestore: AngularFirestore,
    private userService: UserDetailsService,
    private milkEntryService: MilkEntryDetailService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.milkRate = this.milkEntryService.getMilkRate();
  }
  showDetails() {
    this.navCtrl.navigateForward(['/milk-detail']);
  }

  addDetails(milkQuantity: number) {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.agFirestore.doc(`users/${this.userService.getUId()}`).update({
      [`${month},${year}`]: firestore.FieldValue.arrayUnion({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        quantity: milkQuantity,
        rate: this.milkRate,
        money: milkQuantity * this.milkRate
      })
    });
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
        this.milkEntryService.setMilkRate(this.milkRate);
      }
    });

    return await popover.present();
  }
}
