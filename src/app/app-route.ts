import { CourseCenterComponent } from './course-center/course-center.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { CommonProblemComponent } from './common-problem/common-problem.component';


export const appRoute = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
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
    }
];
