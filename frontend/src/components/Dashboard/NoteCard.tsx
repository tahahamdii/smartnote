"use client"
import { Edit, Trash2, Pin, PinOff } from "lucide-react"

interface Note {
  _id: string
  title: string
  content: string
  tags: string[]
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

interface NoteCardProps {
  note: Note
  onEdit: () => void
  onDelete: () => void
  onTogglePin: () => void
}

export default function NoteCard({ note, onEdit, onDelete, onTogglePin }: NoteCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${note.isPinned ? "ring-2 ring-yellow-200" : ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">{note.title}</h3>
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={onTogglePin}
            className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
              note.isPinned ? "text-yellow-600" : "text-gray-400"
            }`}
            title={note.isPinned ? "Désépingler" : "Épingler"}
          >
            {note.isPinned ? <Pin className="h-4 w-4" /> : <PinOff className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-4">{truncateContent(note.content)}</p>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {note.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{formatDate(note.updatedAt)}</span>

        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Modifier"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
