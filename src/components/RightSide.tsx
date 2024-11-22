import React, { useContext } from 'react';
import { MyContext } from '../context/provider';

const RightSide = () => {
    const { quiz, quizIndex, setQuiz, animate, setQuizIndex } = useContext(MyContext)!;
    return (
        <div className={`flex gap-16 items-center justify-center h-[100dvh] ${animate && "animate-slideIn"}`}>
            {quiz[quizIndex].options.map((option, i) => (
                <div key={i} className={`tooltip`}>
                    <span
                        className='relative inline-block text-[50px] cursor-pointer hover:text-[70px] transition-all duration-200'
                        onClick={() => {
                            const newQuiz = [...quiz];
                            newQuiz[quizIndex].answer = option;
                            setQuiz(newQuiz);
                            setTimeout(() => {
                                setQuizIndex(quiz.length - 1 === quizIndex ? 0 : quizIndex + 1);
                            }, 400);
                        }}
                    >
                        <span
                            className={`flex items-center justify-center w-[80px] h-[80px] rounded-full custom-border-purple ${
                                option.label.trim() === quiz[quizIndex].answer?.label.trim() ? 'border-2' : ''
                            }`}
                        >
                            {option.emoji}
                        </span>
                    </span>
                    <span className={`tooltiptext ${option.label.trim() === quiz[quizIndex].answer?.label.trim() && "!opacity-100 no-after"}`}>
                        {option.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default RightSide;