import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { ContextType, QuizQuestion } from '../utils';

const MyContext = createContext<ContextType>(null);

type ProviderProps = {
  children: ReactNode;
};

const MyProvider: React.FC<ProviderProps> = ({ children }) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([
    {
      question: 'What is your favorite weather?',
      options: [
        { emoji: '☀️', label: 'Sunny' },
        { emoji: '🌧️', label: 'Rainy' },
        { emoji: '❄️', label: 'Snowy' },
      ],
      answer: null,
    },
    {
      question: 'Which animal do you like the most?',
      options: [
        { emoji: '🐶', label: 'Dog' },
        { emoji: '🐱', label: 'Cat' },
        { emoji: '🦁', label: 'Lion' },
      ],
      answer: null,
    },
    {
      question: 'What is your go-to drink?',
      options: [
        { emoji: '☕', label: 'Coffee' },
        { emoji: '🍵', label: 'Tea' },
        { emoji: '🥤', label: 'Soda' },
      ],
      answer: null,
    },
    {
      question: 'Which activity do you enjoy the most?',
      options: [
        { emoji: '🎨', label: 'Painting' },
        { emoji: '🎮', label: 'Gaming' },
        { emoji: '📚', label: 'Reading' },
      ],
      answer: null,
    },
    {
      question: 'Where would you rather go on vacation?',
      options: [
        { emoji: '🏖️', label: 'Beach' },
        { emoji: '🏔️', label: 'Mountains' },
        { emoji: '🏙️', label: 'City' },
      ],
      answer: null,
    },
  ]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [quizIndex]);  

  return (
    <MyContext.Provider value={{ quiz, setQuiz, quizIndex, setQuizIndex, animate, setAnimate}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
export { MyContext };
