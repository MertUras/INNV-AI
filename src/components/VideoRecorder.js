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
  const [recordedChunks, setRecordedChunks] = useState([]);

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
      setRecordedChunks((prev) => [...prev, e.data]);
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

  const downloadVideo = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'recorded-video.webm';
    a.click();
    window.URL.revokeObjectURL(url);
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
      {recordedChunks.length > 0 && (
        <button className='btn--medium btn--outline btn' onClick={downloadVideo}>
          Download Video
        </button>
      )}
    </div>
  );
};

export default VideoRecorder;