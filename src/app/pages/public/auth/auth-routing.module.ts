import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPage } from 'src/app/pages/public/auth/auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
