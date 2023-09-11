from dotenv import load_dotenv

# Load variables from .env file into environment
load_dotenv()

# Now you can access the variables as if they were in the environment
import os

# Api key from OpenAI
def get_openai_api_key(): 
    return os.getenv('OPENAI_API_KEY')

# Token from hugging face
def get_hugging_face_token():
    return os.getenv('HUGGINGFACEHUB_API_TOKEN')