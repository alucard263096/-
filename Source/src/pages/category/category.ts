import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { BookApi } from '../../providers/book.api';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  providers:[BookApi]
})
export class CategoryPage   extends AppBase {
  cat={name:"",icon:"",summary:""};
  list=[];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams,public bookapi:BookApi) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);

  }
  
  onMyShow(){
    this.bookapi.cat({id:this.options.id}).then((cat)=>{
      cat.summary=this.decode(cat.summary);
      this.cat=cat;
    });
    this.bookapi.list({cat_id:this.options.id}).then((list)=>{
      this.list=list;
    });
  }

}

