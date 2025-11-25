# HMCTS Task Creator Frontend

This is a small React application built to accompany the HMCTS Task API.  
It allows users to create a task using a simple web form and sends the data to the backend.

The form captures:

- Title  
- Description (optional)  
- Status  
- Due date and time  

After submitting the form, the created task is displayed with its ID, timestamps, and other details.

---

## Requirements

- Node.js (v16+ recommended)
- npm

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Running the development server

```bash
npm run dev
```

The application will be available at:

```
http://127.0.0.1:5173
```

Ensure that the backend is running on:

```
http://127.0.0.1:8000
```

---

## Project Structure

```
hmcts-tasks-frontend/
│
├── src/
│    ├── App.tsx          # Main application component
│    └── main.tsx         # Entry point
│
├── public/
└── README.md
```

---

## Notes

- Axios is used to handle the POST request to the backend.
- CORS is enabled on the backend to allow requests from the Vite development server.
