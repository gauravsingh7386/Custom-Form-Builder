import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PreviewForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/forms/${id}`)
      .then(res => setForm(res.data))
      .catch(err => alert("Error loading form: " + err.message));
  }, [id]);

  if (!form) return <div>Loading form...</div>;

  function handleChange(questionIndex, value) {
    setResponses(prev => ({ ...prev, [questionIndex]: value }));
  }

  function handleSubmit() {
    // TODO: Implement submit responses to backend
    console.log("User responses", responses);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{form.title}</h1>
      {form.headerImage && (
        <img src={form.headerImage} alt="Header" className="mb-6 max-h-48 object-contain rounded" />
      )}

      {form.questions.map((q, i) => (
        <div key={i} className="mb-6">
          <h3 className="font-semibold mb-2">{q.type} Question</h3>
          <p className="mb-2">{q.text || q.questionText}</p>
          {/* For now simple text input, improve later based on type */}
          <input
            type="text"
            value={responses[i] || ""}
            onChange={e => handleChange(i, e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
      >
        Submit Responses
      </button>
    </div>
  );
}
