"use client";
import { useEffect, useState } from "react";
import NoteForm from "@/components/NoteForm";
import NotesList from "@/components/NotesList";

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
      setNotes(data.notes || []);
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
      fetchNotes();
    } else {
      alert("Failed to delete note");
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

        {/* Notes Grid */}
        <NotesList
          notes={notes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      </div>
    </div>
  );
}

