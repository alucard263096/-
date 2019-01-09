import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentPage } from './comment';
import { AutosizeDirective } from '../../directives/autosize/autosize';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CommentPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentPage),
  ],
})
export class CommentPageModule {}
