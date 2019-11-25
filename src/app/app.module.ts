import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { KaligraphiModule } from '@kalidea/kaligraphi';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { UserState } from './store/states/user.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    NgxsModule.forRoot([UserState]),
    ReactiveFormsModule,
    KaligraphiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
