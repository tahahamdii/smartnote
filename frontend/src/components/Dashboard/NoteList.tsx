import NoteCard from "./NoteCard"

interface Note {
  _id: string
  title: string
  content: string
  tags: string[]
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

interface NoteListProps {
  notes: Note[]
  onEditNote: (note: Note) => void
  onDeleteNote: (noteId: string) => void
  onTogglePin: (noteId: string) => void
}

export default function NoteList({ notes, onEditNote, onDeleteNote, onTogglePin }: NoteListProps) {
  const pinnedNotes = notes.filter((note) => note.isPinned)
  const unpinnedNotes = notes.filter((note) => !note.isPinned)

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune note trouvée</h3>
        <p className="text-gray-600">Commencez par créer votre première note !</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {pinnedNotes.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">📌 Notes épinglées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={() => onEditNote(note)}
                onDelete={() => onDeleteNote(note._id)}
                onTogglePin={() => onTogglePin(note._id)}
              />
            ))}
          </div>
        </div>
      )}

      {unpinnedNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && <h2 className="text-lg font-semibold text-gray-900 mb-4">Autres notes</h2>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unpinnedNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={() => onEditNote(note)}
                onDelete={() => onDeleteNote(note._id)}
                onTogglePin={() => onTogglePin(note._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
