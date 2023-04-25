from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/save-video', methods=['POST'])
def save_video():
    video_data = request.get_data()
    filename = 'video.webm' # set a filename for the video
    with open(filename, 'wb') as f:
        f.write(video_data)
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
