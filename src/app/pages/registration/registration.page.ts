import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
userName: string;
password: string;
cpassword: string;
  constructor(public afAuth: AngularFireAuth, private agFirestore: AngularFirestore) { }

  ngOnInit() {
  }

  async signUp() {
    const { userName} = this;
    try {
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.userName + '@gmail.com', this.password);
    console.log('printing successfull res ', res);
    if (res && res.user.uid) {
      this.agFirestore.doc(`users/${res.user.uid}`).set({
        userName
      });
    }
    } catch (error) {
      console.dir( error);
    }
  }

}
