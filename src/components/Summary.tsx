import React, { useContext, useState } from 'react'
import { MyContext } from '../context/provider';
import axios from 'axios';
import { toast } from 'react-toastify';

const Summary = () => {
    const { quiz, setQuizIndex } = useContext(MyContext)!;
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
        setLoading(true);
        const res = await axios.post('http://localhost:4000/quiz', { quiz });
        console.log("response", res);

        setTimeout(() => {
            setLoading(false)
            toast.success("Saved Successfully")
        }, 3000);

    }
    return (
        <div className='flex flex-col gap-3 p-48 reveal-left relative'>
            <span
                className='flex cursor-pointer gap-2 absolute top-3 left-3 font-[600] text-[20px]'
                onClick={() => setQuizIndex(quiz.length - 1)}
            >
                &larr; Back
            </span>
            <h1 className='text-[24px]'><strong>Summary</strong></h1>
            <table id="summary-table">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Emoji</th>
                        <th>label</th>
                    </tr>
                </thead>
                <tbody>
                    {quiz.map((value, i) => (
                        <tr key={i}>
                            <td>{value.question}</td>
                            <td>{value.answer?.emoji}</td>
                            <td>{value.answer?.label}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='w-[100%] text-right'>
                <button className='save-button' disabled={loading} onClick={handleSubmit}>{loading ? <div className="loader"></div> : "Submit"}</button>
            </div>
        </div>
    )
}

export default Summary