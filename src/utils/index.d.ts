import { Dispatch, SetStateAction } from "react";

export type Option = {
    emoji: string;
    label: string;
  };
  
export type QuizQuestion = {
    question: string;
    options: Option[];
    answer: Option | null;
  };
  
export type ContextType = {
    quiz: QuizQuestion[];
    setQuiz: Dispatch<SetStateAction<QuizQuestion[]>>;
    quizIndex: number;
    setQuizIndex: Dispatch<SetStateAction<number>>;
    animate: boolean;
    setAnimate: Dispatch<SetStateAction<boolean>>;
  } | null;