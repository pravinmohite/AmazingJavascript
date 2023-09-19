import { Routes } from "@angular/router";
import { AngularInterviewQuestionsComponent } from "../../../interview-questions/angular-interview-questions/angular-interview-questions.component";
import * as UIConstants from '../../constants';

export const customCodingQuestionsRoutes: Routes = [
    {
        path: UIConstants.topJavascriptCodingInterviewQuestions.path,
        component: AngularInterviewQuestionsComponent,
        data: {
            title: UIConstants.topJavascriptCodingInterviewQuestions.title,
            headingTitle: UIConstants.topJavascriptCodingInterviewQuestions.headingTitle,
            type: UIConstants.topJavascriptCodingInterviewQuestions.type
        }
    }
];