from flask import request, jsonify, Response
from endpoints.automacao.automacao import load_automacao
from endpoints.quimica.quimica import load_quimica
from endpoints.geral.geral import load_geral

def get_answer():
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
    load_geral()

    # Extract the answer, given some question
    answer = question
    return jsonify({ 'answer': answer })