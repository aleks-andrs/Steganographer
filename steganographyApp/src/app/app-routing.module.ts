import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectionComponent } from './views/selection/selection.component';
import { EncryptionComponent } from './views/encryption/encryption.component';
import { DecryptionComponent } from './views/decryption/decryption.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PasswordmanagerComponent } from './views/passwordmanager/passwordmanager.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from "./services/guard.auth";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'encryption', component: EncryptionComponent },
  { path: 'decryption', component: DecryptionComponent },
  { path: 'savedPasswords', component: PasswordmanagerComponent, canActivate:[AuthGuard]},
  { path: 'selection', component: SelectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
