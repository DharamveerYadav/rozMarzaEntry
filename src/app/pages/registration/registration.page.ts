import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
userName: string;
password: string;
cpassword: string;
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async signUp() {
    try {
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.userName + '@gmail.com', this.password);
    console.log('printing successfull res ', res);
    } catch (error) {
      console.dir( error);
    }
  }

}
