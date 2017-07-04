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
