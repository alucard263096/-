import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { AliyunApi } from '../../providers/aliyun.api';

/**
 * Generated class for the VerifyCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-code',
  templateUrl: 'verify-code.html',
  providers:[AliyunApi]
})
export class VerifyCodePage extends AppBase {
  @ViewChild('ic1') inputc1:ElementRef ;
  @ViewChild('ic2') inputc2:ElementRef ;
  @ViewChild('ic3') inputc3:ElementRef ;
  @ViewChild('ic4') inputc4:ElementRef ;

  mobile="";
  type="";
  c1="";
  c2="";
  c3="";
  c4="";

  resendSecond=60;
  reminder=0;

  timer=null;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public alertCtrl:AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams,public aliyunApi:AliyunApi) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl,alertCtrl, navParam);
    this.needlogin=false;

  }

  onMyLoad(){
    this.mobile=this.navParam.get("mobile");
    this.type=this.navParam.get("type");
    //this.mobile="13751082562";
    //this.type="register";

    this.sendCode();
    this.timer=setInterval(()=>{
      if(this.reminder>0){
        this.reminder--;
      }
    },1000);

  }

  sendCode(){
    this.aliyunApi.sendverifycode({mobile:this.mobile,type:this.type},false)
    .then((ret)=>{
      if(ret.code==0){
        this.reminder=this.resendSecond;
        this.c1="";
        this.c2="";
        this.c3="";
        this.c4="";
        this.setFocus(1);
        this.toast(this.Lang["verifycodesent"]);
      }else{
        this.toast(this.Lang["verifycodesendfail"]);
      }
    });
  }

  onMyShow(){

    

  }

  verify(){
    var verifycode=this.c1+this.c2+this.c3+this.c4;
    this.aliyunApi.verifycode({mobile:this.mobile,verifycode,type:this.type})
    .then((ret)=>{
      this.c1="";
      this.c2="";
      this.c3="";
      this.c4="";
      if(ret.code==0){
        this.return({verifyed:"Y"});
      }else{
        this.toast(this.Lang["verifycodeincorrect"]);
      }
    });
  }


  setFocus(num){
    // if(num==1){
    //   this.inputc1.setFocus();
    // }
    // if(num==2){
    //   this.inputc2.setFocus();
    // }
    // if(num==3){
    //   this.inputc3.setFocus();
    // }
    // if(num==4){
    //   this.inputc4.setFocus();
    // }
  }
}

