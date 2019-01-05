import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController, MenuController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { BookApi } from '../../providers/book.api';
import { Content } from 'ionic-angular';
import { ReturnStatement } from '@angular/compiler';

/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
  providers: [BookApi]
})
export class BookPage extends AppBase {
  @ViewChild(Content) ctx: Content;
  isloading = false;
  book = {};
  jie = { name: "", pian_name: "" };
  julist = [];
  jielist = [];

  menus=[];

  lastjie = null;
  nextjie = null;

  fontsize="";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams, public bookApi: BookApi, public menuCtl: MenuController) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);

  }

  onMyLoad(){
    var fontsize=this.store("fontsize");
    if(fontsize==null){
      fontsize="h5";
      this.store("fontsize",fontsize);
    }
    this.fontsize=fontsize;
  }

  onMyShow() {
    this.bookApi.book({ id: this.options.book_id }).then((book) => {
      this.book = book;
    });



    this.loadju();
    this.bookApi.index({ book_id: this.options.book_id }).then((pianlist) => {
      var jielist = [];
      for (let pian of pianlist) {
        for (let jie of pian.jielist) {
          jielist.push(jie);
        }
      }

      this.jielist = jielist;
      this.loadlastnext();
    });
  }

  loadju() {
    this.bookApi.jie({ id: this.options.jie_id }).then((jie) => {
      this.jie = jie;
    });
    this.isloading = true;
    this.bookApi.content({ jie_id: this.options.jie_id }).then((julist) => {
      var duanluo = [];
      var d = 0;
      for (let ju of julist) {
        if (duanluo.length <= d) {
          duanluo.push([]);
        }
        if (ju.isbr_value == 'Y') {
          d++;
        } else {
          duanluo[d].push(ju);
        }
      }

      console.log(duanluo);
      this.julist = duanluo;
      if (this.jielist.length > 0) {
        this.loadlastnext();
      }
      this.ctx.scrollToTop();
      this.isloading = false;
    });
  }
  loadlastnext() {
    this.lastjie = null;
    this.nextjie = null;
    var jielist = this.jielist;
    for (var i = 0; i < jielist.length; i++) {
      if (jielist[i].id == this.options.jie_id) {
        if (i > 0) {
          this.lastjie = jielist[i - 1];
        }
        if (i < jielist.length - 1) {
          this.nextjie = jielist[i + 1];
        }

      }
    }
  }

  swipeEvent(e) {
    console.log(e);
    if (e.direction == 4) {
      this.previous();
    } else if (e.direction == 2) {
      this.next();
    }
  }

  previous() {
    if (this.lastjie == null) {
      this.toast(this.Lang["nolastjie"]);
      return;
    }
    if (this.isloading == true) {
      return;
    }
    this.options.jie_id = this.lastjie.id;
    this.loadju();
  }

  next() {
    if (this.nextjie == null) {
      this.toast(this.Lang["nonextjie"]);
      return;
    }
    if (this.isloading == true) {
      return;
    }
    this.options.jie_id = this.nextjie.id;
    this.loadju();
  }

  onPullRefresh(ref) {
    this.previous();
    ref.complete();
  }
  onLoadMoreRefresh(ref) {
    this.next();
    ref.complete();
  }

  toggoleMenu() {
    this.menuCtl.toggle();
  }

  setFontsize(fontsize){
    fontsize=fontsize;
    if(fontsize==null){
      fontsize="h5";
      this.store("fontsize",fontsize);
    }
    this.fontsize=fontsize;
  }

}

