import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () =>
      import('./todo/todo.module').then((m) => m.TodoPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PrivateModule {}
