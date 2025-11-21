import React from 'react';
import { FileUpload } from './FileUpload';

interface LandingPageProps {
  onFileSelect: (file: File) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onFileSelect }) => {
  return (
    <div className="animate-fadeIn">
      
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-50"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide mb-4 border border-indigo-100">
              ✨ AI-Powered Education
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              What makes your <br className="hidden md:block" />
              <span className="text-indigo-600">electronics tick?</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Upload a photo of any gadget. We'll generate a <span className="font-semibold text-slate-900">scientific schematic</span> and explain the hidden engineering inside using simple analogies.
            </p>
          </div>

          <div className="bg-white p-2 rounded-2xl shadow-xl shadow-indigo-100 border border-slate-100 max-w-2xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
            <FileUpload onFileSelect={onFileSelect} />
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500 pt-4">
            <span className="font-medium text-slate-400 uppercase tracking-wider text-xs mr-2 self-center">Try analyzing:</span>
            {['AirPods', 'Game Controller', 'Drone', 'Calculator', 'Smart Watch'].map((item) => (
              <span key={item} className="bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900">How it Works</h3>
            <p className="text-slate-500 mt-2">From photo to textbook diagram in seconds.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>

            {[
              { 
                title: 'Snap a Photo', 
                desc: 'Take a picture of any electronic device or gadget you want to learn about.',
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                ),
                color: 'bg-blue-500'
              },
              { 
                title: 'AI Analysis', 
                desc: 'Gemini Vision identifies components and understands the circuitry logic.',
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                ),
                color: 'bg-indigo-500'
              },
              { 
                title: 'Get Deconstructed', 
                desc: 'Receive a labeled scientific diagram with fun analogies and facts.',
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                ),
                color: 'bg-emerald-500'
              }
            ].map((step, index) => (
              <div key={index} className="relative bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center group hover:-translate-y-1 transition-transform duration-300 z-10">
                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center ${step.color} shadow-lg shadow-indigo-500/20 mb-6 group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h4>
                <p className="text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
               <h3 className="text-3xl font-bold text-slate-900">Science class, reimagined.</h3>
               <p className="text-lg text-slate-600 leading-relaxed">
                 We don't just list parts; we explain the physics. Whether it's electromagnetism in your speakers or the photovoltaic effect in your calculator, we make complex concepts click.
               </p>
               <ul className="space-y-4">
                 {[
                   'Textbook-style schematic generation',
                   'Real-world analogies (e.g. "Like a traffic cop")',
                   'Detailed workflow breakdowns',
                   'Shareable discovery cards'
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-700">
                     <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                     {item}
                   </li>
                 ))}
               </ul>
             </div>
             <div className="relative">
                <div className="absolute inset-0 bg-indigo-600 blur-3xl opacity-10 rounded-full"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 rotate-2 hover:rotate-0 transition-transform duration-500">
                   {/* Mock Card Preview */}
                   <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">1</div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">Li-Ion Battery</h4>
                        <p className="text-xs text-slate-400">POWER SOURCE</p>
                      </div>
                   </div>
                   <div className="bg-amber-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-amber-800 font-medium italic">"Like the heart pumping blood to the body"</p>
                   </div>
                   <div className="space-y-2">
                      <div className="h-2 bg-slate-100 rounded w-3/4"></div>
                      <div className="h-2 bg-slate-100 rounded w-full"></div>
                      <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

    </div>
  );
};