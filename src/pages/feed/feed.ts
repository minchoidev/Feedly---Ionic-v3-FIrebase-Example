import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase'
import moment from 'moment';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  text: string = "";
  posts: any[] = [];
  pageSize: number = 10;  // the number of posts that we get from firebase
  cursor: any;  // it holds the value of the current post

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getPosts();
  }

  getPosts() {

    this.posts = [];

    firebase.firestore().collection("posts").orderBy("created", "desc")
    .limit(this.pageSize).get()         // if you don't use limit function, it will load all of the posts
      .then((docs) => {

        docs.forEach((doc) => {
          this.posts.push(doc);
        })

        this.cursor = this.posts[this.posts.length - 1];  // update the cursor

        console.log(this.posts);

      }).catch((err) => {
        console.log(err);
      })
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
      this.getPosts();
    }).catch((err) => {
      console.log(err);
    })
  }

  loadMorePosts(event) {

    firebase.firestore().collection("posts").orderBy("created", "desc").startAfter(this.cursor)
    .limit(this.pageSize).get()         // if you don't use limit function, it will load all of the posts
      .then((docs) => {

        docs.forEach((doc) => {
          this.posts.push(doc);
        })

        console.log(this.posts);

        // it's been commented out to prevent not loading posts more after the scroll event is disabled once.

        // if(docs.size < this.pageSize) {
        //   // all documents have been loaded
        //   // disable the scroll
        //   event.enable(false);
        // } else {
        //   event.complete(); // to tell the scroll that the loading is complete
        //   this.cursor = this.posts[this.posts.length - 1];
        // }

        // to tell the scroll that the loading is complete
        // if not complete the event, th event won't end
        event.complete(); 
        this.cursor = this.posts[this.posts.length - 1];

      }).catch((err) => {
        console.log(err);
      })
  }

  ago(time) {
    let difference = moment(time).diff(moment()); // time difference with time and the current time
    return moment.duration(difference).humanize();  // return the human-readable time form
  }

}
