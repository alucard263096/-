import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { InstApi } from '../../providers/inst.api';
import { BookApi } from '../../providers/book.api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[BookApi]
})
export class HomePage  extends AppBase {
  indexbanner=[];
  catlist=[];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams,public instApi:InstApi,public bookApi:BookApi) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);

  }
  
  onMyShow(){
    this.instApi.indexbanner({}).then((indexbanner)=>{
      this.indexbanner=indexbanner;
    });
    this.bookApi.catlistfull({}).then((catlist)=>{
      this.catlist=catlist;
      this.gotoBook(6);
    });
  }


  goCategory(id){
    this.modal("CategoryPage",{id:id});
  }
  
  search(){
    this.modal("SearchPage",{});
  }


}