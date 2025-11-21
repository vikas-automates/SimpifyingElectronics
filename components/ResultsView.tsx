import React from 'react';
import { AnalysisResult } from '../types';
import { ComponentCard } from './ComponentCard';

interface ResultsViewProps {
  originalImage: string;
  generatedImage: string | null;
  analysis: AnalysisResult | null;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ originalImage, generatedImage, analysis, onReset }) => {
  if (!analysis) return null;

  return (
    <div className="animate-fadeIn space-y-10 pb-12">
      
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
               <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-widest">Deconstructed</span>
               <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{analysis.deviceName}</h2>
            </div>
            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl border-l-4 border-indigo-500 pl-4">
              {analysis.summary}
            </p>
          </div>
          <button 
            onClick={onReset}
            className="shrink-0 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-bold transition-all hover:shadow-md flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Analyze Another Device
          </button>
        </div>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generated Diagram (Priority) */}
        <div className="space-y-4 order-1 lg:order-none">
           <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                The Blueprint
              </h3>
              <span className="text-xs font-mono text-slate-400">AI-GENERATED SCHEMATIC</span>
           </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-indigo-100 aspect-[4/3] relative group transition-transform hover:scale-[1.01] duration-500">
            {generatedImage ? (
              <>
                <img 
                  src={`data:image/png;base64,${generatedImage}`} 
                  alt="Generated Schematic" 
                  className="w-full h-full object-contain p-4 bg-white"
                />
                <div className="absolute top-4 right-4 bg-white/90 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-indigo-100 backdrop-blur-sm">
                  ✨ Science View
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400 animate-pulse">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <span className="text-sm font-medium">Drawing schematic diagram...</span>
              </div>
            )}
          </div>
        </div>

        {/* Original (Reference) */}
        <div className="space-y-4 order-2 lg:order-none">
          <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                Original Photo
              </h3>
              <span className="text-xs font-mono text-slate-400">SOURCE</span>
           </div>
          <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-200 aspect-[4/3] relative opacity-90 hover:opacity-100 transition-opacity">
            <img 
              src={`data:image/jpeg;base64,${originalImage}`} 
              alt="Original Upload" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-100 p-2 rounded-lg">
             <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">How It Works: Component Breakdown</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysis.components.map((comp, idx) => (
            <ComponentCard key={idx} component={comp} index={idx} />
          ))}
        </div>
      </div>

    </div>
  );
};