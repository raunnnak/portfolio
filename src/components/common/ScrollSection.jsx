const ScrollSection = ({ children, isBlack = false }) => {
  return (
    <section className={`w-screen ${isBlack ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ScrollSection; 