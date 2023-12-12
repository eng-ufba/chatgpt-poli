from flask import request, Response
from helpers.chunks import get_conversation_chain
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from dotenv import load_dotenv
import pickle
import os

def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=512,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def get_conversation_chain(vectorstore):
    llm = ChatOpenAI()
    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return conversation_chain

def load_vectorstore_from_file(course):
    filename = f"engenharia_de_controle_e_automacao.pkl" # Fallback will be engenharia de controle e automação

    if course.lower() == "engenharia de controle e automação":
        filename = f"engenharia_de_controle_e_automacao.pkl"

    elif course.lower() == "engenharia química":
        filename = f"engenharia_quimica.pkl"

    with open(filename, "rb") as f:
        vectorstore = pickle.load(f)
    return vectorstore
    
def load_vectorstore(course, pdf_docs):
    raw_text = get_pdf_text(pdf_docs)
    text_chunks = get_text_chunks(raw_text)
    vectorstore = get_vectorstore(text_chunks)

    # Save the vectorstore to a file 
    if course.lower() == "engenharia de controle e automação":
        with open("engenharia_de_controle_e_automacao.pkl", "wb") as f:
            pickle.dump(vectorstore, f)

    elif course.lower() == "engenharia química":
        with open("engenharia_quimica.pkl", "wb") as f:
            pickle.dump(vectorstore, f)

    return vectorstore

def process_pdfs_and_get_answer(question, pdf_docs):
    load_dotenv()
    course = request.json['course']
    # vectorstore = load_vectorstore(course, pdf_docs) # Uncomment this function when need to change some pdf
    vectorstore = load_vectorstore_from_file(course) # Comment this function when need to change some pdf

    conversation_chain = get_conversation_chain(vectorstore)
    raw_answer = conversation_chain({'question': question})
    answer = raw_answer['chat_history'][-1].content
    return answer

def get_file_names(path):
    # Get all files in the specified path
    files = [os.path.join(path, f) for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]
    return files

def get_answer():
    # Get the data from the body
    question = request.json['question']
    print(question)
    course = request.json['course']
    message_for_no_answer = ''
    pdf_files = []

    if course.lower() == "engenharia de controle e automação":
        message_for_no_answer = 'Envie sua dúvida para engautomacao@ufba.br, não há resposta disponível'

        # Load all pdf files from automacao
        pdf_files = get_file_names("./pdfs/automacao/")

    elif course.lower() == "engenharia química":
        message_for_no_answer = 'Envie sua dúvida para engquim@ufba.br, não há resposta disponível'

        # Load all pdf files from quimica
        pdf_files = get_file_names("./pdfs/quimica/")
        
    else:
        return Response('Incorrect course type', status=400)

    question = question + '.Se não achar NENHUMA RESPOSTA, retorne a mensagem:' + message_for_no_answer
    answer = process_pdfs_and_get_answer(question, pdf_files)
    print("Answer:", answer)
    return answer