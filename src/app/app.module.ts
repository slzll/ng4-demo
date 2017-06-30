import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarsComponent } from './nav-bars/nav-bars.component';
import { CourseCenterComponent } from './course-center/course-center.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { CommonProblemComponent } from './common-problem/common-problem.component';

import { appRoute } from './app-route';

@NgModule({
  declarations: [
    AppComponent,
    NavBarsComponent,
    CourseCenterComponent,
    PersonalCenterComponent,
    CommonProblemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
