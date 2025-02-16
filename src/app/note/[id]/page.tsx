'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Note } from '@/types/note';
import { getNotes, saveNote } from '@/lib/storage';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function NotePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [note, setNote] = useState<Note>({
    id: id === 'new' ? Date.now().toString() : id,
    title: '',
    content: '',
    date: new Date().toISOString(),
  });

  useEffect(() => {
    if (id !== 'new') {
      const existing = getNotes().find(n => n.id === id);
      if (existing) setNote(existing);
    }
  }, [id]);

  const handleSave = () => {
    saveNote(note);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/20 to-white dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-slate-300 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to notes
          </button>
        </div>

        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              {id === 'new' ? 'New Note' : 'Edit Note'}
            </h1>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30"
            >
              <CheckIcon className="w-5 h-5" />
              Save Note
            </button>
          </div>

          <input
            type="text"
            placeholder="Note title..."
            className="w-full text-xl font-bold mb-4 p-2 border-b-2 border-transparent focus:border-blue-500 focus:outline-none bg-transparent text-slate-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-400"
            value={note.title}
            onChange={e => setNote({ ...note, title: e.target.value })}
          />

          <textarea
            placeholder="Start writing your thoughts here..."
            className="w-full h-[400px] p-2 focus:outline-none resize-none text-base text-gray-700 dark:text-slate-200 bg-transparent placeholder-gray-400 dark:placeholder-slate-400 leading-relaxed"
            value={note.content}
            onChange={e => setNote({ ...note, content: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
} 