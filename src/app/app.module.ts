import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonService } from './services/common-service.service';
import { ErrSrcDirective } from './directive/err-src.directive';
import { appRoute } from './app-route';

import { AppComponent } from './app.component';
import { NavBarsComponent } from './nav-bars/nav-bars.component';
import { CourseCenterComponent } from './course-center/course-center.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { CommonProblemComponent } from './common-problem/common-problem.component';


import { MainComponent } from './main/main.component';
import { NewCourseComponent } from './main/new-course/new-course.component';
import { HeaderComponent } from './main/header/header.component';
import { NewsComponent } from './main/news/news.component';
import { TimeLimitPipe } from './pipe/time-limit.pipe';
import { DateFilterPipe } from './pipe/date-filter.pipe';
import { SpecialTrainingComponent } from './main/special-training/special-training.component';
import { TrainingProgramComponent } from './main/training-program/training-program.component';
import { StatisticalRankingComponent } from './main/statistical-ranking/statistical-ranking.component';
import { FooterComponent } from './footer/footer.component';
import { DataSlideToDirective } from './directive/data-slide-to.directive';
import { DefaultShowDirective } from './directive/default-show.directive';
import { CourseDetailsComponent } from './course-center/course-details/course-details.component';
import {CookieModule} from "ngx-cookie";
import {AntityForgeryService} from "./services/antity-forgery.service";
import { UserInfoComponent } from './personal-center/user-info/user-info.component';
import { PersonalCenterNavComponent } from './personal-center/personal-center-nav/personal-center-nav.component';
import { MyCenterComponent } from './personal-center/my-center/my-center.component';
import { UserLoginComponent } from './main/user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrSrcDirective,
    TimeLimitPipe,
    DateFilterPipe,
    NavBarsComponent,
    CourseCenterComponent,
    PersonalCenterComponent,
    CommonProblemComponent,
    MainComponent,
    NewCourseComponent,
    HeaderComponent,
    NewsComponent,
    SpecialTrainingComponent,
    TrainingProgramComponent,
    StatisticalRankingComponent,
    FooterComponent,
    DataSlideToDirective,
    DefaultShowDirective,
    CourseDetailsComponent,
    UserInfoComponent,
    PersonalCenterNavComponent,
    MyCenterComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoute),
    CookieModule.forRoot()
  ],
  providers: [CommonService,AntityForgeryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
