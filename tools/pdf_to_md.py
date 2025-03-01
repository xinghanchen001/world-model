import fitz  # PyMuPDF
import os
import re

def clean_text(text):
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text)
    # Replace common PDF artifacts
    text = text.replace('• ', '* ')
    return text.strip()

def convert_pdf_to_markdown(pdf_path, output_path):
    # Open the PDF
    doc = fitz.open(pdf_path)
    markdown_content = f"# {os.path.basename(pdf_path).replace('.pdf', '')}\n\n"
    
    # Process each page
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        cleaned_text = clean_text(text)
        
        # Add page content to markdown
        markdown_content += cleaned_text + "\n\n"
    
    # Write markdown content to file
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(markdown_content)
    
    print(f"Conversion complete! Markdown saved to {output_path}")

if __name__ == "__main__":
    # Paths
    pdf_path = "superline academy.pdf"
    output_dir = "research"
    output_file = "superline_academy.md"
    output_path = os.path.join(output_dir, output_file)
    
    # Run conversion
    convert_pdf_to_markdown(pdf_path, output_path) 