import React, { useContext } from 'react'
import { MyContext } from '../context/provider';

const Summary = () => {
    const { quiz } = useContext(MyContext)!;
    return (
        <div className='flex flex-col gap-3 p-4'>
            <table id="summary-table">
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Emoji</th>
                    <th>label</th>
                </tr>
                </thead>
                <tbody>
                    {quiz.map((value,i)=> (
                        <tr key={i}>
                            <td>{value.question}</td>
                            <td>{value.answer?.emoji}</td>
                            <td>{value.answer?.label}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='w-[100%] text-right'>
                <button className='save-button'>Save</button>
            </div>
        </div>
    )
}

export default Summary