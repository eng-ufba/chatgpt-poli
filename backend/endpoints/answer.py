from flask import request, jsonify, Response
from endpoints.automacao.automacao import load_automacao
from endpoints.quimica.quimica import load_quimica
from endpoints.geral.geral import load_geral
from helpers.get_env_variables import get_openai_api_key, get_hugging_face_token
from helpers.chunks import get_text_chunks, get_vectors_store, get_conversation_chain
from dotenv import load_dotenv
import pickle
import json

def get_answer():
    # Load variables from .env file into environment
    load_dotenv()

    # Get the data from the body
    question = request.json['question']
    print(question)
    course = request.json['course']
    message_for_no_answer = ''


    if course.lower() == "engenharia de controle e automação":
        message_for_no_answer = 'Envie sua dúvida para engquim@ufba.br, não há resposta disponível'

        # Load the vectorstore from a file, containing info from geral and engenharia de automacao
        with open("./automacao.pkl", "rb") as f:
            vectorstore = pickle.load(f)
    
    elif course.lower() == "engenharia química":
        message_for_no_answer = 'Envie sua dúvida para engautomacao@ufba.br, não há resposta disponível'

        # Load the vectorstore from a file, containing info from geral and engenharia química
        with open("./quimica.pkl", "rb") as f:
            vectorstore = pickle.load(f)
    
    else:
        return Response('Incorrect course type', status=400)

    # Loading the pdfs from geral
    # text_geral = load_geral()
    # print(text_geral)

    # Get the text chunks
    # text_geral_chunks = get_text_chunks(text_geral)
    # print(text_geral_chunks)

    # Create vector store
    # vectorstore = get_vectors_store(text_geral_chunks)

    # Create conversation chain
    conversation_chain = get_conversation_chain(vectorstore)

    response = conversation_chain({ 'question': question + '.Se não achar respostas nos textos, retorne exatamente a mensagem:' + message_for_no_answer })
    print(response)

    # Get the 'answer' property from the resonde
    answer = response['answer']
    return answer