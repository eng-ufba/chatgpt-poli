from PyPDF2 import PdfReader

def get_text_from_pdf(full_file_path):
    text = ""

    with open(full_file_path, 'rb') as pdf_file:
        # Create a PDF object
        pdf_reader = PdfReader(pdf_file)

        # Get the total number of pages in the PDF
        num_pages = len(pdf_reader.pages)

        # Read each page and extract text
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            page_text = page.extract_text()
            text += page_text

    return text