import { Component, ViewChild } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ModalController, ViewController, ToastController,
  AlertController, MenuController, FabContainer
} from 'ionic-angular';
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
  @ViewChild(Content) fab: FabContainer;

  showduan=false;
  showmy = false;
  showcomment = false;
  isloading = false;
  book = {};
  jie = { name: "", pian_name: "" };
  julist = [];
  jielist = [];

  menus = [];

  lastjie = null;
  nextjie = null;

  fontsize = "";

  m1 = "translate";
  m2 = "hotcomment";

  nowju = { name: "", jie_id: "", id: "", trans: "" };
  nowtrans = "";

  jugucomment = [];
  juhotcomment = [];
  jucomment = [];
  jumycomment = [];

  jiecommentlist=[];

  contenttype="G";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams, public bookApi: BookApi, public menuCtl: MenuController) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);
  }

  onMyLoad() {
    var fontsize = this.store("fontsize");
    if (fontsize == null) {
      fontsize = "h5";
      this.store("fontsize", fontsize);
    }
    //alert(fontsize);
    this.fontsize = fontsize;
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

  loadjucomment() {
    if (this.showcomment == true&&this.nowju.id!="") {
      var ju_id = this.nowju.id;
      this.bookApi.commentlist({ type: "G", ju_id: ju_id }).then((commentlist) => {
        this.jugucomment = commentlist;
      });
      this.bookApi.commentlist({ type: "C", ju_id: ju_id }).then((commentlist) => {
        this.jucomment = commentlist;
      });
      this.bookApi.commentlist({ type: "C", orderby: "commentcount desc limit 0,3", ju_id: ju_id }).then((commentlist) => {
        this.juhotcomment = commentlist;
      });
      this.bookApi.commentlist({ type: "C",member_id:this.MemberInfo.id, ju_id: ju_id }).then((commentlist) => {
        this.jumycomment = commentlist;
      });
    }
  }

  loadju() {
    this.bookApi.jie({ id: this.options.jie_id }).then((jie) => {
      this.jie = jie;
    });
    this.bookApi.readjie({ book_id: this.options.book_id, jie_id: this.options.jie_id });

    this.bookApi.commentlist({  ju_id: -1,jie_id:this.options.jie_id }).then((commentlist) => {
      this.jiecommentlist = commentlist;
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
      this.findfirstnocomment();
      console.log(this.nowju);
    });

  }

  findfirstnocomment() {
    var lastsend = { name: "", jie_id: "", id: "", trans: "" };
    for (var i = 0; i < this.julist.length; i++) {
      for (var j = 0; j < this.julist[i].length; j++) {

        if (this.julist[i][j].isbr_value == 'N') {
          if (this.julist[i][j].trans == '') {
            this.nowju = this.julist[i][j];
            this.nowtrans = this.nowju.trans;
            this.loadjucomment();
            return;
          }
          lastsend = this.julist[i][j];
        }
      }
    }
    this.nowju = lastsend;
    this.nowtrans = this.nowju.trans;
    this.loadjucomment();
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


  setFontsize(fontsize) {
    this.fontsize = fontsize;
    this.store("fontsize", fontsize);
  }
  closefab(event, fab: FabContainer) {
    fab.close();
  }

  showFontSetting() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: this.Lang["fontsize_s"],
      value: 'h5',
      checked: this.fontsize == "h5"
    });
    alert.addInput({
      type: 'radio',
      label: this.Lang["fontsize_m"],
      value: 'h4',
      checked: this.fontsize == "h4"
    });
    alert.addInput({
      type: 'radio',
      label: this.Lang["fontsize_l"],
      value: 'h3',
      checked: this.fontsize == "h3"
    });

    alert.addButton(this.Lang["cancel"]);
    alert.addButton({
      text: this.Lang["ok"],
      handler: data => {

        this.setFontsize(data);
      }
    });
    alert.present();
  }
  updateTrans() {
    this.nowju.trans = this.nowtrans.trim();
    this.bookApi.trans({ jie_id: this.nowju.jie_id, ju_id: this.nowju.id, content: this.nowju.trans });
    //this.toast(this.Lang["savesuccess"]);
    for (var i = 0; i < this.julist.length; i++) {
      for (var j = 0; j < this.julist[i].length; j++) {
        if (this.julist[i][j].id == this.nowju.id) {
          this.julist[i][j] = this.nowju;
          break;
        }
      }
    }
  }

  toggoleContentType(){
    this.contenttype=this.contenttype=="G"?"N":"G";
  }

  lastsent() {
    var last = null;
    for (var i = 0; i < this.julist.length; i++) {
      for (var j = 0; j < this.julist[i].length; j++) {
        if (this.julist[i][j].isbr_value == 'N') {
          if (this.julist[i][j].id == this.nowju.id) {

            if (last == null) {
              this.toast(this.Lang["thisisfirst"]);
            } else {

              this.nowju = last;
              this.nowtrans = this.nowju.trans;
              this.loadjucomment();
            }
            return;
          }
          last = this.julist[i][j];
        }
      }
    }
  }
  nextsent() {
    var next = false;
    for (var i = 0; i < this.julist.length; i++) {
      for (var j = 0; j < this.julist[i].length; j++) {
        if (this.julist[i][j].isbr_value == 'N') {
          if (next == true) {
            this.nowju = this.julist[i][j];
            this.nowtrans = this.nowju.trans;
            this.loadjucomment();
            return;
          }
          if (this.julist[i][j].id == this.nowju.id) {
            next = true;
          }
        }
      }
    }
    this.toast(this.Lang["thisislast"]);
  }
  duan(){
    this.showmy=false;
    this.showcomment=false;
    this.showduan=!this.showduan;
  }
  ping(){
    this.showduan=false;
    this.showmy=false;
    this.showcomment=!this.showcomment;
  }
  yi(){
    this.showduan=false;
    this.showcomment=false;
    this.showmy=!this.showmy;
  }
  //
}

