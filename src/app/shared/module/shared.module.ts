import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';

import { Amplify } from 'aws-amplify';
import awsconfig from '@/aws-exports';

Amplify.configure(awsconfig);

const modules = [
  FormsModule,
  IonicModule,
  CommonModule,
  AmplifyUIAngularModule,
  MatExpansionModule,
  TranslateModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [InAppBrowser],
})
export class SharedModule {}
