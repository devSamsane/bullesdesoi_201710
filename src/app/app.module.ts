import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
