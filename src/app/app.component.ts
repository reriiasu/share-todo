import { LicensesPage } from '@/app/pages/public/licenses/licenses.page';
import { environment } from '@/environments/environment';
import { Component, NgZone } from '@angular/core';
import { Auth } from '@aws-amplify/auth';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import {
  AlertController,
  MenuController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  /** viewBind */
  bindData = {
    /** サインイン済み判定 */
    isSignedIn: false,
    /** 現在の言語 */
    currentLang: environment.defaultLang,
  };

  constructor(
    private navCtrl: NavController,
    private ngZone: NgZone,
    private modalController: ModalController,
    private alertController: AlertController,
    private menuController: MenuController,
    private translate: TranslateService
  ) {
    const lang = localStorage.getItem('lang');
    if (lang !== null) {
      this.bindData.currentLang = lang;
      this.translate.use(lang);
    }

    onAuthUIStateChange((authState: AuthState) => {
      this.ngZone.run(() => {
        switch (authState) {
          case AuthState.SignedIn:
            this.bindData.isSignedIn = true;
            this.navCtrl.navigateForward(['/todo']);
            break;
          case AuthState.SignIn:
            this.bindData.isSignedIn = false;
            this.navCtrl.navigateForward(['/auth']);
            break;
          case AuthState.SignOut:
            this.bindData.isSignedIn = false;
            this.navCtrl.navigateForward(['/auth']);
            break;
        }
      });
    });
  }

  /**
   * 言語クリック時
   */
  public async onClickLanguage(): Promise<void> {
    // メニューを閉じる
    await this.menuController.close();
    const alert = await this.alertController.create({
      header: this.translate.instant('label.selectLanguage'),
      inputs: environment.languages.map((value) => ({
        type: 'radio',
        label: value.label,
        value: value.lang,
        checked: value.lang === this.bindData.currentLang,
      })),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Ok',
          handler: (selectLang: string) => {
            if (selectLang !== this.bindData.currentLang) {
              localStorage.setItem('lang', selectLang);
              this.bindData.currentLang = selectLang;
              this.translate.use(selectLang);
              location.reload();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  /**
   * Licensesクリック時
   */
  public async onClickLicenses(): Promise<void> {
    // メニューを閉じる
    await this.menuController.close();
    const modal = await this.modalController.create({
      component: LicensesPage,
    });
    await modal.present();
  }

  /**
   * サインアウトクリック時
   */
  public async onClickSignOut(): Promise<void> {
    await this.menuController.close();
    const alert = await this.alertController.create({
      header: '確認',
      message: `signOutしますか？`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'OK',
          handler: async () => {
            try {
              await Auth.signOut();
            } catch (error) {
              console.log('error signing out: ', error);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
