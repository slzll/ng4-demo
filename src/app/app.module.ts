import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonServiceService } from './services/common-service.service';

import { AppComponent } from './app.component';
import { NavBarsComponent } from './nav-bars/nav-bars.component';
import { CourseCenterComponent } from './course-center/course-center.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { CommonProblemComponent } from './common-problem/common-problem.component';

import { appRoute } from './app-route';
import { API } from './api';
import { GlobalConfig } from './global-config';
import { MainComponent } from './main/main.component';
import { NewCourseComponent } from './main/new-course/new-course.component';
import { HeaderComponent } from './main/header/header.component';
import { ErrSrcDirective } from './directive/err-src.directive';
import { NewsComponent } from './main/news/news.component';
import { TimeLimitPipe } from './pipe/time-limit.pipe';
import { DateFilterPipe } from './pipe/date-filter.pipe';
import { SpecialTrainingComponent } from './main/special-training/special-training.component';
import { TrainingProgramComponent } from './main/training-program/training-program.component';
import { StatisticalRankingComponent } from './main/statistical-ranking/statistical-ranking.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarsComponent,
    CourseCenterComponent,
    PersonalCenterComponent,
    CommonProblemComponent,
    MainComponent,
    NewCourseComponent,
    HeaderComponent,
    ErrSrcDirective,
    NewsComponent,
    TimeLimitPipe,
    DateFilterPipe,
    SpecialTrainingComponent,
    TrainingProgramComponent,
    StatisticalRankingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [CommonServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
