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
    <form onSubmit={handleSubmit} className="mt-3">
      <input
        type="text"
        className="form-control mb-2"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

PromptInput.propTypes = {
  onPromptSubmit: PropTypes.func.isRequired,
};

export default PromptInput;