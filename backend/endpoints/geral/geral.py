from os import listdir
from os.path import isfile, join
from helpers.pdf_handler import get_text_from_pdf

# Holds the information of the folder path
folder_path = './pdfs/geral'

# Returns the text of all pdfs from the folder 'geral'
def load_geral():
    # Holds the text of all pdfs
    all_pdfs_text = ''
    files = [f for f in listdir(folder_path) if isfile(join(folder_path, f))]

    for file in files:
        full_file_path = folder_path + '/' + file
        pdf_text = get_text_from_pdf(full_file_path)
        all_pdfs_text += pdf_text
    
    return all_pdfs_text