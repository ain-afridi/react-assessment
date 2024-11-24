import React, { useContext } from 'react';
import { MyContext } from '../context/provider';

function LeftSide() {
  const { quiz, quizIndex, animate } = useContext(MyContext)!;

  // Handle empty quiz or out-of-bounds index
  const question = quiz?.[quizIndex]?.question || 'No question available';

  return (
    <div
      className={`flex justify-center items-center h-[100dvh] ${
        animate && 'animate-slideIn'
      }`}
      role="presentation"
    >
      <span className="text-[50px] font-[700] w-[300px] leading-[60px] mobile-question">
        {question}
      </span>
    </div>
  );
}

export default LeftSide;

// import React, { useContext } from 'react'
// import { MyContext } from '../context/provider';

// function LeftSide() {
//   const { quiz, quizIndex, animate } = useContext(MyContext)!;

//   const question = quiz?.[quizIndex]?.question || 'No question available';
//   return (
//     <div
//       role="presentation"
//       className={`flex justify-center items-center h-[100dvh] ${animate && 'animate-slideIn'}`}>
//       <span className='text-[50px] font-[700] w-[300px] leading-[60px] mobile-question'>
//         {question}
//       </span>
//     </div>
//   )
// }

// export default LeftSide