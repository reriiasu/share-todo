import { TodoListPage } from '@/app/pages/private/todo/todo-list/todo-list.page';
import { TodoManagePage } from '@/app/pages/private/todo/todo-manage/todo-manage.page';
import { SharedModule } from '@/app/shared/module/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TodoPageRoutingModule } from './todo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoPageRoutingModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: TodoListPage }]),
  ],
  declarations: [TodoListPage, TodoManagePage],
})
export class TodoPageModule {}
