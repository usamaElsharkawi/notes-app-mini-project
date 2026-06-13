export default function NoteForm({
  title,
  setTitle,
  content,
  setContent,
  loading,
  onSubmit,
  editId,
  onCancel,
}) {
  return (
    <div className="bg-gray-900 p-6 mb-8 rounded-lg shadow-md border border-gray-800">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-yellow-400 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
            placeholder="Enter your note title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-yellow-400 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
            placeholder="Enter your note content"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-700 cursor-pointer disabled:cursor-not-allowed transition-all duration-200 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-semibold"
          >
            {loading ? "Saving..." : editId ? "Update Note" : "Add Note"}
          </button>
          {editId && (
            <button
              type="button"
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 cursor-pointer transition-all duration-200 text-white rounded-lg border outline-none border-gray-600 font-semibold"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
