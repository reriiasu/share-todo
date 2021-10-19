import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '@/app/shared/module/shared.module';
import { AuthPage } from '@/app/pages/public/auth/auth.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: AuthPage }]),
  ],
  declarations: [AuthPage],
})
export class AuthPageModule {}
