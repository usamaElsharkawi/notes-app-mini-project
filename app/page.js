"use client";
import { useEffect, useState } from "react";
import NoteForm from "@/components/NoteForm";
import NotesList from "@/components/NotesList";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function fetchNotes() {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data.notes || []);
    } catch (error) {
      showToast("Failed to fetch notes", "error");
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function handleAddNote(e) {
    e.preventDefault();

    if (!title || !content) {
      showToast("Please fill in all the fields", "error");
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
          showToast("Note updated successfully", "success");
          fetchNotes();
        } else {
          showToast("Failed to update note", "error");
        }
      } catch (error) {
        showToast("Failed to update note", "error");
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
        showToast("Note added successfully", "success");
        fetchNotes();
      } else {
        showToast("Failed to add note", "error");
      }
    } catch (error) {
      showToast("Failed to add note", "error");
    } finally {
      setLoading(false);
      setTitle("");
      setContent("");
    }
  }

  function handleEditNote(note) {
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
      showToast("Note deleted successfully", "success");
      fetchNotes();
    } else {
      showToast("Failed to delete note", "error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Notes App</h1>
          <p className="text-gray-400">
            Manage your notes easily with our clean, modular app.
          </p>
        </div>

        {/* Note Editor Form */}
        <NoteForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          loading={loading}
          onSubmit={handleAddNote}
          editId={editId}
          onCancel={handleCancel}
        />

        {/* Search Input */}
        <SearchInput value={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Notes Grid */}
        <NotesList
          notes={filteredNotes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 animate-slide-in text-white ${
            toast.type === "success"
              ? "bg-emerald-600 border-emerald-500"
              : "bg-rose-600 border-rose-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
