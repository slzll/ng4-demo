import { CourseCenterComponent } from './course-center/course-center.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { CommonProblemComponent } from './common-problem/common-problem.component';
import { MainComponent } from './main/main.component';


export const appRoute = [
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: 'courseCenter',
        component: CourseCenterComponent
    },
    {
        path: 'personalCenter',
        component: PersonalCenterComponent
    },
    {
        path: 'commonProblem',
        component: CommonProblemComponent
    },
    {
        path: 'courseDetails/:Id',
        component: CommonProblemComponent
    },
    {
        path: 'articleDetail/:ID',
        component: CommonProblemComponent
    },
    {
        path: 'noticeDetail/:ID',
        component: CommonProblemComponent
    },
    {
        path: 'specialTrainingCourse',
        component: CommonProblemComponent
    },
    {
        path: 'trainingProgram',
        component: CommonProblemComponent
    },
    {
        path: 'courseRankingList',
        component: CommonProblemComponent
    },
    {
        path: 'unitRankingList',
        component: CommonProblemComponent
    },
    {
        path: 'userRankingList',
        component: CommonProblemComponent
    },
    {
        path: 'courseSupermarket/?:channelId',
        component: CommonProblemComponent
    },
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/main',
        pathMatch: 'full'
    }
];
