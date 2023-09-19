import { Routes } from "@angular/router";
import { AngularInterviewQuestionsComponent } from "../../../interview-questions/angular-interview-questions/angular-interview-questions.component";
import * as UIConstants from '../../constants';

export const customCssRoutes: Routes = [
    {
        path: UIConstants.topFresherCssInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topFresherCssInterviewQuestions.title,
            headingTitle: UIConstants.topFresherCssInterviewQuestions.headingTitle,
            experience: UIConstants.topFresherCssInterviewQuestions.experience,
            type: UIConstants.topFresherCssInterviewQuestions.type
        }
    },
    {
        path: UIConstants.topThreeYearsExperienceCssInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topThreeYearsExperienceCssInterviewQuestions.title,
            headingTitle: UIConstants.topThreeYearsExperienceCssInterviewQuestions.headingTitle,
            experience: UIConstants.topThreeYearsExperienceCssInterviewQuestions.experience,
            type: UIConstants.topThreeYearsExperienceCssInterviewQuestions.type
        }
    },
    {
        path: UIConstants.topFiveYearsExperienceCssInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topFiveYearsExperienceCssInterviewQuestions.title,
            headingTitle: UIConstants.topFiveYearsExperienceCssInterviewQuestions.headingTitle,
            experience: UIConstants.topFiveYearsExperienceCssInterviewQuestions.experience,
            type: UIConstants.topFiveYearsExperienceCssInterviewQuestions.type
        }
    }
];