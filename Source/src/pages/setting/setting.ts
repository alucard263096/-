import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage  extends AppBase {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);
    this.needlogin=false;

  }
  logout(){
    this.confirm(this.Lang["suretologout"],
    (ret)=>{
      if(ret==true){
        window.localStorage.removeItem("token");
        this.modal("LoginPage",{});
      }
    });
  }

}
