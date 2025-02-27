import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutIntro = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Scroll progress for background movement
  const { scrollYProgress: backgroundProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform for background parallax - more gradual movement
  const backgroundY = useTransform(backgroundProgress, 
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // More control points for longer scroll
    ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    // Set canvas size - much taller for longer scroll
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 6; // Increased significantly for longer scroll
    };

    // Create particles - more particles for larger canvas
    const createParticles = () => {
      particles = [];
      const numParticles = 180; // Increased for larger canvas area
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.12, // Even slower for longer scroll
          speedY: (Math.random() - 0.5) * 0.12
        });
      }
    };

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative bg-black" style={{ height: '900vh' }}> {/* Increased to 4.5 screens */}
      {/* Background Container */}
      <motion.div
        ref={containerRef}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Canvas */}
        <motion.canvas
          ref={canvasRef}
          className="sticky top-0 left-0 w-full h-screen"
          style={{ y: backgroundY }}
        />
      </motion.div>

      {/* Content Container - Screen Height */}
      <div className="sticky top-0 left-0 right-0 h-screen">
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="max-w-4xl text-center px-4">
            <h2 className="text-5xl md:text-7xl font-medium text-white mb-8 tracking-tight leading-tight">
              I pair <span className="font-serif italic font-normal">strong visual design</span> skills with a focus on <span className="font-serif italic font-normal">user-centered</span> design.
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              With years of experience in the design industry, I have been helping
              to bring brands to life through <span className="font-serif italic font-normal">thoughtful design</span> that resonates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutIntro; 