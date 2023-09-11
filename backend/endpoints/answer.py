from flask import request, jsonify, Response
from endpoints.automacao.automacao import load_automacao
from endpoints.quimica.quimica import load_quimica
from endpoints.geral.geral import load_geral
from helpers.get_env_variables import get_openai_api_key, get_hugging_face_token
from helpers.chunks import get_text_chunks, get_vectors_store
from dotenv import load_dotenv

def get_answer():
    openai_api_key = get_openai_api_key()
    hugging_face_token = get_hugging_face_token()

    # Load variables from .env file into environment
    # load_dotenv()

    # Get the data from the body
    question = request.json['question']
    course = request.json['course']

    if course.lower() == "engenharia de controle e automação":
        # Loading the pdfs from engenharia de controle e automação
        load_automacao()
    
    elif course.lower() == "engenharia química":
        # Loading the pdfs from engenharia química
        load_quimica()
    
    else:
        return Response('Incorrect course type', status=400)

    # Loading the pdfs from geral
    text_geral = load_geral()

    # Get the text chunks
    text_geral_chunks = get_text_chunks(text_geral)

    return text_geral_chunks

    # Create vector store
    vectorstore = get_vectors_store(text_geral_chunks)

    # Open a file named 'hello.txt' in write mode ('w')
    with open('./endpoints/test.txt', 'w', encoding='utf-8') as file:
    # Write the text 'hello world' to the file
        file.write(vectorstore)

    return 'Finished'

    # Extract the answer, given some question
    # answer = question
    # return jsonify({ 'answer': answer })