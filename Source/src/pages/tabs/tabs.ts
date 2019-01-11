import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AppBase } from '../../app/app.base';
import { SheetPage } from '../sheet/sheet';
import { TopicPage } from '../topic/topic';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SheetPage;
  tab3Root = TopicPage;
  tab4Root = ContactPage;

  Lang=[];

  constructor() {

  }

  ionViewDidLoad(){
    AppBase.Tabs=this;
  }
  
}
