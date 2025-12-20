# Smart Resume Screener 

Smart Resume Screener is a **machine learning–based resume classification system** that analyzes resumes and predicts the **most suitable job role** based on the **skills and keywords present in the resume text**.

The project uses **TF-IDF feature extraction** and **Logistic Regression** to automatically classify resumes into predefined job roles and is deployed as a **Flask REST API**.

---

## Project Overview

Manual resume screening is time-consuming and prone to inconsistency.  
This project automates the process by reading resumes, extracting text, and predicting a suitable job role using machine learning techniques.

The system supports resume uploads in **PDF and DOCX formats** and returns:
- Predicted job role  
- Confidence score  
- Detected technical skills  

---

## Objective

To develop an automated resume screening system that:
- Reads resume files automatically
- Converts resume text into numerical features
- Classifies resumes into appropriate job roles
- Assists recruiters in faster candidate evaluation

---

## Dataset

- Custom CSV dataset
- Columns:
  - `text` – Resume content
  - `role` – Corresponding job role
- Used to train the machine learning model

---

## Text Processing

The system performs the following text processing steps:
- Resume text extraction from PDF and DOCX files
- Tokenization and stop-word removal using TF-IDF
- Numerical feature generation from resume text

---

## Machine Learning Model

### TF-IDF + Logistic Regression

- **TF-IDF Vectorizer**
  - Converts resume text into numerical vectors
  - Removes common English stop words

- **Logistic Regression**
  - Trained on labeled resume data
  - Predicts the most suitable job role
  - Provides confidence scores for predictions

---

## Model Training

- Dataset loaded using **Pandas**
- TF-IDF applied on resume text
- Logistic Regression model trained on extracted features
- Trained artifacts saved using **Joblib**:
  - `model.pkl`
  - `vectorizer.pkl`

---

## Application Workflow

1. User uploads a resume (PDF or DOCX)
2. Resume text is extracted
3. Text is transformed using the trained TF-IDF vectorizer
4. Machine learning model predicts the job role
5. Confidence score is calculated
6. Technical skills are identified using keyword matching
7. Result is returned as a JSON response

---

## 🛠️ Tech Stack

- **Python**
- **Flask**
- **Flask-CORS**
- **scikit-learn**
- **Pandas**
- **PyPDF2**
- **python-docx**
- **Joblib**

---

## Team Members

- **Oviyashree C J** 
- **Anitha A**   
- **Janani S** 

  "skills": ["python", "flask", "sql"]
}
