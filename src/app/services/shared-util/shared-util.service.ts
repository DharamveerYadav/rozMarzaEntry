import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedUtilService {
  constructor(private alertCtrl: AlertController) {}

  async createAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
