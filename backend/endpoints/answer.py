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

def process_pdfs_and_get_answer(question, pdf_docs):
    load_dotenv()
    raw_text = get_pdf_text(pdf_docs)
    text_chunks = get_text_chunks(raw_text)
    vectorstore = get_vectorstore(text_chunks)

    # Save the vectorstore to a file (optional)
    with open("vectorstore.pkl", "wb") as f:
        pickle.dump(vectorstore, f)

    conversation_chain = get_conversation_chain(vectorstore)
    raw_answer = conversation_chain({'question': question})
    answer = raw_answer['chat_history'][-1].content
    return answer

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
        pdf_files = [
            "./pdfs/automacao/06_-_regulamento_de_atividades_complementares_assinado_1.pdf", 
            "./pdfs/automacao/proposta_ac_nova_01_2019.pdf",
            "./pdfs/automacao/resolucao_01_2009_-_cceca.pdf",
            "./pdfs/automacao/resolucao_01_2017_atividades_complementares_mafm_v00.pdf",
            "./pdfs/automacao/resolucao_01_2019_complementarresolucao012017.docx_.pdf",
            "./pdfs/automacao/resolucao_02_2017_trabalhos_conclusao_curso.pdf",
            "./pdfs/automacao/resolucao_02_2019_trabalhos_conclusao_cceca.pdf",
            "./pdfs/automacao/template_projeto_inovacao_tecnologica_tcc.pdf",
            "./pdfs/automacao/P9VZGIHQBE30W0YZ.pdf",
            "./pdfs/automacao/REGPG_Revisado_Resolucao_03_2017.pdf",
            "./pdfs/automacao/resolucao_04.2019_-_consuni_0_0.pdf"
        ]
    
    elif course.lower() == "engenharia química":
        message_for_no_answer = 'Envie sua dúvida para engquim@ufba.br, não há resposta disponível'

        # Load all pdf files from quimica
        pdf_files = [
            "./pdfs/quimica/P9VZGIHQBE30W0YZ.pdf",
            "./pdfs/quimica/REGPG_Revisado_Resolucao_03_2017.pdf",
            "./pdfs/quimica/resolucao_04.2019_-_consuni_0_0.pdf",
            "./pdfs/quimica/resolucao_cceq_-01-2012_estagio_0.pdf",
            "./pdfs/quimica/resolucao_cceq-0105_atividades_complementares_0.pdf",
            "./pdfs/quimica/resolucao_cceq-0208_trancamento_permanencia_0.pdf",
            "./pdfs/quimica/resolucao_tfc_2017_0.pdf"
        ]
        
    else:
        return Response('Incorrect course type', status=400)

    question = question + '.Se não achar NENHUMA RESPOSTA, retorne a mensagem:' + message_for_no_answer
    answer = process_pdfs_and_get_answer(question, pdf_files)
    print("Answer:", answer)
    return answer