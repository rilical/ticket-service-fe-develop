import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { TicketModule } from './pages/home/ticket/ticket.module';

import { DrawerComponent } from './layout/drawer/drawer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateTicketComponent } from './components/ticket/create-ticket/create-ticket.component';
import { ReplyFormComponent } from './components/ticket/reply-form/reply-form.component';

import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    NavbarComponent,
    UserProfileComponent,
    ReplyFormComponent
  ],
  imports: [
    CreateTicketComponent,
    TicketModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
