require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Student Records API is running",
  });
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    console.error("GET students error:", error.message);
    res.status(500).json({ message: "Failed to retrieve students." });
  }
});

app.get("/api/students/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid student ID." });
  }

  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("GET student error:", error.message);
    res.status(500).json({ message: "Failed to retrieve student." });
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid student data.",
        errors: error.errors
          ? Object.values(error.errors).map((item) => item.message)
          : [error.message],
      });
    }
    console.error("POST student error:", error.message);
    res.status(500).json({ message: "Failed to create student." });
  }
});

app.put("/api/students/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid student ID." });
  }

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        overwrite: false,
      }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.status(200).json(student);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid student data.",
        errors: error.errors
          ? Object.values(error.errors).map((item) => item.message)
          : [error.message],
      });
    }
    console.error("PUT student error:", error.message);
    res.status(500).json({ message: "Failed to update student." });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid student ID." });
  }

  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.status(200).json({
      message: "Student deleted successfully.",
      deletedStudent: student,
    });
  } catch (error) {
    console.error("DELETE student error:", error.message);
    res.status(500).json({ message: "Failed to delete student." });
  }
});

// Handle malformed JSON bodies.
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Malformed JSON request body." });
  }

  console.error("Unhandled server error:", error.message);
  res.status(500).json({ message: "An unexpected server error occurred." });
});

async function startServer() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("MONGODB_URI is missing. Add it to your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB.");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
