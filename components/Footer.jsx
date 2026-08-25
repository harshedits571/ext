import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-cta">
        <h2>Lets create<br/>incredible videos together.</h2>
        <Link href="/start-project" className="cta-button secondary-cta" style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}>Book your project</Link>
      </div>
      <div className="footer-content">
        <div className="footer-bottom" style={{ width: '100%' }}>
          <div className="logo" style={{ color: 'white', fontWeight: 600, fontSize: '1.2rem' }}>EXTProduction</div>
          <p>&copy; {new Date().getFullYear()} EXTProduction. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Twitter</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>LinkedIn</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
