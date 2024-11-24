import React, { useContext } from 'react';
import { MyContext } from '../context/provider';

const RightSide = () => {
    const { quiz, quizIndex, setQuiz, animate, setQuizIndex } = useContext(MyContext)!;
    return (
        <div
            role='presentation'
            data-testid="right-side-container"
            className={`flex gap-16 items-center justify-center h-[100dvh] ${animate && "animate-slideIn"}`}>
            {quiz[quizIndex].options.map((option, i) => (
                <div key={i} className={`tooltip`}>
                    <span
                        role="option"
                        aria-selected={option.id === quiz[quizIndex].answer?.id}
                        className="relative inline-block text-[50px] cursor-pointer hover:text-[70px] transition-all duration-200"
                        onClick={() => {
                            const newQuiz = [...quiz];
                            newQuiz[quizIndex].answer = option;
                            setQuiz(newQuiz);
                            setTimeout(() => {
                                setQuizIndex(quizIndex + 1);
                            }, 1000);
                        }}
                    >
                        <span
                            className={`flex items-center justify-center w-[90px] h-[90px] rounded-full custom-border-purple ${option.id === quiz[quizIndex].answer?.id ? 'border-4' : ''
                                }`}
                        >
                            {option.emoji}
                        </span>
                    </span>
                    <span className={`tooltiptext ${option.id === quiz[quizIndex].answer?.id && "!opacity-100 no-after"}`}>
                        {option.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default RightSide;
