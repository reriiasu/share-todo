import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TodoGroup, TodoService } from '@/app/shared/service/todo/todo.service';
import { CreateTodoInput, Todo, UpdateTodoInput } from '@/app/API.service';
import { Subscription, timer } from 'rxjs';
import { Auth } from '@aws-amplify/auth';
import { AlertOptions } from '@ionic/angular';
import { todoPageConst } from '@/app/shared/const/todo.page.const';
import { TodoManagePage } from '@/app/pages/private/todo/todo-manage/todo-manage.page';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.page.html',
  styleUrls: ['todo-list.page.scss'],
})
export class TodoListPage implements OnInit, OnDestroy {
  /** viewBind */
  bindData = {
    todoGroupList: new Array<TodoGroup>(),
  };

  private subscription = new Subscription();

  /** リフレッシュタイマー */
  private readonly refreshTimer = 2000;

  /** 初期加算日 */
  private readonly defaultAddDays = 3;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    public todoService: TodoService
  ) {
    this.addSubscription();
  }

  public addSubscription(): void {
    this.subscription.add(
      this.todoService
        .receiveTodoGroupList()
        .subscribe((value: Array<TodoGroup>) => {
          this.bindData.todoGroupList = value;
        })
    );
  }

  /*
   * 初期化
   */
  public ngOnInit(): void {
    this.todoService.getTodoList();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public myTrackBy(index: number): number {
    return index;
  }

  doRefresh(event: any) {
    this.todoService.getTodoList();
    const timer$ = timer(this.refreshTimer);
    timer$.subscribe(() => {
      event.target.complete();
    });
  }

  /**
   * 新規作成クリック時
   *
   * @returns
   */
  public async onClickCreateNew(): Promise<void> {
    const date = new Date();
    date.setDate(date.getDate() + this.defaultAddDays);
    const modal = await this.modalController.create({
      component: TodoManagePage,
      cssClass: 'todo-custom-class',
      componentProps: {
        mode: todoPageConst.mode.create,
        todo: {
          title: '',
          url: '',
          targetAt: date.toISOString(),
          carryOver: false,
        },
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (!data) {
      // キャンセルの場合
      return;
    }
    const user = await Auth.currentAuthenticatedUser();

    const createTodoInput: CreateTodoInput = { ...data };
    createTodoInput.updatedAt = new Date().toISOString();
    createTodoInput.createdAt = createTodoInput.updatedAt;
    createTodoInput.updatedUser = user.username;
    createTodoInput.status = 0;

    const isSuccess = await this.todoService.createTodo(createTodoInput);
    if (isSuccess) {
      return;
    }
    this.showAlert({ header: '失敗', message: '新規作成に失敗しました。' });
  }

  public async displayTodo(todo: Todo): Promise<void> {
    const modal = await this.modalController.create({
      component: TodoManagePage,
      cssClass: 'todo-custom-class',
      componentProps: {
        mode: todoPageConst.mode.view,
        todo: { ...todo },
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    // 編集が無かった場合
    if (!data) {
      return;
    }
    this.updateTodo(data as Todo);
  }

  /** Todo更新
   *
   * @param todo Todo
   */
  private async updateTodo(todo: Todo): Promise<void> {
    const updateTodoInput: UpdateTodoInput = {
      id: todo.id,
      title: todo.title,
      comment: todo.comment,
      url: todo.url,
      status: todo.status,
      targetAt: todo.targetAt,
      carryOver: todo.carryOver,
    };
    // 認証ユーザーの取得
    const user = await Auth.currentAuthenticatedUser();
    updateTodoInput.updatedAt = new Date().toISOString();
    updateTodoInput.updatedUser = user.username;

    const isSuccess = await this.todoService.updateTodo(updateTodoInput);
    if (isSuccess) {
      return;
    }
    this.showAlert({ header: '失敗', message: '更新に失敗しました。' });
  }

  /**
   * アラート表示
   *
   * @param options アラートオプション
   */
  private async showAlert(options: AlertOptions) {
    const alert = await this.alertController.create({
      header: options.header,
      message: options.message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
