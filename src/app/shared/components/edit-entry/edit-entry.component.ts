import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent implements OnInit {
  newValue;
  oldValue;
  constructor(private popCtrl: PopoverController, private navParams: NavParams) {}

  ngOnInit() {
    console.log('nav Param value ', this.navParams);
    this.oldValue = this.navParams.data.passValue;
  }

  dismissPopOver() {
    this.popCtrl.dismiss(this.newValue);
  }

  cancelPopOver() {
    this.popCtrl.dismiss();
  }
}
