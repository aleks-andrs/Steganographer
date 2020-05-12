import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SelectionComponent } from './views/selection/selection.component';
import { EncryptionComponent } from './views/encryption/encryption.component';
import { DecryptionComponent } from './views/decryption/decryption.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PasswordmanagerComponent } from './views/passwordmanager/passwordmanager.component';
import { HomeComponent } from './views/home/home.component';
import { ApiService } from './services/api.service';
import { ValidateService } from './services/validate.service';
import { AuthGuard } from './services/guard.auth';
import { SharingService } from './services/sharing.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SelectionComponent,
    EncryptionComponent,
    DecryptionComponent,
    LoginComponent,
    RegisterComponent,
    PasswordmanagerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    ApiService,
    ValidateService,
    SharingService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
