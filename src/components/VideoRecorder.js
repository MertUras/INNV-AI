import React, { useState, useRef, useEffect } from 'react';
import './Button.css'
import './Button'
const VideoRecorder = ({
  onVideoStop,
  onStopRecording,
  onNextQuestion,
  onRecordingStarted,
  showThinkingTime,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(45);
  const [thinkingTime, setThinkingTime] = useState(60);
  const videoRef = useRef();
  const mediaRecorderRef = useRef();

  useEffect(() => {
    if (showThinkingTime) {
      const timer = setInterval(() => {
        setThinkingTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showThinkingTime]);

  useEffect(() => {
    if (isRecording && recordingTime > 0) {
      const timer = setTimeout(() => {
        setRecordingTime(recordingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isRecording && recordingTime === 0) {
      stopRecording();
    }
  }, [isRecording, recordingTime]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      onVideoStop(e.data);
    };

    mediaRecorderRef.current.start();
    videoRef.current.srcObject = stream;
    setIsRecording(true);
    onRecordingStarted();
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(45);
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    onStopRecording();
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      {showThinkingTime && !isRecording && <p>Thinking time: {thinkingTime}s</p>}
      <p>{isRecording ? `Recording time: ${recordingTime}s` : ''}</p>
      <button className='btn--medium btn--outline btn' onClick={toggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default VideoRecorder;