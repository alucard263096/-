import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { BookApi } from '../../providers/book.api';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers:[BookApi]
})
export class SearchPage extends AppBase {

  list=[];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams,public bookapi:BookApi) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);

  }
  
  getItems(ev){
    console.log(ev);
    const val = ev.target.value;
    this.bookapi.list({keyword:val}).then((list)=>{
      this.list=list;
      if(list.length==0){
        //this.toast(this.Lang["nosearchresult"]);
      }
    });
  }
}
