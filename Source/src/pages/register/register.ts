import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { registerLocaleData } from '@angular/common';
import { MemberApi } from '../../providers/member.api';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [MemberApi]
})
export class RegisterPage extends AppBase {
  name="";
  mobile = "";
  password = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams, public memberapi: MemberApi) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);
    this.needlogin=false;

  }

  onMyShow() {


  }

  next() {
    if (this.name.trim() == "") {
      this.toast(this.Lang["pleasesetname"]);
      return;
    }
    if (this.mobile.trim().length != 11) {
      this.toast(this.Lang["pleasesetmobile"]);
      return;
    }
    if (this.password.length < 6) {
      this.toast(this.Lang["pleasesetpassword"]);
      return;
    }
    this.memberapi.checkcanreg({ mobile: this.mobile }).then((ret) => {
      if (ret.code == "0") {

        this.modal("VerifyCodePage", { mobile: this.mobile, type: "register" }, (
          ret
        ) => {
          if (ret != undefined) {
            if (ret.verifyed == "Y") {
              this.memberapi.register({name:this.name, mobile: this.mobile, password: this.password }).then((ret) => {
                if (ret.code == "0") {

                  this.store("token", ret.return);
                  this.return({ reged: "Y" });
                } else {
                  this.alert(ret.result);
                }
              });
            }
          }
        });

      }else{
        if(ret.code=="1"){
          this.alert(this.Lang["mobilehasbeenregistered"]);
        }
      }
    });
  }

}
