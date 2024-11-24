import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Summary from '../components/Summary';
import { MyContext } from '../context/provider';
import { toast } from 'react-toastify';

// Mock the fetch API
global.fetch = jest.fn();

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockSetQuizIndex = jest.fn();
const mockSetQuiz = jest.fn();
const mockSetAnimate = jest.fn();

const mockContextValue = {
    quiz: [
      { question: 'Question 1', options: [{ emoji: '😀', label: 'Option 1', id: 0 }], answer: { emoji: '😀', label: 'Option 1', id: 0 } },
      { question: 'Question 2', options: [{ emoji: '😁', label: 'Option 2', id: 1 }], answer: { emoji: '😁', label: 'Option 2', id: 1 } },
    ],
    setQuiz: mockSetQuiz,
    quizIndex: 0, // or any valid index
    setQuizIndex: mockSetQuizIndex,
    animate: false,
    setAnimate: mockSetAnimate,
  };

const renderSummary = () => {
  return render(
    <MyContext.Provider value={mockContextValue}>
      <Summary />
    </MyContext.Provider>
  );
};

describe('Summary Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders quiz summary correctly', () => {
    renderSummary();

    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('😀')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('calls setQuizIndex when "Back" button is clicked', () => {
    renderSummary();

    const backButton = screen.getByText('← Back');
    fireEvent.click(backButton);

    expect(mockSetQuizIndex).toHaveBeenCalledWith(mockContextValue.quiz.length - 1);
  });

  test('shows loader when submitting quiz', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 201,
      json: jest.fn().mockResolvedValue({ success: true }),
    });

    renderSummary();

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  test('handles successful submission', async () => {
    // Mock fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
        status: 201,
        json: jest.fn().mockResolvedValue({ success: true }),
    });

    render(
        <MyContext.Provider value={mockContextValue}>
            <Summary />
        </MyContext.Provider>
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Ensure the loader appears
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // Wait for the loader to disappear and toast to be called
    await waitFor(
        () => {
            expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
        },
        { timeout: 4000 } // Extend timeout to cover setTimeout in the component
    );

    // Check for success toast
    expect(toast.success).toHaveBeenCalledWith('Saved Successfully');
});

  (global.fetch as jest.Mock).mockResolvedValue({
    status: 500, // Simulate server error
    json: jest.fn().mockResolvedValue({}),
});

test('handles error during submission', async () => {
    render(
        <MyContext.Provider value={mockContextValue}>
            <Summary />
        </MyContext.Provider>
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());

    // Check if error toast is shown
    expect(toast.error).toHaveBeenCalledWith('An error occurred. Please try again.');
});

  test('disables submit button when loading', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 201,
      json: jest.fn().mockResolvedValue({ success: true }),
    });

    renderSummary();

    const submitButton = screen.getByText('Submit');

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});