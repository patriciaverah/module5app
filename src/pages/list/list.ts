import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase }  from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase'

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  arrData = [];
  newItem = ''; 

  constructor(public fbp: FirebaseProvider, private alertCtrl: AlertController, public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.fdb.list('/list/').subscribe(_data => {
      this.arrData = _data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  // Call to firebase.ts
  // Adding a new item to user's list
  addBtnClicked(){
    this.fbp.addItem(this.newItem);
  }

  // Asking the user for confirmation 
  // about the item removal
  presentConfirm(id){
    let alert = this.alertCtrl.create({
      title: 'Confirm removal',
      message: 'Do you want to remove this item completely?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // User does not want to remove item
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            // User wants to remove item
            console.log('Confirm removal');
            this.removeItem(id);
          }
        }
      ]
    });

    alert.present();
  }

  // Call to firebase.ts
  // Removing an existing item from user's list
  removeItem(id) {
    this.fbp.removeItem(id);
  }
}
