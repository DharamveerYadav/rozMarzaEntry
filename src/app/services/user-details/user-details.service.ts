import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
private user: string;
private uid: string;
  constructor() { }

  setUser(user) {
    this.user = user;
  }

  setUId(uid: string){
    this.uid = uid;
  }

  getUId() {
    return this.uid;
  }
}
