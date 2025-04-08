import React from 'react';

const QuestionDisplay = ({ 
  currentQuestion, 
  timeLeft, 
  playerAnswer, 
  setPlayerAnswer, 
  handleAnswerSubmit, 
  feedback,
  hasAnsweredCorrectly 
}) => {
  return (
    <div className="question-container text-center">
      <h4>{currentQuestion?.question}</h4>
      <p>Time remaining: {timeLeft}</p>
      <form onSubmit={handleAnswerSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          value={playerAnswer}
          onChange={(e) => setPlayerAnswer(e.target.value)}
          placeholder="Your answer..."
          disabled={hasAnsweredCorrectly}
        />
        <button 
          type="submit" 
          className="btn btn-primary px-4"
          disabled={hasAnsweredCorrectly}
        >
          Submit Answer
        </button>
      </form>
      {feedback && <p className={`mt-3 ${feedback === 'Correct!' ? 'text-success' : 'text-danger'}`}>{feedback}</p>}
    </div>
  );
};

export default QuestionDisplay