export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800 flex flex-col justify-between hover:border-yellow-500/50 transition-all duration-300">
      <div>
        <h3 className="text-xl font-bold text-yellow-400 mb-2 break-words">
          {note.title}
        </h3>
        <p className="text-gray-300 mb-4 whitespace-pre-wrap line-clamp-4 break-words">
          {note.content}
        </p>
      </div>
      <div className="mt-4">
        <p className="text-gray-500 text-xs">
          Created: {new Date(note.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEdit(note)}
            className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 cursor-pointer transition-all duration-200 text-white text-sm font-semibold rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="flex-1 px-3 py-1.5 bg-red-600 hover:bg-red-500 cursor-pointer transition-all duration-200 text-white text-sm font-semibold rounded-lg border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
