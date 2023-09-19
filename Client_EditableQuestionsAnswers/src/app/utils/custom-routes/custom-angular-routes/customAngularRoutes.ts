import { Routes } from "@angular/router";
import { AngularInterviewQuestionsComponent } from "../../../interview-questions/angular-interview-questions/angular-interview-questions.component";
import * as UIConstants from '../../constants';

export const customAngularRoutes: Routes = [
    {
        path: UIConstants.topFresherAngularInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topFresherAngularInterviewQuestions.title,
            headingTitle: UIConstants.topFresherAngularInterviewQuestions.headingTitle,
            experience: UIConstants.topFresherAngularInterviewQuestions.experience,
            type: UIConstants.topFresherAngularInterviewQuestions.type,
            imgPath: UIConstants.topFresherAngularInterviewQuestions.imgPath
        }
    },
    {
        path: UIConstants.topThreeYearsExperienceAngularInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topThreeYearsExperienceAngularInterviewQuestions.title,
            headingTitle: UIConstants.topThreeYearsExperienceAngularInterviewQuestions.headingTitle,
            experience: UIConstants.topThreeYearsExperienceAngularInterviewQuestions.experience,
            type: UIConstants.topThreeYearsExperienceAngularInterviewQuestions.type,
            imgPath: UIConstants.topThreeYearsExperienceAngularInterviewQuestions.imgPath
        }
    },
    {
        path: UIConstants.topFiveYearsExperienceAngularInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topFiveYearsExperienceAngularInterviewQuestions.title,
            headingTitle: UIConstants.topFiveYearsExperienceAngularInterviewQuestions.headingTitle,
            experience: UIConstants.topFiveYearsExperienceAngularInterviewQuestions.experience,
            type: UIConstants.topFiveYearsExperienceAngularInterviewQuestions.type,
            imgPath: UIConstants.topFiveYearsExperienceAngularInterviewQuestions.imgPath
        }
    }
];