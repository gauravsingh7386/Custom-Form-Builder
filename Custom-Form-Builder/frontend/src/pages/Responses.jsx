import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Responses() {
  const { id } = useParams(); // form ID
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const res = await axios.get(`http://localhost:5000/api/responses/${id}`);
        setResponses(res.data);
      } catch (err) {
        setError("Failed to load responses.");
      } finally {
        setLoading(false);
      }
    }
    fetchResponses();
  }, [id]);

  if (loading) return <p>Loading responses...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!responses.length) return <p>No responses yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Responses for Form {id}</h1>
      {responses.map((resp, index) => (
        <div key={resp._id} className="border p-4 rounded mb-4 bg-white shadow">
          <h2 className="font-semibold mb-2">Response #{index + 1}</h2>
          <p className="text-sm text-gray-500 mb-2">
            Submitted at: {new Date(resp.submittedAt).toLocaleString()}
          </p>
          <ul className="list-disc pl-5">
            {resp.answers.map(({ questionId, answer }, i) => (
              <li key={i}>
                <strong>Question ID:</strong> {questionId} <br />
                <strong>Answer:</strong> {answer}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
