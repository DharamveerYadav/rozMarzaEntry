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
  isDeletableEntry: boolean;
  constructor(private popCtrl: PopoverController, private navParams: NavParams) {}

  ngOnInit() {
    console.log('nav Param value ', this.navParams);
    this.oldValue = this.navParams.data.passValue;
    if (this.navParams.data.deletable) {
      this.isDeletableEntry = true;
    }
  }

  dismissPopOver() {
    this.popCtrl.dismiss(this.newValue);
  }

  deletePopOver() {
    this.popCtrl.dismiss('delete');
  }

  cancelPopOver() {
    this.popCtrl.dismiss();
  }
}
