import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedUtilService } from 'src/app/services/shared-util/shared-util.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss']
})
export class RegistrationPage implements OnInit {
  userName: string;
  password: string;
  cpassword: string;
  constructor(
    public afAuth: AngularFireAuth,
    private agFirestore: AngularFirestore,
    private sharedUtil: SharedUtilService
  ) {}

  ngOnInit() {}

  async signUp() {
    if (this.password != this.cpassword) {
      this.sharedUtil.createAlert('Password and confirm passsword does not match !!!');
      return;
    }
    const { userName } = this;
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.userName + '@gmail.com', this.password);
      console.log('printing successfull res ', res);
      if (res && res.user.uid) {
        this.agFirestore.doc(`users/${res.user.uid}`).set({
          userName
        });
        this.sharedUtil.createAlert('User Registered Successfully !!!');
      }
    } catch (error) {
      if (error.code == 'auth/weak-password') {
        this.sharedUtil.createAlert('Password is weak !!!');
      } else if (error.code == 'auth/invalid-email') {
        this.sharedUtil.createAlert('Enter valid user name !!!');
      } else {
        this.sharedUtil.createAlert('Server error occurred, try again later !!!');
      }
      console.dir(error);
    }
  }
}
