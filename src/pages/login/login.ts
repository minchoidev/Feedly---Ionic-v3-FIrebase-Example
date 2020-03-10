import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular'; // ToastController is to show a Toast message at the bottom of the app as a feedback message
import { SignupPage } from '../signup/signup';
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }
  
  login() {
    
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then((user) => {
      console.log(user)

      this.toastCtrl.create({
        message: "Welcome " + user.user.displayName,
        duration: 3000
      }).present();

    }).catch((err) => {
      console.log(err)
      this.toastCtrl.create({
        message: err.message,
        duration: 3000
      }).present();
    })

  }

  gotoSignup() {
    this.navCtrl.push(SignupPage);
  }

}
