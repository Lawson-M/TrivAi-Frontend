import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PromptInput = ({ onPromptSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPromptSubmit(prompt);
    setPrompt('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 text-center">
      <input
        type="text"
        className="form-control mb-3"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
      />
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary px-4">
          Submit
        </button>
      </div>
    </form>
  );
};

PromptInput.propTypes = {
  onPromptSubmit: PropTypes.func.isRequired,
};

export default PromptInput;