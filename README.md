# Custom Form Builder

A custom form builder application with unique question types (Categorize, Cloze, Comprehension) that allows users to create, preview, and fill forms. The responses are saved to a MongoDB backend.

---

## Features

- Create forms with a title and optional header image
- Add three types of questions:
  - **Categorize**  
  - **Cloze**  
  - **Comprehension** (with sub-questions)
- Add images to both questions and sub-questions
- Preview and fill the form through a unique link
- Save responses to MongoDB
- Clean, user-friendly UI inspired by popular form builders but customized uniquely

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Cloudinary (for image uploads)  
- **Version Control:** Git & GitHub

---

Setup Instructions

Backend

Open terminal and navigate to the backend folder:
cd backend

Install backend dependencies:
npm install

Create a .env file in the backend folder and add these environment variables:

MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Start the backend server:
npx nodemon server.js

Frontend

Open terminal and navigate to the frontend folder:
cd frontend

Install frontend dependencies:
npm install

Start the frontend server:
npm run dev



How to Use
Open the frontend app in your browser (usually at http://localhost:5173).

Create a new form using the Create Form page:

Enter form title

Upload header image (optional)

Add questions of different types

Add images for questions and sub-questions (if any)

Save the form

Use the generated form ID or link to preview and fill the form.

Responses will be saved in the backend database.

Project Structure
/backend - Express server, MongoDB models, and API routes

/frontend - React app with pages and components

.gitignore to exclude node_modules, build folders, and sensitive .env files

Repository Link
You can find the full project code here:
https://github.com/gauravsingh7386/Custom-Form-Builder

Contact
Feel free to reach out if you have questions or feedback.


