import { Component, ViewChild } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, Nav } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';

// Adding Interface
export interface PageInterface{
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {

  // Adding code for tabs
  rootPage="TabsPage";
  @ViewChild(Nav) nav: Nav;

  // Pages available
  pages: PageInterface[] = [
    { title: "Home", pageName: "TabsPage", tabComponent: "HomePage", index: 0, icon: "home" },
    { title: "List", pageName: "TabsPage", tabComponent: "listPage", index: 1, icon: "list" },
    { title: "About", pageName: "TabsPage", tabComponent: "AboutPage", index: 2, icon: "disc" },
    { title: "Contact", pageName: "TabsPage", tabComponent: "ContactPage", index: 3, icon: "mail" },
    { title: "Special", pageName: "SpecialPage", icon: "star" }
  ]

  constructor(private fire: AngularFireAuth, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  
  }

  // Opening a new page
  openPage(page: PageInterface){
    let params = {};

    if (page.index){
      params = {tabIndex: page.index};
    }

    if (this.nav.getActiveChildNav() && page.index != undefined){
      this.nav.getActiveChildNav().select(page.index);
    }else{
      this.nav.setRoot(page.pageName, params);
    }

  }

  // Checking if the page we want is active (showing)
  // or not 
  isActive(page: PageInterface){
    let childNav = this.nav.getActiveChildNav();

    if (childNav){
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent){
        return "primary";
      }

      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.pageName){
      return "primary";
    }
  }

  // Log out function -- not working!
  logoutClicked(){
    this.fire.auth.signOut()
    .then(data => {
      // user is logged out
      // we set login as root
      this.nav.setRoot('LoginPage');
    })
    .catch(error => {
      // there has been an error, so we show it
      this.showError(error);
    })
  }

  // Pop-up in case of error
  showError(text) { 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });

    alert.present();
  }

}