
'use client'
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const AiSummary = ({ content }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('');

  const handleSummarize = () => {
    // Placeholder for AI summarization logic
    setSummary('This is a placeholder for the AI-generated summary of the blog post.');
    setShowSummary(true);
  };

  return (
    <div className="my-8">
      <button
        onClick={handleSummarize}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white"
      >
        <Sparkles size={18} />
        <span>AI Summary</span>
      </button>

      {showSummary && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg">
          <p className="text-gray-800 dark:text-gray-200">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default AiSummary;
