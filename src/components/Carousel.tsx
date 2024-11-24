import LeftSide from './LeftSide'
import { assets } from '../Svgs'
import RightSide from './RightSide'
import { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/provider'
import Summary from './Summary'

const Carousel = () => {

  const { quiz, quizIndex, setQuizIndex } = useContext(MyContext)!;
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const filterResult = quiz.filter(x => x.answer);

    setShowSummary(filterResult.length === quiz.length);

  }, [quiz])

  return (
    <>
      {quizIndex === quiz.length ? (<Summary />)
        : (<div className="container-carousal flex">
          <div data-testid="left-side" className='mobile-screen customPurple relative'>
            <div className='absolute left-10 top-10 book-image flex gap-2 items-center'>
              <img src={assets.book} alt='book' width={30} height={30} />
              {showSummary && (<span
                className='underline cursor-pointer text-[14px]'
                onClick={() => setQuizIndex(quiz.length)}
              >Go to Summary</span>)}
              
            </div>

            <div className='absolute left-10 top-[50%] translate-y-[-50%] flex flex-col gap-3'>
              {
                quiz.map((value, i) =>
                  <div
                    key={i}
                    role='button'
                    className={`w-[13px] cursor-pointer h-[13px] mobile-dot rounded-[50%] ${(i === quizIndex) ? 'border-[#fff] border-[2px]' : 'bg-white'}`}
                    onClick={() => {
                      let status = false;

                      if (quiz[i - 1]?.answer) status = true
                      if (value.answer) status = true

                      if (status) {
                        setQuizIndex(i)
                      }
                      
                    }}
                  ></div>)
              }
            </div>
            <LeftSide />
          </div>
          <div className='mobile-screen'>
            <RightSide />
          </div>
        </div>)}
    </>
  )
}

export default Carousel