from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename
import os
import io
import sys


app = Flask(_name_)
CORS(app, resources={r'/': {'origins': ''}})

db_config = {
    'host': 'localhost',
    'user': 'your_username',
    'password': 'your_password',
    'database': 'video_responses'
}


def create_db_connection():
    try:
        connection = mysql.connector.connect(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
            database=db_config['database']
        )
        return connection
    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return None


@app.route('/api/questions', methods=['GET'])
def get_all_questions():
    connection = create_db_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM questions")
        questions = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(questions)
    else:
        return jsonify({"error": "Could not connect to the database"}), 500

@app.route('/api/participants', methods=['GET'])
def get_all_participants():
    connection = create_db_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM participants")
        participants = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(participants)
    else:
        return jsonify({"error": "Could not connect to the database"}), 500


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/video-response', methods=['POST'])
def save_video_response():
    if 'file' not in request.files:
        return jsonify({"error": "No file found in request"}), 400

    file = request.files['file']
    question_id = request.form.get('question_id')
    participant_id = request.form.get('participant_id')

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        connection = create_db_connection()
        if connection:
            cursor = connection.cursor()
            cursor.execute("""
                INSERT INTO video_responses (participant_id, question_id, video_response)
                VALUES (%s, %s, LOAD_FILE(%s))
            """, (participant_id, question_id, os.path.join(app.config['UPLOAD_FOLDER'], filename)))
            connection.commit()
            cursor.close()
            connection.close()
            return jsonify({"message": "Video response saved successfully"}), 200
        else:
            return jsonify({"error": "Could not connect to the database"}), 500
    else:
        return jsonify({"error": "Invalid file"}), 400


@app.route('/api/video-response/<int:participant_id>/<int:question_id>', methods=['GET'])
def get_video_response(participant_id, question_id):
    connection = create_db_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute("""
            SELECT video_response
            FROM video_responses
            WHERE participant_id = %s AND question_id = %s
        """, (participant_id, question_id))
        video_response = cursor.fetchone()
        cursor.close()
        connection.close()
        if video_response:
            return send_file(io.BytesIO(video_response[0]), mimetype='video/mp4')
        else:
            return jsonify({"error": "Video response not found"}), 404
    else:
        return jsonify({"error": "Could not connect to the database"}), 500


@app.route('/api/participants', methods=['POST'])
def save_participant():
    name = request.form.get('name')
    email = request.form.get('email')

    connection = create_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            cursor.execute("INSERT INTO participants (name, email) VALUES (%s, %s)", (name, email))
            connection.commit()
            cursor.close()
            connection.close()

            return jsonify({"id": cursor.lastrowid}), 201
        except Exception as e:
            print("Error saving participant:", e, file=sys.stderr)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Could not connect to the database"}), 500

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to the Emotion Recognition API!'})


if _name_ == '_main_':
    app.run(debug=True)