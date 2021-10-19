import { TodoListPage } from '@/app/pages/private/todo/todo-list/todo-list.page';
import { TodoManagePage } from '@/app/pages/private/todo/todo-manage/todo-manage.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'a',
    component: TodoListPage,
  },
  {
    path: 'b',
    component: TodoManagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoPageRoutingModule {}
