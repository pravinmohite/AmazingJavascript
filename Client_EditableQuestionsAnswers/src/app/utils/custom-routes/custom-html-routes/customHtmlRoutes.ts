import { Routes } from "@angular/router";
import { AngularInterviewQuestionsComponent } from "../../../interview-questions/angular-interview-questions/angular-interview-questions.component";
import * as UIConstants from '../../constants';

export const customHtmlRoutes: Routes = [
    {
        path: UIConstants.topFresherHtml5InterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topFresherHtml5InterviewQuestions.title,
            headingTitle: UIConstants.topFresherHtml5InterviewQuestions.headingTitle,
            experience: UIConstants.topFresherHtml5InterviewQuestions.experience,
            type: UIConstants.topFresherHtml5InterviewQuestions.type
        }
    },
    {
        path: UIConstants.topThreeYearsExperienceHtml5InterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topThreeYearsExperienceHtml5InterviewQuestions.title,
            headingTitle: UIConstants.topThreeYearsExperienceHtml5InterviewQuestions.headingTitle,
            experience: UIConstants.topThreeYearsExperienceHtml5InterviewQuestions.experience,
            type: UIConstants.topThreeYearsExperienceHtml5InterviewQuestions.type
        }
    },
    {
        path: UIConstants.topFiveYearsExperienceHtml5InterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topFiveYearsExperienceHtml5InterviewQuestions.title,
            headingTitle: UIConstants.topFiveYearsExperienceHtml5InterviewQuestions.headingTitle,
            experience: UIConstants.topFiveYearsExperienceHtml5InterviewQuestions.experience,
            type: UIConstants.topFiveYearsExperienceHtml5InterviewQuestions.type
        }
    }
];