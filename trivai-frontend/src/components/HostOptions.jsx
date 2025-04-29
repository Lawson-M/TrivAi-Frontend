import React, { useState } from 'react';

const HostOptions = ({ 
    questionCount, 
    setQuestionCount,
    chosenTimer, 
    setChosenTimer,
    aiModel, 
    setAiModel,
    preventReuse, 
    setPreventReuse,
    allowImages, 
    setAllowImages 
}) => {

    return (
        <div className="fixed-bottom bg-dark text-white p-3 shadow">
            <div className="container">
                <div className="row justify-content-center align-items-center g-3">
                    <div className="col-md-2">
                        <label htmlFor="questionRange" className="form-label">
                            Number of Questions: {questionCount}
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            id="questionRange"
                            min="5"
                            max="30"
                            step="5"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="timeRange" className="form-label">
                            Time per Question: {chosenTimer}
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            id="questionRange"
                            min="10"
                            max="30"
                            step="1"
                            value={chosenTimer}
                            onChange={(e) => setChosenTimer(e.target.value)}
                        />
                    </div>
                    
                    <div className="col-md-auto">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) => setPreventReuse(e.target.checked)} />
                            <label class="form-check-label" for="flexSwitchCheckDefault">Prevent Seen Questions</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) => setAllowImages(e.target.checked)}/>
                            <label class="form-check-label" for="flexSwitchCheckDefault">Allow Images</label>
                        </div>
                    </div>
                    <div className="col-md-auto">
                        <div className="dropdown">
                            <button 
                                className="btn btn-secondary dropdown-toggle" 
                                type="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                {aiModel}
                            </button>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" type="button" onClick={() => setAiModel("gpt-4o")}>gpt-4o</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() => setAiModel("gpt-4-turbo")}>gpt-4-turbo</button></li>
                                <li><button className="dropdown-item" type="button" onClick={() => setAiModel("gpt-3.5-turbo")}>gpt-3.5-turbo</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostOptions;