import React, { useState } from 'react';
import './Interview.css';
import './Button.css'
import './Button'
import VideoRecorder from './VideoRecorder';

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [videoBlob, setVideoBlob] = useState(null);
  const [showThinkingTime, setShowThinkingTime] = useState(true);

  const questions = [
    "Tell us about your experience working in a team.",
    "What motivates you to do your best work?",
    "Describe a difficult problem you faced and how you overcame it.",
    "How do you prioritize tasks and manage your time effectively?",
    "Tell us about a time when you had to adapt to a new technology or process.",
    "What is your approach to resolving conflicts with coworkers or team members?",
    "How do you stay up to date on industry trends and advancements?",
    "Tell us about a project you led or managed from start to finish.",
    "Describe a time when you had to make a tough decision with limited information.",
    "'What are your long-term career goals and how do you plan to achieve them?",
    // Add the rest of the questions here
  
  ];

  const onVideoStop = (blob) => {
    setVideoBlob(blob);
  };

  const onStopRecording = () => {
    console.log('Video saved:', videoBlob);
  };

  const onNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setVideoBlob(null);
      setShowThinkingTime(true);
    }
  };

  const onRecordingStarted = () => {
    setShowThinkingTime(false);
  };

  return (
    <div className="App">
            <header className="App-header">
        <h1>Video Interview</h1>
      </header>
      <h1>{questions[questionIndex]}</h1>
      <VideoRecorder
        onVideoStop={onVideoStop}
        onStopRecording={onStopRecording}
        onNextQuestion={onNextQuestion}
        onRecordingStarted={onRecordingStarted}
        showThinkingTime={showThinkingTime}
      />
      <button className='btn--medium btn--outline btn' onClick={onNextQuestion} disabled={!videoBlob}>
        Next Question
      </button>
    </div>
  );
}

export default App;