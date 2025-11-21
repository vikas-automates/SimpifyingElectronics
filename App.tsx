import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { ResultsView } from './components/ResultsView';
import { HistoryList } from './components/HistoryList';
import { Footer } from './components/Footer';
import { analyzeElectronicDevice, generateSchematicDiagram, fileToGenerativePart } from './services/geminiService';
import { saveToHistory, getHistory } from './services/storageService';
import { AppState, HistoryItem } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: 'idle',
    originalImage: null,
    generatedImage: null,
    analysis: null,
    error: null,
    history: []
  });

  // Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      const historyItems = await getHistory();
      setState(prev => ({ ...prev, history: historyItems }));
    };
    loadHistory();
  }, []);

  const handleFileSelect = async (file: File) => {
    try {
      // 1. Reset & Set Loading
      setState(prev => ({ 
        ...prev, 
        status: 'analyzing', 
        error: null,
        originalImage: null,
        generatedImage: null,
        analysis: null
      }));

      // 2. Process Image
      const base64Data = await fileToGenerativePart(file);
      setState(prev => ({ ...prev, originalImage: base64Data }));

      // 3. Analyze Image (Step 1)
      const analysis = await analyzeElectronicDevice(base64Data, file.type);
      setState(prev => ({ 
        ...prev, 
        status: 'generating', 
        analysis 
      }));

      // 4. Generate Diagram (Step 2)
      const schematicBase64 = await generateSchematicDiagram(base64Data, file.type, analysis);
      
      // Create History Item
      const newHistoryItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        originalImage: base64Data,
        generatedImage: schematicBase64,
        analysis: analysis
      };

      // Save to DB
      await saveToHistory(newHistoryItem);

      setState(prev => ({
        ...prev,
        status: 'complete',
        generatedImage: schematicBase64,
        history: [newHistoryItem, ...prev.history] // Update local state immediately
      }));

    } catch (error: any) {
      console.error(error);
      setState(prev => ({ 
        ...prev, 
        status: 'error', 
        error: error.message || "An unexpected error occurred. Please try again." 
      }));
    }
  };

  const handleReset = () => {
    setState(prev => ({
      ...prev,
      status: 'idle',
      originalImage: null,
      generatedImage: null,
      analysis: null,
      error: null,
    }));
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setState(prev => ({
      ...prev,
      status: 'complete',
      originalImage: item.originalImage,
      generatedImage: item.generatedImage,
      analysis: item.analysis
    }));
  };

  const toggleHistoryView = () => {
    setState(prev => ({
      ...prev,
      status: prev.status === 'history' ? 'idle' : 'history'
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm group-hover:shadow-indigo-200 transition-all">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              ElectroSchematic
            </h1>
          </button>
          <div className="flex items-center gap-4">
             <button 
               onClick={toggleHistoryView}
               className={`text-sm font-medium px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                 state.status === 'history' 
                   ? 'bg-indigo-50 text-indigo-600' 
                   : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
               }`}
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               <span className="hidden sm:inline">History</span>
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* History View */}
          {state.status === 'history' && (
            <HistoryList 
              history={state.history} 
              onSelect={handleHistorySelect} 
              onClose={handleReset}
            />
          )}

          {/* Landing / Upload Section */}
          {state.status === 'idle' && (
            <LandingPage onFileSelect={handleFileSelect} />
          )}

          {/* Loading State */}
          {(state.status === 'analyzing' || state.status === 'generating') && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-fadeIn">
              <div className="relative w-32 h-32">
                 <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <svg className="w-12 h-12 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                 </div>
              </div>
              <div className="text-center space-y-3 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-slate-800">
                  {state.status === 'analyzing' ? 'Analyzing Circuitry' : 'Drawing Schematic'}
                </h3>
                <p className="text-slate-500 text-lg">
                  {state.status === 'analyzing' 
                    ? 'Identifying components and identifying physics principles...' 
                    : 'Generating a high-fidelity technical illustration for you...'}
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {state.status === 'error' && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 animate-fadeIn">
              <div className="bg-red-50 text-red-500 p-6 rounded-2xl shadow-sm border border-red-100">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Analysis Interrupted</h3>
                <p className="text-slate-600 max-w-md mx-auto mb-6">{state.error}</p>
                <button 
                  onClick={handleReset}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Results State */}
          {state.analysis && state.originalImage && (state.status === 'generating' || state.status === 'complete') && (
            <ResultsView 
              originalImage={state.originalImage} 
              generatedImage={state.generatedImage} 
              analysis={state.analysis}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
};

export default App;