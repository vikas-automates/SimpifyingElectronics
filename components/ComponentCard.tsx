import React from 'react';
import { ComponentInfo } from '../types';

interface ComponentCardProps {
  component: ComponentInfo;
  index: number;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ component, index }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 flex flex-col gap-4 hover:-translate-y-1 group h-full">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-extrabold text-lg shadow-sm group-hover:scale-110 transition-transform">
          {index + 1}
        </div>
        <h3 className="font-bold text-slate-800 text-xl leading-tight">{component.name}</h3>
      </div>
      
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
        <h4 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1 flex items-center gap-1">
          <span className="text-lg">💡</span> Think of it like...
        </h4>
        <p className="text-slate-700 font-medium italic">"{component.analogy}"</p>
      </div>

      <div className="flex-grow space-y-3">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Physical Description</h4>
          <p className="text-sm text-slate-600 leading-relaxed">{component.description}</p>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
           <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">🔬 The Science Principle</h4>
           <p className="text-sm text-slate-700 font-medium">{component.scientificPrinciple}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-3 border-t border-slate-50">
        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Workflow Role</h4>
        <p className="text-sm text-slate-700 leading-relaxed pl-2 border-l-2 border-emerald-400">
          {component.workflowRole}
        </p>
      </div>
    </div>
  );
};