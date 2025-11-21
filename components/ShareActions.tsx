import React, { useState } from 'react';

interface ShareActionsProps {
  title: string;
  text: string;
}

export const ShareActions: React.FC<ShareActionsProps> = ({ title, text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // In a real deployment, this would be the permalink to the specific result
  const shareUrl = window.location.href; 

  const handleShareClick = async () => {
    // Try native share first (works best on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: shareUrl,
        });
        return;
      } catch (err) {
        console.log('Native share dismissed or failed, falling back to modal');
      }
    }
    // Fallback to custom modal
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Auto-copy when opening modal
    copyToClipboard();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n\nCheck it out here: ${shareUrl}`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleInstagramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    copyToClipboard();
    window.open('https://www.instagram.com/', '_blank');
  };

  const socials = [
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: 'bg-black text-white hover:bg-gray-800'
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      color: 'bg-[#1877F2] text-white hover:bg-[#1864D9]'
    },
    {
      name: 'Reddit',
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.003 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 006.687 9.437c.01-.008.015-.027.002-.035-1.674-.932-2.99-2.39-3.752-4.13-.117-.266.068-.558.336-.558.125 0 .247.067.312.178 1.445 2.443 4.134 4.085 7.204 4.085 3.072 0 5.762-1.644 7.207-4.087.064-.108.184-.176.31-.176.267 0 .452.29.336.556-.764 1.744-2.083 3.203-3.76 4.134-.013.008-.009.026 0 .035A9.995 9.995 0 0022.003 12c0-5.525-4.475-10-10-10z" clipRule="evenodd" />
        </svg>
      ),
      color: 'bg-[#FF4500] text-white hover:bg-[#E03D00]'
    },
    {
      name: 'Instagram',
      url: '#',
      onClick: handleInstagramClick,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
           <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.53c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'bg-pink-600 text-white hover:bg-pink-700',
      tooltip: 'Copy Link & Open Instagram'
    },
    {
      name: 'Snapchat',
      url: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
           <path d="M12.005 2c-5.773 0-10.387 3.873-10.387 8.785 0 2.535 1.276 4.8 3.35 6.377.276.211.439.632.293 1.06-.234.694-.96 2.183-1.175 2.586-.132.25.078.557.344.469 2.674-.883 3.752-1.426 4.38-1.708.317-.143.67-.147.996-.014.698.284 1.454.435 2.232.435 5.739 0 10.355-3.842 10.355-8.754C22.393 5.901 17.777 2 12.005 2z"/>
        </svg>
      ),
      color: 'bg-[#FFFC00] text-black hover:bg-[#E5E200]'
    }
  ];

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleShareClick}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
          Share
        </button>
        
        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>
        
        <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:block">Post to:</span>
        
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            onClick={social.onClick}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-colors ${social.color} relative group`}
            aria-label={`Share on ${social.name}`}
            title={social.tooltip}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Share Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Share Results</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="mb-6">
               <p className="text-sm text-slate-600 mb-2">Copy this link to share your discovery:</p>
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   readOnly 
                   value={shareUrl} 
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 />
                 <button 
                   onClick={copyToClipboard}
                   className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${copySuccess ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                 >
                   {copySuccess ? 'Copied!' : 'Copy'}
                 </button>
               </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
               <p className="text-xs text-center text-slate-400 mb-3">Or click icon to open app (link copied automatically)</p>
               <div className="flex justify-center gap-4">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      onClick={social.onClick || (() => copyToClipboard())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full transition-colors ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
