import { amplifyVocabularies } from '@/app/shared/const/amplify.vocabularies.const';
import { Component, OnInit } from '@angular/core';
import { FormFieldTypes } from '@aws-amplify/ui-components';
import { I18n } from 'aws-amplify';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  /** サインアップフィールド定義 */
  signUpformFields: FormFieldTypes = [
    { type: 'username' },
    { type: 'password' },
    { type: 'email' },
  ];

  selectedLang = 'en';

  constructor() {
    const lang = localStorage.getItem('lang');
    if (lang === null) {
      return;
    }
    I18n.putVocabularies(amplifyVocabularies);
    I18n.setLanguage(lang);
    this.selectedLang = lang;
  }

  ngOnInit() {}
}
