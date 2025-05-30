"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { notesAPI } from "../../services/api"
import Header from "./Header"
import NoteList from "./NoteList"
import NoteForm from "./NoteForm"
import SearchBar from "./SearchBar"
import toast from "react-hot-toast"

interface Note {
  _id: string
  title: string
  content: string
  tags: string[]
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")

  useEffect(() => {
    fetchNotes()
  }, [searchQuery, sortBy, sortOrder])

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const response = await notesAPI.getNotes(searchQuery, sortBy, sortOrder)
      setNotes(response.data)
    } catch (error) {
      toast.error("Erreur lors du chargement des notes")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNote = async (noteData: { title: string; content: string; tags: string[] }) => {
    try {
      const response = await notesAPI.createNote(noteData)
      setNotes([response.data, ...notes])
      setShowNoteForm(false)
      toast.success("Note créée avec succès !")
    } catch (error) {
      toast.error("Erreur lors de la création de la note")
    }
  }

  const handleUpdateNote = async (noteData: { title: string; content: string; tags: string[] }) => {
    if (!editingNote) return

    try {
      const response = await notesAPI.updateNote(editingNote._id, noteData)
      setNotes(notes.map((note) => (note._id === editingNote._id ? response.data : note)))
      setEditingNote(null)
      setShowNoteForm(false)
      toast.success("Note mise à jour avec succès !")
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de la note")
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette note ?")) {
      return
    }

    try {
      await notesAPI.deleteNote(noteId)
      setNotes(notes.filter((note) => note._id !== noteId))
      toast.success("Note supprimée avec succès !")
    } catch (error) {
      toast.error("Erreur lors de la suppression de la note")
    }
  }

  const handleTogglePin = async (noteId: string) => {
    try {
      const response = await notesAPI.togglePin(noteId)
      setNotes(notes.map((note) => (note._id === noteId ? response.data : note)))
    } catch (error) {
      toast.error("Erreur lors de l'épinglage de la note")
    }
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setShowNoteForm(true)
  }

  const handleCloseForm = () => {
    setShowNoteForm(false)
    setEditingNote(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bonjour, {user?.username} !</h1>
          <p className="text-gray-600">Gérez vos notes et organisez vos idées</p>
        </div>

        <div className="mb-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            onCreateNote={() => setShowNoteForm(true)}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <NoteList
            notes={notes}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            onTogglePin={handleTogglePin}
          />
        )}

        {showNoteForm && (
          <NoteForm
            note={editingNote}
            onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
            onClose={handleCloseForm}
          />
        )}
      </main>
    </div>
  )
}
