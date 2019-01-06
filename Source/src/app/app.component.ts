import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AppBase } from './app.base';
import { InstApi } from '../providers/inst.api';
import { MemberApi } from '../providers/member.api';
import { DBMgr } from './app.dbmgr';
import { SQLite } from '@ionic-native/sqlite';
import { HTTP } from '@ionic-native/http';

@Component({
  templateUrl: 'app.html',
  providers:[InstApi,MemberApi]
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen
    , public instapi: InstApi, public memberapi: MemberApi, sqlite: SQLite, http: HTTP) {

      AppBase.instapi = instapi;
      AppBase.memberapi = memberapi;
      
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      splashScreen.hide();
      



      var dbmgr: DBMgr = DBMgr.GetInstance();
      dbmgr.Init(http,sqlite);
    });
  }
}
