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