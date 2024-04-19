import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Choice {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface TrueFalse {
  _id: string;
  isTrue: boolean;
}

interface Blank {
  _id: string;
  correctAnswers: string[];
  caseInsensitive: boolean;
}


interface Question {
  _id?: string;
  title: string;
  question: string;
  points: Number;
  questionType: string;
  multipleChoice?: Choice[];
  trueFalse?: TrueFalse;
  fillBlank?: Blank[];
}

const initialState = {
  questions: [] as Question[],
  question: null as Question | null,
};

const questionsSlice = createSlice({
  name: "quiz questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions =
        [...state.questions, action.payload,];
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        } else {
          return question;
        }
      });
    },
    selectQuestion: (state, action: PayloadAction<Question>) => {
      state.question = action.payload;
    },
  },
});


export const { addQuestion, deleteQuestion, updateQuestion, selectQuestion, setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;