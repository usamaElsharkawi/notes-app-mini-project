import NoteCard from "./NoteCard";

export default function NotesList({ notes, onEdit, onDelete }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
        <p className="text-gray-500 text-lg">No notes found. Create your first note above!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
