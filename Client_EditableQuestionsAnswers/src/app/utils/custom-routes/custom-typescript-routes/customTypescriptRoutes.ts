import { Routes } from "@angular/router";
import { AngularInterviewQuestionsComponent } from "../../../interview-questions/angular-interview-questions/angular-interview-questions.component";
import * as UIConstants from '../../constants';

export const customTypescriptRoutes: Routes = [
    {
        path: UIConstants.topTypescriptInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topTypescriptInterviewQuestions.title,
            headingTitle: UIConstants.topTypescriptInterviewQuestions.headingTitle,
            type: UIConstants.topTypescriptInterviewQuestions.type
        }
    }
];