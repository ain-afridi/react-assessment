import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyContext } from '../context/provider';
import RightSide from '../components/RightSide';

describe('RightSide Component', () => {
  const mockSetQuiz = jest.fn();
  const mockSetQuizIndex = jest.fn();

  const mockContext = {
    quiz: [
      {
        options: [
          { label: 'Option 1', emoji: '😀', id: 0 },
          { label: 'Option 2', emoji: '😁', id: 1 },
        ],
        answer: null,
      },
    ],
    quizIndex: 0,
    animate: false,
    setQuiz: mockSetQuiz,
    setQuizIndex: mockSetQuizIndex,
  };

  const renderComponent = (contextValue: any) =>
    render(
      <MyContext.Provider value={contextValue}>
        <RightSide />
      </MyContext.Provider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the options correctly', () => {
    renderComponent(mockContext);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('😀')).toBeInTheDocument();
    expect(screen.getByText('😁')).toBeInTheDocument();
  });

  test('applies animation class when animate is true', () => {
    const contextWithAnimation = { ...mockContext, animate: true };
    renderComponent(contextWithAnimation);

    const container = screen.getByTestId('right-side-container');
    expect(container).toHaveClass('animate-slideIn');
  });

  test('does not apply animation class when animate is false', () => {
    renderComponent(mockContext);

    const container = screen.getByTestId('right-side-container');
    expect(container).not.toHaveClass('animate-slideIn');
  });

  test('calls setQuiz and setQuizIndex when an option is clicked', () => {
    renderComponent(mockContext);

    const option1 = screen.getByText('😀');
    fireEvent.click(option1);

    // Ensure setQuiz is called with updated quiz data
    expect(mockSetQuiz).toHaveBeenCalledWith([
      {
        options: [
          { label: 'Option 1', emoji: '😀', id: 0 },
          { label: 'Option 2', emoji: '😁', id: 1 },
        ],
        answer: { label: 'Option 1', emoji: '😀', id: 0 },
      },
    ]);

    // Ensure setQuizIndex is called after a delay
    setTimeout(() => {
      expect(mockSetQuizIndex).toHaveBeenCalledWith(1);
    }, 1000);
  });

  test('highlights the selected option correctly', () => {
    const contextWithAnswer = {
      ...mockContext,
      quiz: [
        {
          options: [
            { label: 'Option 1', emoji: '😀', id: 0 },
            { label: 'Option 2', emoji: '😁', id: 1 },
          ],
          answer: { label: 'Option 1', emoji: '😀', id: 0 },
        },
      ],
    };
    renderComponent(contextWithAnswer);
  
    // Query the highlighted option by role and aria-selected
    const highlightedOption = screen.getByRole('option', { selected: true });
    expect(highlightedOption).toHaveClass('hover:text-[70px]');
  });
});