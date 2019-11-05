import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserDetailsService } from 'src/app/services/user-details/user-details.service';
import { SharedUtilService } from 'src/app/services/shared-util/shared-util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  userName: string;
  password: string;
  constructor(
    public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private storage: Storage,
    private userService: UserDetailsService,
    private sharedUtilService: SharedUtilService
  ) {}

  ngOnInit() {}

  async login() {
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.userName + '@gmail.com', this.password);
      console.log('printing successfull login res ', res);
      if (res && res.user.uid) {
        this.storage.set('userId', res.user.uid);
        this.userService.setUId(res.user.uid);
        this.navCtrl.navigateForward(['/milk-home']);
      }
    } catch (error) {
      this.sharedUtilService.createAlert('Invalid usesname/ passward!!!');
      console.dir(error);
    }
  }
}
