import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
userName: string;
password: string;
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login() {
    try {
   const res = await this.afAuth.auth.signInWithEmailAndPassword(this.userName + '@gmail.com', this.password);
   console.log('printing successfull login res ', res);
   if(res && res.user.uid) {
     
   }
    } catch (error) {
      console.dir(error);
    }
  }
}
