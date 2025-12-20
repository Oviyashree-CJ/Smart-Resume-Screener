import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a resume file!");

    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      alert("Error while processing resume.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
          Smart Resume Screener
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2 mb-4"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Predict Role"}
          </button>
        </form>

        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-green-700">
              Predicted Role: {result.predicted_role}
            </h2>
            <p className="text-gray-700 mt-2">
              Confidence: {(result.confidence * 1000).toFixed(1)}%
            </p>

            {result.skills.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Extracted Skills:
                </h3>
                <div className="flex flex-wrap justify-center">
                  {result.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 m-1 rounded-full"
                    >
                      {skill}, 
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
