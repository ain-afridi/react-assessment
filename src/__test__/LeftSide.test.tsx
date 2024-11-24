import React from 'react';
import { render, screen } from '@testing-library/react';
import { MyContext } from '../context/provider';
import LeftSide from '../components/LeftSide';

describe('LeftSide Component', () => {
  const mockContext = {
    quiz: [{ question: 'What is React?' }, { question: 'What is JSX?' }],
    quizIndex: 0,
    animate: false,
  };

  const renderComponent = (contextValue: any) =>
    render(
      <MyContext.Provider value={contextValue}>
        <LeftSide />
      </MyContext.Provider>
    );

  test('renders the question based on quizIndex', () => {
    renderComponent(mockContext);

    expect(screen.getByText('What is React?')).toBeInTheDocument();
  });

  test('applies the animation class when animate is true', () => {
    const contextWithAnimation = { ...mockContext, animate: true };
    renderComponent(contextWithAnimation);

    const divElement = screen.getByRole('presentation'); // Use a semantic role or accessible element
    expect(divElement).toHaveClass('animate-slideIn');
  });

  test('does not apply the animation class when animate is false', () => {
    renderComponent(mockContext);

    const divElement = screen.getByRole('presentation'); // Use a semantic role or accessible element
    expect(divElement).not.toHaveClass('animate-slideIn');
  });

  test('renders the correct question when quizIndex changes', () => {
    const contextWithDifferentIndex = { ...mockContext, quizIndex: 1 };
    renderComponent(contextWithDifferentIndex);

    expect(screen.getByText('What is JSX?')).toBeInTheDocument();
  });

  test('handles empty quiz array gracefully', () => {
    const contextWithEmptyQuiz = { quiz: [], quizIndex: 0, animate: false };
    renderComponent(contextWithEmptyQuiz);
  
    // Verify fallback message is displayed
    expect(screen.getByText('No question available')).toBeInTheDocument();
  });
});