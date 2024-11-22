import React, { useContext } from 'react'
import { MyContext } from '../context/provider';

function LeftSide() {
    const {quiz, quizIndex, animate } = useContext(MyContext)!;
    




  return (
    <div className={`flex justify-center items-center h-[100dvh] ${animate && 'animate-slideIn'}`}>
        <span className='text-[50px] font-[700] w-[300px] leading-[60px] mobile-question'>
            {quiz[quizIndex].question}
        </span>
    </div>
  )
}

export default LeftSide