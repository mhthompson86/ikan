import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BoardModule } from './board/board.module';
import { BacklogModule } from './backlog/backlog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AngularMaterialModule,
    CoreModule,
    HttpClientModule,
    SharedModule,

    BoardModule,
    BacklogModule,

    // AppRouting module must be declared last in order to prevent the ** from catching
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
