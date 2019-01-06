import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
import { AppBase } from '../../app/app.base';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { MemberApi } from '../../providers/member.api';
import { ApiConfig } from '../../app/api.config';

/**
 * Generated class for the MemberInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-info',
  templateUrl: 'member-info.html',
})
export class MemberInfoPage extends AppBase {

  oldname="";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public navParam: NavParams, public actionSheetCtrl: ActionSheetController,
    private camera: Camera, private transfer: FileTransfer, public memberapi: MemberApi) {

    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, alertCtrl, navParam);

  }

  onMyShow(){
    this.oldname=this.MemberInfo.name;
  }

  nameChange(){
    if(this.MemberInfo.name.trim()==""){
      this.MemberInfo.name=this.oldname;
    }
    this.memberapi.infoupdate({ name: this.MemberInfo.name });
  }
  introduceChange(){
    this.memberapi.infoupdate({ introduce: this.MemberInfo.introduce });
  }
  logout(){
    this.confirm(this.Lang["surechangeaccount"],(ret)=>{
      if(ret==true){
        window.localStorage.removeItem("token");
        this.close();
      }
    });
  }
  selectPhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.Lang["photoselect"],
      buttons: [
        {
          text: this.Lang["takephoto"],
          handler: () => {
            let options: CameraOptions = {
              quality: 75,
              targetWidth: 200,
              targetHeight: 200,
              allowEdit: true,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.CAMERA,
              encodingType: this.camera.EncodingType.JPEG
            };
            this.camera.getPicture(options).then((imagepath) => {
              this.uploadFile(this.transfer, imagepath, "member").then(photo => {
                
                this.memberapi.infoupdate({ photo: photo }, false).then(data => {
                  if (data.code == "0") {
                    this.MemberInfo.photo = String(photo);
                  }
                });
              });
            }, (err) => {
              // Handle error
            });
          }
        }, {
          text: this.Lang["takefromalbum"],
          handler: () => {
            let options: CameraOptions = {
              quality: 75,
              targetWidth: 200,
              targetHeight: 200,
              allowEdit: true,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            };

            this.camera.getPicture(options).then((imagepath) => {
              this.uploadFile(this.transfer, imagepath, "member").then(photo => {
                this.memberapi.infoupdate({ photo: photo }, false).then(data => {
                  if (data.code == "0") {
                    this.MemberInfo.photo = String(photo);
                  }
                });
              });
            }, (err) => {
              // Handle error
            });
          }
        }, {
          text: this.Lang["takerandom"],
          handler: () => {
            this.memberapi.randomphoto({}).then(data => {
              var photo = data.photo;
              this.memberapi.infoupdate({ photo: photo }, false).then(data => {
                if (data.code == "0") {
                  this.MemberInfo.photo = String(photo);
                }
              });
            });
          }
        }, {
          text: this.Lang["cancel"],
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}