import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonServiceService } from './services/common-service.service';
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
    DefaultShowDirective
  ],
  imports: [
    CommonModule,
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
