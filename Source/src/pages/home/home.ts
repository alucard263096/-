import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  extends AppBase {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);

  }
  

}