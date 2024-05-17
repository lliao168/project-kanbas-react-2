import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizzesReducer from "../Courses/Quizzes/reducer";
import questionsReducer from "../Courses/Quizzes/Editor/QuestionsEditor/QuestionReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignmentsReducer: {
    assignments: any[];
    assignment: any;
  };
  quizzesReducer: {
    quizzes: any[];
    quiz : any;
  }
  questionsReducer: {
    questions: any[];
    question: any;
  }
  
  
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizzesReducer,
    questionsReducer,
  }
});


export default store;

