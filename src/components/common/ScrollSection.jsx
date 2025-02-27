const ScrollSection = ({ children, isBlack = false }) => {
  return (
    <section className={`w-screen ${isBlack ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
      <div className="max-w-[120rem] mx-auto px-8">
        {children}
      </div>
    </section>
  );
};

export default ScrollSection; 