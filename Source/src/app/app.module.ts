import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Directive } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from "@angular/http";

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InstApi } from '../providers/inst.api';
import { MemberApi } from '../providers/member.api';
import { SQLite } from '@ionic-native/sqlite';
import { HTTP } from '@ionic-native/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DirectivesModule } from '../directives/directives.module';
import { AutosizeDirective } from '../directives/autosize/autosize';




@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    DirectivesModule,
    IonicModule.forRoot(MyApp,{
      mode:"ios",
      backButtonText:"",
      iconMode:"ios",
      modalEnter:"modal-slide-in",
      modalLeave:"modal-slide-out",
      tabsPlacement:"bottom",
      pageTransition:"ios",
      backButtonIcon:"ios-arrow-back",
      statusbarPadding:false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    InstApi,
    MemberApi,
    StatusBar,
    SplashScreen,
    SQLite,
    HTTP,
    Camera,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
