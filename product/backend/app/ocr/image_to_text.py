import pytesseract
import cv2

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text_from_image(path):

    img = cv2.imread(path)

    if img is None:
        return ""

    text = pytesseract.image_to_string(img)

    return text