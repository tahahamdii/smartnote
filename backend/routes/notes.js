const express = require("express")
const Note = require("../models/Note")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all notes for authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const { search, sortBy = "createdAt", order = "desc" } = req.query

    const query = { userId: req.user._id }

    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // Sort options
    const sortOptions = {}
    sortOptions[sortBy] = order === "desc" ? -1 : 1

    const notes = await Note.find(query).sort(sortOptions).limit(100) // Limit for performance

    res.json(notes)
  } catch (error) {
    console.error("Get notes error:", error)
    res.status(500).json({ message: "Server error while fetching notes" })
  }
})

// Get single note
router.get("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    res.json(note)
  } catch (error) {
    console.error("Get note error:", error)
    res.status(500).json({ message: "Server error while fetching note" })
  }
})

// Create new note
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, tags = [], isPinned = false } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" })
    }

    const note = new Note({
      title,
      content,
      tags,
      isPinned,
      userId: req.user._id,
    })

    await note.save()
    res.status(201).json(note)
  } catch (error) {
    console.error("Create note error:", error)
    res.status(500).json({ message: "Server error while creating note" })
  }
})

// Update note
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content, tags, isPinned } = req.body

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, content, tags, isPinned },
      { new: true, runValidators: true },
    )

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    res.json(note)
  } catch (error) {
    console.error("Update note error:", error)
    res.status(500).json({ message: "Server error while updating note" })
  }
})

// Delete note
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    })

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    res.json({ message: "Note deleted successfully" })
  } catch (error) {
    console.error("Delete note error:", error)
    res.status(500).json({ message: "Server error while deleting note" })
  }
})

// Toggle pin status
router.patch("/:id/pin", auth, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    note.isPinned = !note.isPinned
    await note.save()

    res.json(note)
  } catch (error) {
    console.error("Toggle pin error:", error)
    res.status(500).json({ message: "Server error while toggling pin" })
  }
})

module.exports = router
