# DCIT 26 Lab 5 — Express and MongoDB

Student Records REST API built with Node.js, Express, MongoDB, and Mongoose.

## Requirements

- Node.js and npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- VS Code, plus Postman or Thunder Client for testing

## Setup

1. Open this project folder in VS Code.
2. Open Terminal → New Terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to a new file named `.env`.
5. Check the MongoDB URI in `.env`. For local MongoDB:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/lab5_students
   PORT=5000
   ```

6. Start the server:

   ```bash
   npm run dev
   ```

The server starts only after it connects to MongoDB.

## API routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Check server status |
| GET | `/api/students` | List all students |
| GET | `/api/students/:id` | Get one student |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

### Example request body

```json
{
  "fullName": "Alex Santos",
  "course": "BSIT",
  "yearLevel": 2,
  "section": "IT-2A"
}
```

## Test with Postman or Thunder Client

Use `http://localhost:5000` as the base URL.

1. `GET /api/health`
2. `POST /api/students` with the JSON body above.
3. Copy the `_id` from the response.
4. `GET /api/students`
5. `GET /api/students/PASTE_ID_HERE`
6. `PUT /api/students/PASTE_ID_HERE` with an updated JSON body.
7. `DELETE /api/students/PASTE_ID_HERE`

Expected common status codes: `200` for successful reads/updates/deletes, `201` for creation, `400` for invalid input or IDs, `404` when a student is not found, and `500` for unexpected server errors.

## MongoDB verification

Open MongoDB Compass and connect to `mongodb://127.0.0.1:27017`. After creating a student, look for database `lab5_students` and collection `students`.

## GitHub submission

Do not commit `.env` or `node_modules`. Commit `.env.example` instead.

```bash
git init
git add .
git commit -m "Complete DCIT 26 Lab 5 Student Records API"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Create the GitHub repository named `dcit26-lab5-express-mongodb` first, then replace the placeholder remote URL with your repository URL.
