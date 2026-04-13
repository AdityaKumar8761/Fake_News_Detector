import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

MODEL_PATH = "app/model/roberta_fake_news_model"

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

model.eval()


def predict_news(text):

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512
    )

    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1)

    confidence, predicted_class = torch.max(probs, dim=1)

    label = "FAKE" if predicted_class.item() == 0 else "REAL"

    return label, confidence.item()