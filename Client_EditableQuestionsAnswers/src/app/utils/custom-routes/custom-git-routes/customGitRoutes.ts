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
            type: UIConstants.topGitInterviewQuestions.type
        }
    }
];