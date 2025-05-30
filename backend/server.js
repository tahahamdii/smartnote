const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth")
const noteRoutes = require("./routes/notes")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
mongoose
  .connect(
    "mongodb+srv://moez:moez@cluster0.5gxtv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/notes", noteRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "SmartNote API is running!" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
