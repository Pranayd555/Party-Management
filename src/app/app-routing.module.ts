import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, authGuard } from './shared/services/auth-guard.service';

const routes: Routes = [
  { path: '',   redirectTo: 'parties-list', pathMatch: 'full' },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'parties-list', loadChildren: () => import('./party/party.module').then(m => m.PartyModule), canActivate: [authGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
