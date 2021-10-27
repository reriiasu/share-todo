import { Todo } from '@/app/API.service';
import { Mode, todoPageConst } from '@/app/shared/const/todo.page.const';
import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AlertOptions } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Keyboard } from '@ionic-native/keyboard';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export type Content = {
  complete: boolean;
  content: string;
};

export type Comment = {
  commentType: string;
  freeComment: '';
  contentList: Content[];
};

@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.page.html',
  styleUrls: ['./todo-manage.page.scss'],
})
export class TodoManagePage implements OnInit, OnDestroy {
  // @ViewChild('ionList') ionList: HTMLIonListElement | undefined;
  @Input() todo!: Todo;
  @Input() mode!: Mode;
  @Input() modal!: ModalController;

  /** viewBind */
  bindData = {
    /** タイトル */
    headerTitle: '',
    /** ViewMode判定 */
    isViewMode: false,
    /** 最小年 */
    minYear: todoPageConst.minYear,
    /** 最大年 */
    maxYear: new Date().getFullYear() + 1,
    /** キーボード表示判定 */
    isShowKeybord: false,
    /** 削除判定 */
    isDelete: false,
    /** コメント */
    comment: {
      commentType: todoPageConst.format.free,
      freeComment: '',
      contentList: [],
    } as Comment,
    /** モード */
    mode: todoPageConst.mode.view as Mode,
    /** Todo */
    todo: {} as Todo,
  };

  private keyboardEventSubscription = new Subscription();

  constructor(
    private alertController: AlertController,
    private translateService: TranslateService,
    private iab: InAppBrowser,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.bindData.mode = this.mode;
    this.bindData.todo = { ...this.todo };
    this.bindData.isDelete = this.bindData.todo.status === 1 ? true : false;
    this.initComment();
    this.setMode();
    this.addEventListener();
  }

  ngOnDestroy() {
    this.keyboardEventSubscription.unsubscribe();
  }

  /**
   * コメント追加クリック時
   */
  onClickAddComment() {
    this.bindData.comment.contentList.push({
      complete: false,
      content: '',
    });
  }

  /**
   * コメント削除クリック時
   */
  onClickRemoveComment(index: number) {
    this.bindData.comment.contentList.splice(index, 1);
  }

  /**
   * クローズクリック時
   */
  public onClickClose() {
    this.modal.dismiss();
  }

  /**
   * OKクリック時
   */
  public onClickOk() {
    if (!this.isTodoValidate()) {
      return;
    }
    this.bindData.todo.comment = JSON.stringify(this.bindData.comment);
    // フリーの場合は、繰り越しなし
    if (this.bindData.comment.commentType === todoPageConst.format.free) {
      this.bindData.todo.carryOver = false;
    }
    this.bindData.todo.status = Number(this.bindData.isDelete);
    this.modal.dismiss(this.bindData.todo);
  }

  /**
   * キャンセルクリック時
   */
  public onClickCancel() {
    this.modal.dismiss();
  }

  /**
   * 編集クリック時
   */
  public onClickEdit() {
    this.bindData.isViewMode = false;
    this.bindData.mode = todoPageConst.mode.edit;
    this.setMode();
  }

  /**
   * OpenLinkクリック時
   */
  public onClickOpenLink() {
    this.iab.create(this.bindData.todo.url, '_system');
  }

  /**
   * 追跡キー
   */
  public myTrackBy(index: number): number {
    return index;
  }

  private addEventListener() {
    this.keyboardEventSubscription.add(
      Keyboard.onKeyboardWillHide().subscribe(() => {
        // 外部で発生したイベントのため
        this.ngZone.run(() => {
          this.bindData.isShowKeybord = false;
        });
      })
    );
    this.keyboardEventSubscription.add(
      Keyboard.onKeyboardWillShow().subscribe(() => {
        // 外部で発生したイベントのため
        this.ngZone.run(() => {
          this.bindData.isShowKeybord = true;
        });
      })
    );
  }

  /**
   * コメント初期化
   */
  private initComment() {
    try {
      const comment = JSON.parse(this.bindData.todo.comment);
      this.bindData.comment = {
        commentType: comment.commentType,
        freeComment: comment.freeComment,
        contentList: comment.contentList,
      };
    } catch {
      this.bindData.comment = {
        commentType: todoPageConst.format.free,
        freeComment: '',
        contentList: [],
      };
    }
  }

  /**
   * Todoの検証
   */
  private isTodoValidate(): boolean {
    if (this.bindData.todo.title === '') {
      this.showAlert({
        header: 'label.inputError',
        message: 'error.titleRequired',
      });
      return false;
    }
    if (this.bindData.todo.targetAt === '') {
      this.showAlert({
        header: 'label.inputError',
        message: 'error.expiredRequired',
      });
      return false;
    }
    if (
      this.bindData.todo.url !== '' &&
      this.isInvalidURL(this.bindData.todo.url)
    ) {
      this.showAlert({
        header: 'label.inputError',
        message: 'error.invalidUrl',
      });
      return false;
    }
    return true;
  }

  /**
   * モード設定
   */
  private setMode() {
    switch (this.bindData.mode) {
      case todoPageConst.mode.view:
        this.bindData.headerTitle = this.translateService.instant(
          'label.confirmationTodo'
        );
        this.bindData.isViewMode = true;
        break;
      case todoPageConst.mode.create:
        this.bindData.headerTitle = this.translateService.instant(
          'label.createNewTodo'
        );
        break;
      case todoPageConst.mode.edit:
        this.bindData.headerTitle =
          this.translateService.instant('label.editTodo');
        break;
      default:
        const mode: never = this.bindData.mode;
    }
  }

  /**
   * 無効なURL判定
   *
   * @param チェック文字列
   * @returns true 無効なURL false:有効なURL
   */
  private isInvalidURL(checkStr: string): boolean {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return !pattern.test(checkStr);
  }

  /**
   * アラート表示
   *
   * @param options アラートオプション
   */
  private async showAlert(options: AlertOptions) {
    const header = options.header === undefined ? '' : options.header;
    const message = options.message === undefined ? '' : options.message;
    if (typeof message === 'string') {
      const alert = await this.alertController.create({
        header: this.translateService.instant(header),
        message: this.translateService.instant(message),
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
  }
}
