import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // 直下へのアクセスは /auth へリダイレクト
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // 未ログイン状態でアクセスできる画面群のルーティング
  {
    path: '',
    loadChildren: () =>
      import('./pages/public/public.module').then((m) => m.PublicModule),
  },
  // ログイン状態でアクセスできる画面群のルーティング
  {
    path: '',
    loadChildren: () =>
      import('./pages/private/private.module').then((m) => m.PrivateModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
