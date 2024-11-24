import React, { createContext, useState, useEffect } from 'react';
import { ContextType, ProviderProps, QuizQuestion } from '../utils';

const MyContext = createContext<ContextType>(null);



const MyProvider: React.FC<ProviderProps> = ({ children }) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([
    {
      question: 'What is your favorite weather?',
      options: [
        { emoji: '☀️', label: 'Sunny', id: 0 },
        { emoji: '🌧️', label: 'Rainy', id: 1 },
        { emoji: '❄️', label: 'Snowy', id: 2 },
      ],
      answer: null,
    },
    {
      question: 'Which animal do you like the most?',
      options: [
        { emoji: '🐶', label: 'Dog', id: 0 },
        { emoji: '🐱', label: 'Cat', id: 1 },
        { emoji: '🦁', label: 'Lion', id: 2 },
      ],
      answer: null,
    },
    {
      question: 'What is your go-to drink?',
      options: [
        { emoji: '☕', label: 'Coffee', id: 0 },
        { emoji: '🍵', label: 'Tea', id: 1 },
        { emoji: '🥤', label: 'Soda', id: 2 },
      ],
      answer: null,
    },
    {
      question: 'Which activity do you enjoy the most?',
      options: [
        { emoji: '🎨', label: 'Painting', id: 0 },
        { emoji: '🎮', label: 'Gaming', id: 1 },
        { emoji: '📚', label: 'Reading', id: 2 },
      ],
      answer: null,
    },
    {
      question: 'Where would you rather go on vacation?',
      options: [
        { emoji: '🏖️', label: 'Beach', id: 0 },
        { emoji: '🏔️', label: 'Mountains', id: 1 },
        { emoji: '🏙️', label: 'City', id: 2 },
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
