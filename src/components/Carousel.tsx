import LeftSide from './LeftSide'
import { assets } from '../Svgs'
import RightSide from './RightSide'
import { useContext } from 'react'
import { MyContext } from '../context/provider'
import Summary from './Summary'

const Carousel = () => {

  const { quiz, quizIndex, setQuizIndex } = useContext(MyContext)!;


  return (
    <>
      {quizIndex === quiz.length ? (<Summary />)
        : (<div className="container-carousal flex">
          <div className='mobile-screen customPurple relative'>
            <div className='absolute left-10 top-10 book-image'>
              <img src={assets.book} alt='book' width={30} height={30} />
            </div>

            <div className='absolute left-10 top-[50%] translate-y-[-50%] flex flex-col gap-3'>
              {
                quiz.map((value, i) =>
                  <div
                    key={i}
                    className={`w-[13px] cursor-pointer h-[13px] mobile-dot rounded-[50%] ${(i === quizIndex) ? 'border-[#fff] border-[2px]' : 'bg-white'}`}
                    onClick={() => {
                      if (value.answer) {
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