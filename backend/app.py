from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import PyPDF2
import io
from sklearn.feature_extraction.text import TfidfVectorizer
import docx

app = Flask(__name__)
CORS(app) 

# Load model and vectorizer
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

from io import BytesIO

def extract_text(file):
    """Extract text from PDF or DOCX resume."""
    try:
        filename = file.filename.lower()
        file.seek(0)

        if filename.endswith(".pdf"):
            file_bytes = file.read()
            reader = PyPDF2.PdfReader(BytesIO(file_bytes))
            text = ""
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text

            return text
        elif filename.endswith(".docx"):
            file_bytes = file.read()
            doc = docx.Document(BytesIO(file_bytes))
            return " ".join([p.text for p in doc.paragraphs])
        else:
            return ""
    except Exception as e:
        print(f"Error extracting text: {e}")
        return ""

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "resume" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["resume"]
        text = extract_text(file)

        if not text.strip():
            return jsonify({"error": "Could not extract text from resume"}), 400

        X = vectorizer.transform([text])
        prediction = model.predict(X)[0]
        confidence = max(model.predict_proba(X)[0])

        skill_keywords = ["python", "java", "react", "flask", "sql", "html", "css",
                          "pandas", "ml", "cloud", "figma", "android", "docker"]
        skills = [word for word in text.lower().split() if word in skill_keywords]

        return jsonify({
            "predicted_role": prediction,
            "confidence": round(float(confidence), 2),
            "skills": list(set(skills))
        })
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
