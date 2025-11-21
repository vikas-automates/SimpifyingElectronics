import React from 'react';
import { HistoryItem } from '../types';

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClose: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect, onClose }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <p>No history yet. Analyze something!</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Submission History</h2>
        <button 
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-indigo-300 text-left"
          >
            <div className="h-40 w-full overflow-hidden bg-slate-100 relative">
              {item.generatedImage ? (
                <img 
                  src={`data:image/png;base64,${item.generatedImage}`} 
                  alt={item.analysis.deviceName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                 <span className="text-white text-xs font-medium">
                    {new Date(item.timestamp).toLocaleDateString()}
                 </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                {item.analysis.deviceName}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mt-1">
                {item.analysis.summary}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};