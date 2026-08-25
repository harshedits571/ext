import './globals.css';
import SmoothScroll from '../components/SmoothScroll';
import CustomCursor from '../components/CustomCursor';

export const metadata = {
  title: 'EXTProduction | High-Converting Motion Films',
  description: 'EXTProduction is a leading motion design studio working with SaaS, AI, and fintech companies to make product demos, launch videos, promos, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CustomCursor />
        {/* Background Elements */}
        <div className="gradient-bg">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <div className="glow-orb orb-3"></div>
          <div className="grid-overlay"></div>
        </div>
        
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
