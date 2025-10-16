
'use client'
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AiSummary = ({ content }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/summarize', { content });
      setSummary(response.data.summary);
      setShowSummary(true);
    } catch (error) {
      toast.error('Failed to summarize the post.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-8">
      <button
        onClick={handleSummarize}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white"
        disabled={isLoading}
      >
        <Sparkles size={18} />
        <span>{isLoading ? 'Generating...' : (showSummary ? 'Hide Summary' : 'AI Summary')}</span>
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
