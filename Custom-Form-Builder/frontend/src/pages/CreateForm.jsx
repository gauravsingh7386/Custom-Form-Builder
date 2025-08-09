import React, { useState } from "react";
import axios from "axios";

const QUESTION_TYPES = ["Categorize", "Cloze", "Comprehension"];

export default function CreateForm() {
  const [formTitle, setFormTitle] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [questions, setQuestions] = useState([]);

  // Add a new question of the selected type
  function addQuestion(type) {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        questionText: "", 
        imageUrl: null,  
        ...(type === "Comprehension" ? { subQuestions: [] } : {}),
      },
    ]);
  }

  // Update a question field by id
  function updateQuestion(id, updatedFields) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updatedFields } : q))
    );
  }

  // Update a sub-question by question id and sub-question index
  function updateSubQuestion(questionId, subIndex, updatedFields) {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const updatedSubs = q.subQuestions.map((subQ, idx) =>
            idx === subIndex ? { ...subQ, ...updatedFields } : subQ
          );
          return { ...q, subQuestions: updatedSubs };
        }
        return q;
      })
    );
  }

  // Add sub-question to a comprehension question
  function addSubQuestion(questionId) {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const updatedSubs = q.subQuestions
            ? [...q.subQuestions, { id: Date.now(), questionText: "", imageUrl: null }]
            : [{ id: Date.now(), questionText: "", imageUrl: null }];
          return { ...q, subQuestions: updatedSubs };
        }
        return q;
      })
    );
  }

  // Remove sub-question from a comprehension question
  function removeSubQuestion(questionId, subIndex) {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const updatedSubs = q.subQuestions.filter((_, idx) => idx !== subIndex);
          return { ...q, subQuestions: updatedSubs };
        }
        return q;
      })
    );
  }

  // Handle header image upload
  function handleHeaderImageChange(e) {
    const file = e.target.files[0];
    if (file) setHeaderImage(URL.createObjectURL(file));
  }

  // Save form function to send data to backend
  async function saveForm() {
    try {
      const payload = {
        title: formTitle.trim(),
        headerImage: headerImage || null,
        questions: questions.map(({ type, questionText, imageUrl, subQuestions }) => ({
          type: type.toLowerCase(),
          questionText: questionText.trim(),
          imageUrl: imageUrl || null,
          subQuestions: subQuestions
            ? subQuestions.map(({ questionText, imageUrl }) => ({
                questionText: questionText.trim(),
                imageUrl: imageUrl || null,
              }))
            : undefined,
        })),
      };

     

      const response = await axios.post("http://localhost:5000/api/forms", payload);

      alert("Form saved! ID: " + response.data._id);
      // Optional: Clear form after save
      setFormTitle("");
      setHeaderImage(null);
      setQuestions([]);
    } catch (error) {
      console.error(error);
      alert("Error saving form: " + (error.response?.data?.error || error.message));
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Form</h1>

      {/* Form Title Input */}
      <input
        type="text"
        placeholder="Enter form title"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        className="border p-3 w-full mb-6 rounded"
      />

      {/* Header Image Upload */}
      <div className="mb-8">
        <label className="block mb-2 font-semibold">Header Image (optional):</label>
        <input type="file" accept="image/*" onChange={handleHeaderImageChange} />
        {headerImage && (
          <img
            src={headerImage}
            alt="Header Preview"
            className="mt-4 max-h-48 object-contain rounded"
          />
        )}
      </div>

      {/* Buttons to add questions */}
      <div className="mb-8 flex gap-4">
        {QUESTION_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => addQuestion(type)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Add {type} Question
          </button>
        ))}
      </div>

      {/* List of questions */}
      <div className="space-y-6">
        {questions.map(({ id, type, questionText, imageUrl, subQuestions = [] }) => (
          <div key={id} className="border p-4 rounded shadow bg-white">
            <h3 className="font-semibold mb-3">{type} Question</h3>

            {/* Question text input */}
            <input
              type="text"
              placeholder="Enter question text"
              value={questionText}
              onChange={(e) => updateQuestion(id, { questionText: e.target.value })}
              className="border p-2 w-full rounded mb-3"
            />

            {/* Question image upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  updateQuestion(id, { imageUrl: URL.createObjectURL(file) });
                }
              }}
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Question Preview"
                className="mt-3 max-h-32 object-contain rounded"
              />
            )}

            {/* Render sub-questions if comprehension */}
            {type === "Comprehension" && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-semibold mb-2">Sub-Questions</h4>

                {subQuestions.map((subQ, idx) => (
                  <div key={subQ.id || idx} className="mb-3">
                    <input
                      type="text"
                      placeholder={`Sub-question ${idx + 1} text`}
                      value={subQ.questionText || ""}
                      onChange={(e) =>
                        updateSubQuestion(id, idx, { questionText: e.target.value })
                      }
                      className="border p-2 w-full rounded mb-1"
                    />
                    {/* Add image upload for sub-question */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          updateSubQuestion(id, idx, {
                            imageUrl: URL.createObjectURL(file),
                          });
                        }
                      }}
                    />
                    {subQ.imageUrl && (
                      <img
                        src={subQ.imageUrl}
                        alt={`Sub-question ${idx + 1} preview`}
                        className="mt-2 max-h-24 object-contain rounded"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeSubQuestion(id, idx)}
                      className="text-red-600 mt-1"
                    >
                      Remove Sub-Question
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addSubQuestion(id)}
                  className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Add Sub-Question
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Save Form button */}
      <button
        onClick={saveForm}
        className="mt-10 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
      >
        Save Form
      </button>
    </div>
  );
}
