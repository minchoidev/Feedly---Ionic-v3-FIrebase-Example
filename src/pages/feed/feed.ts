import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase, { firestore } from 'firebase'

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  text: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  post() {
    //Collections are simply containers for similar documents. Each document contains data in the form of key-value pairs.
    firebase.firestore().collection("posts").add({
      text: this.text,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: firebase.auth().currentUser.uid,
      owner_name: firebase.auth().currentUser.displayName
    }).then((doc) => {
      console.log(doc);
    }).catch((err) => {
      console.log(err);
    })
  }

}
