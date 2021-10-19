import { Injectable, NgZone, OnDestroy } from '@angular/core';
import {
  APIService,
  CreateTodoInput,
  ListTodosQuery,
  Todo,
  UpdateTodoInput,
} from '@/app/API.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { todoServiceConst } from '@/app/shared/const/todo.service.const';

export type TodoGroup = {
  groupName: string;
  todoList: Array<Todo>;
  canDelete: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  /** 最終Todoアップデート日時 */
  private todoList = new Array<Todo>();
  /** 最終Todoアップデート日時 */
  private lastTodoUpdateDate = todoServiceConst.defaultUpdateDateISO;
  /** TodoGroupのSubject */
  private todoGroupSubject = new Subject<Array<TodoGroup>>();
  /** Todoリスナー */
  private todoListener = new Subscription();

  constructor(private apiService: APIService, private ngZone: NgZone) {
    this.todoListenerSubscribe();
  }

  ngOnDestroy() {
    this.todoListener.unsubscribe();
  }

  /**
   * TodoGroupList受信
   */
  public receiveTodoGroupList(): Observable<Array<TodoGroup>> {
    return this.todoGroupSubject.asObservable();
  }

  /**
   * 更新済みTodoListの取得
   */
  public getTodoList(): void {
    this.lastTodoUpdateDate = todoServiceConst.defaultUpdateDateISO;
    this.getUpdatedTodoList();
  }

  /**
   * Todo作成
   *
   * @param createTodoInput Todo作成input
   */
  public async createTodo(createTodoInput: CreateTodoInput): Promise<boolean> {
    const createResult = await this.apiService
      .CreateTodo(createTodoInput)
      .catch((error: any) => {
        console.log(JSON.stringify(error));
        return false;
      });
    return typeof createResult !== 'boolean';
  }

  /**
   * Todo更新
   *
   * @param updateTodoInput Todo更新Input
   * @returns 更新結果 true:成功 false:失敗
   */
  public async updateTodo(updateTodoInput: UpdateTodoInput): Promise<boolean> {
    const updateResult = await this.apiService
      .UpdateTodo(updateTodoInput)
      .catch((error: any) => {
        console.log(JSON.stringify(error));
        return false;
      });
    return typeof updateResult !== 'boolean';
  }

  /**
   * 各種リスナーのsubscribe
   */
  private todoListenerSubscribe(): void {
    // ログアウトでどうなるか確認
    this.todoListener.add(
      this.apiService.OnCreateTodoListener.subscribe(() => {
        this.getUpdatedTodoList();
      })
    );

    this.todoListener.add(
      this.apiService.OnUpdateTodoListener.subscribe(() => {
        this.getUpdatedTodoList();
      })
    );

    this.todoListener.add(
      this.apiService.OnDeleteTodoListener.subscribe(() => {
        this.getUpdatedTodoList();
      })
    );
  }

  /**
   * 更新済みTodoListの取得
   */
  private getUpdatedTodoList(): void {
    this.apiService
      .ListTodos({ updatedAt: { gt: this.lastTodoUpdateDate } })
      .then((todoList: ListTodosQuery) => {
        this.lastTodoUpdateDate = new Date().toISOString();
        localStorage.setItem('lastTodoupdate', this.lastTodoUpdateDate);

        // TodoListマージ
        this.margeTodoList(todoList);

        // TodoListソート
        this.sortTodoList();

        this.ngZone.run(() => {
          this.todoGroupSubject.next(this.getTodoGroup());
        });
      })
      .catch((error: any) => {
        // ネットワークエラー等
        console.log(JSON.stringify(error));
      });
  }

  /**
   * TodoListのマージ
   *
   * @param todoList TodoList
   * 存在するTodoは上書き、存在しないTodoは追加
   */
  private margeTodoList(todoList: ListTodosQuery): void {
    if (todoList.items === undefined || todoList.items === null) {
      return;
    }
    for (const todo of todoList.items) {
      if (todo === null) {
        continue;
      }
      const index = this.todoList.findIndex(({ id }) => id === todo.id);
      if (index === -1) {
        this.todoList.push(todo);
        continue;
      }
      this.todoList[index] = todo;
    }
  }

  /**
   * TodoListソート
   * 期日順にソート
   */
  private sortTodoList(): void {
    this.todoList.sort((a: Todo, b: Todo) =>
      a.targetAt.localeCompare(b.targetAt)
    );
  }

  /**
   * Todo取得
   */
  private getTodoGroup(): Array<TodoGroup> {
    const now = new Date().toISOString();
    // メイングループ
    // 期限切れしていない、かつ未削除
    const mainTodoGroup: TodoGroup = {
      groupName: 'label.beforeTimeLimit',
      todoList: this.todoList.filter(
        (todo: Todo) =>
          todo.targetAt.localeCompare(now) === 1 && todo.status === 0
      ),
      canDelete: true,
    };

    // 期限超過グループ
    // 期限切れ、かつ未削除のTodo
    const expiredTodoGroup: TodoGroup = {
      groupName: 'label.overdue',
      todoList: this.todoList.filter(
        (todo: Todo) =>
          now.localeCompare(todo.targetAt) === 1 && todo.status === 0
      ),
      canDelete: true,
    };

    // 削除済みグループ
    // 削除済のTodo
    const deletedTodoGroup = {
      groupName: 'label.deleted',
      todoList: this.todoList.filter((todo: Todo) => todo.status === 1),
      canDelete: false,
    };
    return [mainTodoGroup, expiredTodoGroup, deletedTodoGroup];
  }
}
