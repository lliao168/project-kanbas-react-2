import { createSlice } from "@reduxjs/toolkit";

interface Quiz {
  _id?: string;
  title: string;
  description: string;
  points: Number;
  dueDate: Date;
  availableFromDate: Date;
  availableUntilDate: Date;
  pts: Number;
  Questions: Number;
  isPublished: Boolean;
  shuffleAnswer: Boolean;
  QuizType: string; 
  Minutes: Number;
  AccessCode: Number;

}

const initialState = {
  quizzes: [] as Quiz[],
  quiz: { title: "New Quiz", description: "New Quiz Description", points: 100, dueDate: '', availableFromDate: '', availableUntilDate: '', pts: 0, Questions: 0, isPublished: false, shuffleAnswer: true, QuizType: "Graded Quiz", Minutes: 20, AccessCode: "123"},
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = 
        [action.payload, ...state.quizzes];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    selectQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});


export const { addQuiz, deleteQuiz, updateQuiz, selectQuiz, setQuizzes} = quizzesSlice.actions;
export default quizzesSlice.reducer;

