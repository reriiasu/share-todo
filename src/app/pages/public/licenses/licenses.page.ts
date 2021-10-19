import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { licenseConst } from '@/app/shared/const/license.const';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.page.html',
  styleUrls: ['./licenses.page.scss'],
})
export class LicensesPage implements OnInit {
  @Input() modal!: ModalController;
  public readonly licenses = licenseConst;
  constructor(private iab: InAppBrowser) {}

  ngOnInit() {}

  /**
   * 閉じるクリック時
   *
   * @description modalを終了
   */
  public onClickClose() {
    if (this.modal === undefined) {
      return;
    }
    this.modal.dismiss();
  }

  /**
   * URLクリック時
   *
   * @description 該当URLを開く
   * @param url URL
   */
  public onClickUrl(url: string) {
    this.iab.create(url, '_system');
  }
}
