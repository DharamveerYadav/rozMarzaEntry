import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {
  day;
  quantity;
  constructor(private popCtrl: PopoverController) {}

  ngOnInit() {}

  dismissPopOver() {
    this.popCtrl.dismiss({ day: this.day, quantity: this.quantity });
  }

  cancelPopOver() {
    this.popCtrl.dismiss();
  }
}
