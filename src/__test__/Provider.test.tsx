import { render, screen, act, waitFor } from '@testing-library/react';
import MyProvider, { MyContext } from '../context/provider'; // Adjust the path as needed
import React from 'react';

describe('MyProvider Component', () => {
  it('should initialize with default context values', async () => {
    render(
      <MyProvider>
        <MyContext.Consumer>
          {({ quiz, quizIndex, animate }: any) => (
            <>
              <div data-testid="quiz-length">{quiz.length}</div>
              <div data-testid="quiz-index">{quizIndex}</div>
              <div data-testid="animate">{String(animate)}</div>
            </>
          )}
        </MyContext.Consumer>
      </MyProvider>
    );

    // Check if the quiz has 5 questions
    expect(screen.getByTestId('quiz-length').textContent).toBe('5');

    // Check if quizIndex is 0 (initial state)
    expect(screen.getByTestId('quiz-index').textContent).toBe('0');

    // Wait for the animate state to update after useEffect is triggered
    await waitFor(() => {
      expect(screen.getByTestId('animate').textContent).toBe('false');
    });
  });

  it('should update quizIndex when it is changed', async () => {
    render(
      <MyProvider>
        <MyContext.Consumer>
          {({ quizIndex, setQuizIndex }: any) => (
            <>
              <div data-testid="quiz-index">{quizIndex}</div>
              <button onClick={() => setQuizIndex(2)}>Change Quiz Index</button>
            </>
          )}
        </MyContext.Consumer>
      </MyProvider>
    );

    // Initial quizIndex should be 0
    expect(screen.getByTestId('quiz-index').textContent).toBe('0');

    // Simulate changing the quiz index
    act(() => {
      screen.getByText('Change Quiz Index').click();
    });

    // After clicking, quizIndex should be 2
    expect(screen.getByTestId('quiz-index').textContent).toBe('2');
  });

  it('should toggle animate state when quizIndex changes', async () => {
    render(
      <MyProvider>
        <MyContext.Consumer>
          {({ animate }: any) => <div data-testid="animate">{String(animate)}</div>}
        </MyContext.Consumer>
      </MyProvider>
    );

    // Initially, the animate state should be true (because of useEffect)
    expect(screen.getByTestId('animate').textContent).toBe('true');

    // Wait for animate state to revert back to false
    await waitFor(() => {
      expect(screen.getByTestId('animate').textContent).toBe('false');
    });
  });
});