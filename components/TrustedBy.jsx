export default function TrustedBy() {
  const companies = [
    'Autowrap', 'Superprofile', 'Higgsfield', 'Krevo AI', 'Qlero', 
    'FX Buddy', 'Bynn Intelligence inc', 'Hutsy', 'Detector24', 
    'Blackbox AI', 'ClinicEvo'
  ];

  return (
    <section className="trusted-by">
      <p className="trusted-label">Trusted by innovative companies</p>
      <div className="marquee-container">
        <div className="marquee">
          {companies.map((c, i) => <span key={`c1-${i}`}>{c}</span>)}
          {/* Duplicate for infinite scroll */}
          {companies.map((c, i) => <span key={`c2-${i}`}>{c}</span>)}
        </div>
      </div>
    </section>
  );
}
