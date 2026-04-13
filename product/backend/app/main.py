from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import os

from .model.predictor import predict_news
from .ocr.image_to_text import extract_text_from_image
from .scraper.article_extractor import extract_text_from_url

app = FastAPI(title="Fake News Detection API")


# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================= REQUEST MODELS =================
class TextRequest(BaseModel):
    text: str

class URLRequest(BaseModel):
    url: str


# ================= ROOT =================
@app.get("/")
def home():
    return {"message": "Fake News Detection Backend Running 🚀"}


# ================= TEXT PREDICTION =================
@app.post("/predict-text")
def predict_text(req: TextRequest):

    try:
        label, confidence = predict_news(req.text)

        return {
            "prediction": label,
            "confidence": float(confidence)
        }

    except Exception as e:
        print("TEXT ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))


# ================= IMAGE PREDICTION =================
@app.post("/predict-image")
async def predict_image(file: UploadFile = File(...)):

    try:
        temp_path = f"temp_{file.filename}"

        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        extracted_text = extract_text_from_image(temp_path)

        os.remove(temp_path)

        # ⭐ VERY IMPORTANT SAFETY
        if extracted_text is None or len(extracted_text.strip()) < 20:
            return {
                "prediction": "UNKNOWN",
                "confidence": 0,
                "message": "No readable text found in image"
            }

        label, confidence = predict_news(extracted_text)

        return {
            "prediction": label,
            "confidence": float(confidence),
            "extracted_text": extracted_text[:500]
        }

    except Exception as e:
        print("IMAGE ERROR:", e)
        return {
            "prediction": "ERROR",
            "confidence": 0,
            "message": str(e)
        }


# ================= URL PREDICTION =================
@app.post("/predict-url")
def predict_url(req: URLRequest):

    try:
        article_text = extract_text_from_url(req.url)

        label, confidence = predict_news(article_text)

        return {
            "prediction": label,
            "confidence": float(confidence),
            "article_preview": article_text[:500]
        }

    except Exception as e:
        print("URL ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))