import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AppBase } from '../../app/app.base';
import { ContentApi } from '../../providers/content.api';

/**
 * Generated class for the ContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
  providers:[ContentApi]
})
export class ContentPage extends AppBase {

  title = "";
  key = "";
  cont="";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams,public contentapi:ContentApi) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);
    this.needlogin=false;
      this.title=navParam.get("title");
      this.key=navParam.get("key");
  }

  onMyShow(){
    this.contentapi.get({keycode:this.key}).then((ret)=>{
      if(ret!=null){
        this.cont=this.util.HtmlDecode( ret.content);
      }else{
        this.cont="noreturn";
      }
    });
  }


}
