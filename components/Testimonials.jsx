export default function Testimonials() {
  const testimonials = [
    { id: 1, quote: 'Amazing video. Thank you. No changes required, it’s perfect.', name: 'John Cavebring', role: 'Bynn Intelligence' },
    { id: 2, quote: 'Video’s unreal bro. Appreciate it. I’ll let you know about future projects.', name: 'Brody Hunt', role: 'Autowrap' },
    { id: 3, quote: 'We really liked it. Good f***ing work.', name: 'Emil', role: 'Qlero' },
    { id: 4, quote: 'This is awesome 🙌 job well done legends!', name: 'Modi', role: 'Crevo AI' }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <h2 className="section-title">Hear what our<br/>clients have to say.</h2>
      <div className="testimonials-grid" style={{ marginTop: '50px' }}>
        {testimonials.map(t => (
          <div key={t.id} className="testimonial-card">
            <p className="quote">"{t.quote}"</p>
            <div className="client-info">
              <div className="client-avatar"></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <strong style={{ lineHeight: '1.2' }}>{t.name}</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
