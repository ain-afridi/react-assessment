import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from '../components/Carousel';
import { MyContext } from '../context/provider';

const mockSetQuizIndex = jest.fn();
const mockSetQuiz = jest.fn();
const mockSetAnimate = jest.fn();

const mockContextValue = {
    quiz: [
      { question: 'Question 1', options: [{ emoji: '😀', label: 'Option 1' }], answer: { emoji: '😀', label: 'Option 1' } },
      { question: 'Question 2', options: [{ emoji: '😁', label: 'Option 2' }], answer:  null },
    ],
    setQuiz: mockSetQuiz,
    quizIndex: 0, // or any valid index
    setQuizIndex: mockSetQuizIndex,
    animate: false,
    setAnimate: mockSetAnimate,
  };
  jest.mock('../components/LeftSide', () => () => <div>LeftSide Component</div>);
  jest.mock('../components/RightSide', () => () => <div>RightSide Component</div>);
  jest.mock('../components/Summary', () => () => <div>Summary Component</div>);
describe('Carousel Component', () => {
  it('renders LeftSide and RightSide components when quizIndex is less than quiz length', () => {
    render(
      <MyContext.Provider value={mockContextValue}>
        <Carousel />
      </MyContext.Provider>
    );

    expect(screen.getByAltText('book')).toBeInTheDocument(); // Checks for book image
    expect(screen.getByText('LeftSide Component')).toBeInTheDocument(); // Mock LeftSide
    expect(screen.getByText('RightSide Component')).toBeInTheDocument(); // Mock RightSide
  });

  it('renders Summary component when quizIndex equals quiz length', () => {
    render(
      <MyContext.Provider value={{ ...mockContextValue, quizIndex: 2 }}>
        <Carousel />
      </MyContext.Provider>
    );

    expect(screen.getByText('Summary Component')).toBeInTheDocument(); // Mock Summary
  });

  it('updates quizIndex on dot click if the quiz item has an answer', () => {
    render(
      <MyContext.Provider value={mockContextValue}>
        <Carousel />
      </MyContext.Provider>
    );

    const dots = screen.getAllByRole('button'); // Assuming dots are buttons
    fireEvent.click(dots[0]); // Simulate click on the first dot

    expect(mockContextValue.setQuizIndex).toHaveBeenCalledWith(0);
  });

  it('does not update quizIndex if quiz item answer is null', () => {
    render(
      <MyContext.Provider value={mockContextValue}>
        <Carousel />
      </MyContext.Provider>
    );

    const dots = screen.getAllByRole('button');
    fireEvent.click(dots[1]); // Simulate click on a dot with no answer

    expect(mockContextValue.setQuizIndex).not.toHaveBeenCalled();
  });
});