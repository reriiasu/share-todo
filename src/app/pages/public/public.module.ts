import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'licenses',
    loadChildren: () =>
      import('./licenses/licenses.module').then((m) => m.LicensesPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PublicModule {}
