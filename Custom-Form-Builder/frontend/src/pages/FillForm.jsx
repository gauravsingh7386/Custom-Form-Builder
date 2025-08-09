import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FillForm() {
  const { id } = useParams(); // form ID from URL
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function fetchForm() {
      try {
        const res = await axios.get(`http://localhost:5000/api/forms/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error("Error fetching form:", err);
        setError("Failed to load form. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchForm();
  }, [id]);

  // Handle input changes, questionId can be main or sub-question
  function handleAnswerChange(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitSuccess(false);
    setError(null);

    try {
      // Prepare answers: each answer has questionId and answer string
      const payload = {
        formId: id,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };

      await axios.post("http://localhost:5000/api/responses", payload);
      setSubmitSuccess(true);
      setAnswers({}); 
    } catch (error) {
    //   console.error(error);
      setError("Failed to submit response. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  }

  if (loading) return <p className="text-center mt-10">Loading form...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!form) return <p className="text-center mt-10">Form not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{form.title}</h1>

      {form.headerImage && (
        <img
          src={form.headerImage}
          alt="Form header"
          className="mb-6 max-h-48 object-contain rounded"
        />
      )}

      <form onSubmit={handleSubmit}>
        {form.questions.map((q, idx) => (
          <div key={q._id || idx} className="mb-6 border p-4 rounded shadow bg-white">
            <h3 className="font-semibold mb-2 capitalize">{q.type} Question</h3>
            <p className="mb-2">{q.questionText}</p>
            {(q.imageUrl || q.image) && (
              <img
                src={q.imageUrl || q.image}
                alt={`Question ${idx + 1}`}
                className="mb-4 max-h-32 object-contain rounded"
              />
            )}

            {/* Main question answer input */}
            <input
              type="text"
              value={answers[q._id] || ""}
              onChange={(e) => handleAnswerChange(q._id, e.target.value)}
              className="border p-2 w-full rounded mb-4"
              placeholder="Your answer"
              required
              disabled={submitLoading}
            />

            {/* If comprehension, render sub-questions */}
            {q.type.toLowerCase() === "comprehension" && q.subQuestions && (
              <div className="ml-6 border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold mb-2">Sub-Questions:</h4>
                {q.subQuestions.map((subQ, subIdx) => (
                  <div key={subQ._id || subIdx} className="mb-4">
                    <p className="mb-1">{subQ.text}</p>
                    {(subQ.imageUrl || subQ.image) && (
                      <img
                        src={subQ.imageUrl || subQ.image}
                        alt={`Sub-question ${subIdx + 1}`}
                        className="mb-2 max-h-24 object-contain rounded"
                      />
                    )}
                    <input
                      type="text"
                      value={answers[subQ._id] || ""}
                      onChange={(e) => handleAnswerChange(subQ._id, e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="Your answer"
                      required
                      disabled={submitLoading}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={submitLoading}
          className={`px-6 py-3 rounded text-white ${
            submitLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {submitLoading ? "Submitting..." : "Submit Response"}
        </button>

        {submitSuccess && (
          <p className="mt-4 text-green-600 font-semibold">Response submitted successfully!</p>
        )}

        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      </form>
    </div>
  );
}
