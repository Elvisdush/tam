import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ 
  children, 
  title = 'NOVA LUTs - Cinematic Color Grading', 
  description = 'Professional film LUTs and color grading tools for filmmakers and content creators.' 
}: LayoutProps) {
  return (
    <div className="font-sans min-h-screen bg-black text-white">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap" 
          rel="stylesheet" 
        />
      </head>

      <main className="min-h-screen">
        {children}
      </main>

      <style>{
        `
        :root {
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          --font-display: 'Playfair Display', serif;
        }
        
        body {
          font-family: var(--font-sans);
          background: #000000;
          color: #ffffff;
          margin: 0;
          padding: 0;
          scroll-behavior: smooth;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-display);
          font-weight: 700;
          line-height: 1.1;
          margin: 0 0 1rem;
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #F97316 0%, #7C3AED 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          background: linear-gradient(90deg, #F97316 0%, #7C3AED 100%);
          border-radius: 0.5rem;
          z-index: -1;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        
        .gradient-border:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
