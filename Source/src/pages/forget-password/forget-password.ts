import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AppBase } from '../../app/app.base';
import { MemberApi } from '../../providers/member.api';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
  providers:[MemberApi]
})
export class ForgetPasswordPage extends AppBase {

  mobile = "";
  password = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams,public memberapi:MemberApi) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);

    this.needlogin=false;
  }

  onMyShow() {


  }

  next() {
    if (this.mobile.length != 11) {
      this.toast(this.Lang["pleasesetmobile"]);
      return;
    }
    if (this.password.length < 6) {
      this.toast(this.Lang["pleasesetpassword"]);
      return;
    }
    this.memberapi.checkcanreg({ mobile: this.mobile }).then((ret) => {
      if (ret.code == "1") {

        this.modal("VerifyCodePage", { mobile: this.mobile, type: "reset" }, (
          ret
        ) => {
          if (ret != undefined) {
            if (ret.verifyed == "Y") {
              this.memberapi.resetpassword({ mobile: this.mobile, password: this.password }).then((ret) => {
                if (ret.code == "0") {
                  this.close();
                } else {
                  this.alert(ret.result);
                }
              });
            }
          }
        });

      }else{
          this.alert(this.Lang["mobilehasnotbeenregistered"]);
      }
    });
  }
}