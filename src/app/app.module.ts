import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { FeedPage } from '../pages/feed/feed';

import firebase from 'firebase'


var firebaseConfig = {
  apiKey: "AIzaSyCllJtxh1OqQ3OSK5EmChw9Dm4YjCWhvCY",
  authDomain: "feedlyapp-77c3f.firebaseapp.com",
  databaseURL: "https://feedlyapp-77c3f.firebaseio.com",
  projectId: "feedlyapp-77c3f",
  storageBucket: "feedlyapp-77c3f.appspot.com",
  messagingSenderId: "152645907721",
  appId: "1:152645907721:web:eb53cf263059288be84fd8",
  measurementId: "G-QQHYMDZHSW"
};

firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    FeedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    FeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
