import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';

// Angular firebase database imports
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';  

const firebaseConfig = {
  apiKey: "AIzaSyBdrdDGqWQ9ka93hQ2yTflMWfi6Cs2ivhA",
  authDomain: "todolist-4ec12.firebaseapp.com",
  databaseURL: "https://todolist-4ec12.firebaseio.com",
  projectId: "todolist-4ec12",
  storageBucket: "todolist-4ec12.appspot.com",
  messagingSenderId: "260473751506"
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}
