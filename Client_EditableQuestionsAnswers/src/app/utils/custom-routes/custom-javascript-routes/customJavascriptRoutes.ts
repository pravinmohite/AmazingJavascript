import { Routes } from "@angular/router";
import { AngularInterviewQuestionsComponent } from "../../../interview-questions/angular-interview-questions/angular-interview-questions.component";
import * as UIConstants from '../../constants';

export const customJavascriptRoutes: Routes = [
    {
        path: UIConstants.topFresherJavascriptInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topFresherJavascriptInterviewQuestions.title,
            headingTitle: UIConstants.topFresherJavascriptInterviewQuestions.headingTitle,
            experience: UIConstants.topFresherJavascriptInterviewQuestions.experience,
            type: UIConstants.topFresherJavascriptInterviewQuestions.type
        }
    },
    {
        path: UIConstants.topThreeYearsExperienceJavascriptInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topThreeYearsExperienceJavascriptInterviewQuestions.title,
            headingTitle: UIConstants.topThreeYearsExperienceJavascriptInterviewQuestions.headingTitle,
            experience: UIConstants.topThreeYearsExperienceJavascriptInterviewQuestions.experience,
            type: UIConstants.topThreeYearsExperienceJavascriptInterviewQuestions.type
        }
    },
    {
        path: UIConstants.topFiveYearsExperienceJavascriptInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topFiveYearsExperienceJavascriptInterviewQuestions.title,
            headingTitle: UIConstants.topFiveYearsExperienceJavascriptInterviewQuestions.headingTitle,
            experience: UIConstants.topFiveYearsExperienceJavascriptInterviewQuestions.experience,
            type: UIConstants.topFiveYearsExperienceJavascriptInterviewQuestions.type
        }
    }
];