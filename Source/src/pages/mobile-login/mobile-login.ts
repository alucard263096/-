import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { MemberApi } from '../../providers/member.api';

/**
 * Generated class for the MobileLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mobile-login',
  templateUrl: 'mobile-login.html',
  providers:[MemberApi]
})
export class MobileLoginPage extends AppBase {

  mobile = "";
  password = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public alertCtrl:AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams,public memberapi:MemberApi) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl,alertCtrl, navParam);
    this.needlogin=false;

  }

  onMyShow(){
    var mobile=this.store("lastloginmobile");
    if(mobile!=null){
      this.mobile=mobile;
    }

  }
  login(){
    this.memberapi.login({mobile:this.mobile,password:this.password}).then((ret)=>{
      if(ret.code=="0"){
        
        this.store("lastloginmobile",this.mobile);
        this.store("token",ret.return);
        this.return({ logined: "Y" });
      }else{
        this.alert(this.Lang["userorpwsincorrect"])
      }
    });
  }
  gotoForget(){
    this.modal("ForgetPasswordPage",{});
  }
}
