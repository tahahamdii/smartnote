"use client"
import { Search, Plus, SortAsc, SortDesc } from "lucide-react"

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: string
  onSortByChange: (sortBy: string) => void
  sortOrder: string
  onSortOrderChange: (order: string) => void
  onCreateNote: () => void
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onCreateNote,
}: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex-1 w-full sm:max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher dans vos notes..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Trier par:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="createdAt">Date de création</option>
            <option value="updatedAt">Dernière modification</option>
            <option value="title">Titre</option>
          </select>
        </div>

        <button
          onClick={() => onSortOrderChange(sortOrder === "desc" ? "asc" : "desc")}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          title={sortOrder === "desc" ? "Tri décroissant" : "Tri croissant"}
        >
          {sortOrder === "desc" ? <SortDesc className="h-5 w-5" /> : <SortAsc className="h-5 w-5" />}
        </button>

        <button
          onClick={onCreateNote}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nouvelle note</span>
        </button>
      </div>
    </div>
  )
}
