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
  infiniteEvent: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getPosts();
  }

  getPosts() {

    this.posts = [];

    let query = firebase.firestore().collection("posts").orderBy("created", "desc")
      .limit(this.pageSize);         // if you don't use limit function, it will load all of the posts

    // if there's any change in the loaded documents, then onSnapshot function will be executed
    // this function also receives a parameter which contains a snapshot 
    // and the snapshot object contains all the documents that have undergone some change.
    // It will be called everytime when some data is changed in the resultset including the initialization.

    // This way the data in that application can be updated as the data on our cloud Firestore updates.
    // So this is how you can get real time updates in your application from your cloud Firesotre.
    // However, we should only use this whenever required because it results in net for communication which can slow down your app if you used too much.
    query.onSnapshot((snapshot) => {
      let changeDocs = snapshot.docChanges();

      changeDocs.forEach((change) => {
        if (change.type == "added") {
          // TODO
          console.log("Document with id " + change.doc.id + " has been added.");
        }

        if (change.type == "modified") {
          // TODO
          console.log("Document with id " + change.doc.id + " has been modified.");
        }

        if (change.type == "removed") {
          // TODO
          console.log("Document with id " + change.doc.id + " has been removed.");
        }
      })
    })

    query.get()
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

        if (docs.size < this.pageSize) {
          // all documents have been loaded
          // disable the scroll
          event.enable(false);
          this.infiniteEvent = event;
        } else {
          event.complete(); // to tell the scroll that the loading is complete
          this.cursor = this.posts[this.posts.length - 1]; // if not complete the event, th event won't end        
        }

      }).catch((err) => {
        console.log(err);
      })
  }

  refresh(event) {

    this.getPosts();

    if (this.infiniteEvent) {
      this.infiniteEvent.enable(true);
    }
    event.complete();
  }

  ago(time) {
    if (time) {
      let difference = moment(time.toDate()).diff(moment()); // time difference with time and the current time
      return moment.duration(difference).humanize();  // return the human-readable time form
    }
    else {
      return "NULL";
    }
  }

}
