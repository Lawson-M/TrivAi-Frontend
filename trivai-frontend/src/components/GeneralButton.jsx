import React from 'react';

const GeneralButton = ({ onClick, content }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {content}
    </button>
  );
};

export default GeneralButton;