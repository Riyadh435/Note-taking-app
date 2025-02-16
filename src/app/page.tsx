'use client';
import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { getNotes, deleteNote } from '@/lib/storage';
import Link from 'next/link';
import { TrashIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(deleteNote(id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            My Notes
            <span className="ml-3 text-blue-500 text-xl font-medium">
              {notes.length} notes
            </span>
          </h1>
          <Link
            href="/note/new"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30"
          >
            <PlusCircleIcon className="w-5 h-5" />
            New Note
          </Link>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-24">
            <DocumentTextIcon className="w-24 h-24 text-gray-300 mx-auto mb-6 dark:text-slate-600" />
            <p className="text-xl text-gray-500 mb-4 dark:text-slate-400">
              No notes found. Lets create your first note!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <div
                key={note.id}
                className="group relative bg-white dark:bg-slate-700 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-600 hover:-translate-y-1"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                      title="Delete note"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                    <Link
                      href={`/note/${note.id}`}
                      className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-lg transition-colors"
                      title="Edit note"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 pr-8">
                  {note.title || 'Untitled Note'}
                </h2>
                <p className="text-gray-600 dark:text-slate-300 mb-4 line-clamp-4 text-sm leading-relaxed">
                  {note.content || 'No content'}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 dark:text-slate-400">
                    {new Date(note.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-blue-500 dark:text-blue-400 font-medium">
                    {Math.ceil(note.content.length / 200)} min read
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
