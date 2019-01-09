import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends AppBase {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public alertCtrl:AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl,alertCtrl, navParam);
      this.needlogin=false;
  }

  onMyShow(){


  }
  gotoRegister(){
    this.modal("RegisterPage",{},(ret)=>{
      if(ret!=undefined){
        if(ret.reged=="Y"){
          this.close();
        }
      }
    });
  }

  gotoLogin(){
    this.modal("MobileLoginPage",{},(ret)=>{
      if(ret!=undefined){
        if(ret.logined=="Y"){
          this.close();
        }
      }
    });
  }
}
