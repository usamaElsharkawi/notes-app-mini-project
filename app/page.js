"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  async function fetchNotes() {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data.notes);
    } catch (error) {
      alert("Failed to fetch notes");
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function handleAddNote(e) {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill in all the fields");
      return;
    }

    if (editId) {
      try {
        setLoading(true);
        const res = await fetch(`/api/notes/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
          alert("Note updated successfully");
          fetchNotes();
        } else {
          alert("Failed to update note");
        }
      } catch (error) {
        alert("Failed to update note");
      } finally {
        setLoading(false);
        setTitle("");
        setContent("");
        setEditId(null);
      }
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        alert("Note added successfully");
        fetchNotes();
      } else {
        alert("Failed to add note");
      }
    } catch (error) {
      alert("Failed to add note");
    } finally {
      setLoading(false);
      setTitle("");
      setContent("");
    }
  }

  async function handleEditNote(note) {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
  }
  function handleCancel() {
    setEditId(null);
    setTitle("");
    setContent("");
  }
  async function handleDeleteNote(id) {
    if (!confirm("Are you sure you want to delete this note?")) {
      return;
    }
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchNotes();
    } else {
      alert("Failed to delete note");
    }
  }

  return (
    /* is this p-8 for a mobile? */
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-8">Notes App</h1>
          <p className="text-gray-400 mb-8">
            Manage your notes easily with our app.
          </p>
        </div>
        <div className="bg-gray-900 p-6 mb-8 rounded-lg shadow-md border border-gray-800">
          <form className="flex flex-col" onSubmit={handleAddNote}>
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
                rows="5"
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
                placeholder="Enter your note content"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-all duration-200 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {loading ? "Saving..." : editId ? "Update note" : "Add note"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-500 hover:bg-gray-600 cursor-pointer transition-all duration-200 text-white rounded-lg border outline-none border-none"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.length === 0 ? (
            <p className="text-gray-500">No notes found</p>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800"
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  {note.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {note.content}
                </p>
                <p className="text-gray-400 text-sm">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEditNote(note)}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer transition-all duration-200 text-white rounded-lg border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer transition-all duration-200 text-white rounded-lg border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
