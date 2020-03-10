import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(public navCtrl: NavController) {

  }
  
  login() {
    console.log("login trial");
    
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then((user) => {
      debugger;
      console.log("user: ")
      console.log(user)
    }).catch((err) => {
      debugger;
      console.log(err)
    })

  }

  gotoSignup() {
    this.navCtrl.push(SignupPage);
  }

}
