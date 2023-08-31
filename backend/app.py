from flask import Flask, jsonify, request, Response
from endpoints.answer import get_answer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Endpoint to check if the backend is working fine
@app.route('/ping', methods=['GET'])
def ping_pong():
    return 'pong'

# Endpoint that receive an question and return an answer
@app.route('/question', methods=['POST'])
def generate_answer():
    return get_answer()

if __name__ == "__main__":
    app.run(debug=True)