import { Routes } from "@angular/router";
import { AngularInterviewQuestionsComponent } from "../../../interview-questions/angular-interview-questions/angular-interview-questions.component";
import * as UIConstants from '../../constants';

export const customGitRoutes: Routes = [
    {
        path: UIConstants.topGitInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topGitInterviewQuestions.title,
            headingTitle: UIConstants.topGitInterviewQuestions.headingTitle,
            type: UIConstants.topGitInterviewQuestions.type,
            imgPath: UIConstants.topGitInterviewQuestions.imgPath
        }
    },
    {
        path: UIConstants.topFresherGitInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topFresherGitInterviewQuestions.title,
            headingTitle: UIConstants.topFresherGitInterviewQuestions.headingTitle,
            experience: UIConstants.topFresherGitInterviewQuestions.experience,
            type: UIConstants.topFresherGitInterviewQuestions.type,
            imgPath: UIConstants.topFresherGitInterviewQuestions.imgPath
        }
    },
    {
        path: UIConstants.topThreeYearsExperienceGitInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topThreeYearsExperienceGitInterviewQuestions.title,
            headingTitle: UIConstants.topThreeYearsExperienceGitInterviewQuestions.headingTitle,
            experience: UIConstants.topThreeYearsExperienceGitInterviewQuestions.experience,
            type: UIConstants.topThreeYearsExperienceGitInterviewQuestions.type,
            imgPath: UIConstants.topThreeYearsExperienceGitInterviewQuestions.imgPath
        }
    },
    {
        path: UIConstants.topFiveYearsExperienceGitInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topFiveYearsExperienceGitInterviewQuestions.title,
            headingTitle: UIConstants.topFiveYearsExperienceGitInterviewQuestions.headingTitle,
            experience: UIConstants.topFiveYearsExperienceGitInterviewQuestions.experience,
            type: UIConstants.topFiveYearsExperienceGitInterviewQuestions.type,
            imgPath: UIConstants.topFiveYearsExperienceGitInterviewQuestions.imgPath
        }
    }
];