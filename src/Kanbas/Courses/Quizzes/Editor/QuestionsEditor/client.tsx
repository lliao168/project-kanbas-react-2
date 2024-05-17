import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUESTIONS_API = `${API_BASE}/api/questions`;

export interface Choice {
    _id: string;
    text: string;
    isCorrect: boolean;
}

export interface TrueFalse {
    _id: string;
    isTrue: boolean;
}

export interface Blank {
    _id: string;
    correctAnswers: string;
    caseInsensitive: boolean;
}
export interface Question {
    _id: string;
    title: string;
    quizId: string;
    question: string;
    points: number,
    questionType: string;
    multipleChoice?: Choice[];
    trueFalse?: TrueFalse[];
    fillBlank?: Blank[];

};

export const updateQuestion = async (question: any) => {
    const response = await axios.
        put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
};
export const deleteQuestion = async (questionId: any) => {
    const response = await axios
        .delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

export const deleteAllQuestions = async (quizId: any) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
}

export const createQuestion = async (quizId: any, question: any) => {
    const response = await axios.post(
        `${QUIZZES_API}/${quizId}/questions`,
        question
    );
    return response.data;
};
export const findQuestionsForQuiz = async (quizId?: string) => {
    const response = await axios
        .get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
};
export const findQuestionById = async (id: string) => {
    const response = await axios.get(`${QUESTIONS_API}/${id}`);
    return response.data;
};
export const findQuestionByType = async (type: string) => {
    const response = await axios.get(`${QUESTIONS_API}?type=${type}`);
    return response.data;
};

export const addChoiceAnswer = async (questionId: string, choice: any) => {
    const response = await axios.post(
        `${QUESTIONS_API}/${questionId}/multipleChoices`,
        choice
    );
    return response.data;
};

export const addTrueFalseAnswer = async (questionId: string, isTrue: boolean) => {
    const response = await axios.post(
        `${QUESTIONS_API}/${questionId}/trueFalse`,
        { isTrue }
    );
    return response.data;
};

export const addBlankAnswer = async (questionId: string, blank: any) => {
    const response = await axios.post(
        `${QUESTIONS_API}/${questionId}/fillBlanks`,
        blank
    );
    return response.data;
};

export const updateChoiceAnswer = async (questionId: string, choiceId: string, updatedChoice: any) => {
    const response = await axios.put(
        `${QUESTIONS_API}/${questionId}/multipleChoices/${choiceId}`,
        updatedChoice
    );
    return response.data;
};

export const updateTrueFalseAnswer = async (questionId: string, tfId: string, updatedTF: any) => {
    const response = await axios.put(
        `${QUESTIONS_API}/${questionId}/trueFalse/${tfId}`,
        updatedTF
    );
    return response.data;
};

export const updateBlankAnswer = async (questionId: string, blankId: string, updatedBlank: any) => {
    const response = await axios.put(
        `${QUESTIONS_API}/${questionId}/fillBlanks/${blankId}`,
        updatedBlank
    );
    return response.data;
};

export const deleteChoiceAnswer = async (questionId: string, choiceId: string) => {
    const response = await axios.delete(
        `${QUESTIONS_API}/${questionId}/multipleChoices/${choiceId}`
    );
    return response.data;
};

export const deleteBlankAnswer = async (questionId: string, blankId: string) => {
    const response = await axios.delete(
        `${QUESTIONS_API}/${questionId}/fillBlanks/${blankId}`
    );
    return response.data;
};

