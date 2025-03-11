import React from 'react';

const QuestionDisplay = ({ currentQuestion, timeLeft, playerAnswer, setPlayerAnswer, handleAnswerSubmit, feedback }) => {
  return (
    <div className="text-center">
      <h4>{currentQuestion?.question}</h4>
      <h5>Time Remaining: {timeLeft} seconds</h5>
      <form onSubmit={handleAnswerSubmit} className="mt-3">
        <input
          type="text"
          className="form-control mb-2"
          value={playerAnswer}
          onChange={(e) => setPlayerAnswer(e.target.value)}
          placeholder="Type your answer here..."
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {feedback && <p className="mt-2">{feedback}</p>}
    </div>
  );
};

export default QuestionDisplay