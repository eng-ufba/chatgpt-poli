from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS

def get_text_chunks(raw_text):
    text_splitter = CharacterTextSplitter(
        separator="\n", # The separator gonnar be single line break
        chunk_size=1000, # The num of characters of each chunk
        chunk_overlap=200, # Prevents breaks, when the chunk end at the start of the other
        length_function=len
    )
    chunks = text_splitter.split_text(raw_text)
    return chunks

def get_vectors_store(text_chunks):
    # embeddings = OpenAIEmbeddings()
    embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-xl")
    vector_store = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vector_store