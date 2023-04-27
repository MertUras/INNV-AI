import React, { useState } from 'react';
import './Interview.css';
import './Button.css'
import './Button'
import VideoRecorder from './VideoRecorder';
import axios from 'axios';

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
  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setVideoBlob(null);
      setShowThinkingTime(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setVideoBlob(null);
      setShowThinkingTime(true);
    }
  };

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
  const saveVideoResponse = async (videoBlob, participantId, questionId) => {
    try {
      const formData = new FormData();
      formData.append("file", new File([videoBlob], `question_${questionId}.mp4`));
      formData.append("participant_id", participantId);
      formData.append("question_id", questionId);

      const response = await axios.post("http://localhost:5000/api/video-response", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Video saved:", response);
    } catch (error) {
      console.error("Error saving video:", error);
    }
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
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        onRecordingStarted={onRecordingStarted}
        saveVideoResponse={saveVideoResponse}
        showThinkingTime={showThinkingTime}
      />

    </div>
  );
}

export default App;