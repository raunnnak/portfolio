import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutIntro = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: backgroundProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(
    backgroundProgress,
    [0, 0.95, 1],
    ["0%", "-100%", "-150%"]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.95, 1],
    [1, 1, 0]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      canvas.height = window.innerHeight;
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#1a1a2e');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawStar = (x, y, size, opacity) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.rect(x - size/2, y - size/2, size, size);
      ctx.fill();
    };

    const createParticles = () => {
      particles = [];
      const numParticles = 12;
      
      for (let i = 0; i < numParticles; i++) {
        const size = Math.random() * 6 + 2;
        const opacity = Math.random() * 0.15 + 0.05;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          opacity,
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.1
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        drawStar(
          particle.x,
          particle.y,
          particle.size,
          particle.opacity
        );
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      ref={sectionRef} 
      className="relative bg-[#1a1a2e] w-screen"
      style={{ 
        height: '700vh',
        transform: 'translateX(-9.1%)',
      }}
    >
      <motion.div
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity }}
      >
        <motion.div className="absolute inset-0 w-full">
          <motion.canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-screen h-full"
            style={{ y: backgroundY }}
          />
        </motion.div>
        
        <div className="relative z-10 flex items-center justify-center h-full w-screen">
          <div className="max-w-[90rem] mx-auto px-8 relative h-full w-full">
            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 flex items-center gap-1">
              <span className="text-[0.625rem] tracking-[0.25em] text-white/60 uppercase">← ABOUT →</span>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
              <h2 className="text-[2rem] md:text-[2.75rem] lg:text-[3.5rem] font-[400] text-white tracking-[-0.02em] leading-[1.15] text-center max-w-[75rem] mx-auto">
                I pair strong <span className="font-serif italic font-medium">visual design</span> skills with a<br />
                focus on <span className="font-serif italic font-medium">user-centered</span> design.
              </h2>
            </div>

            <div className="absolute top-[59%] left-1/2 -translate-x-1/2 w-full">
              <p className="text-xs md:text-sm text-gray-400 font-[350] tracking-[-0.01em] text-center max-w-[50rem] mx-auto whitespace-nowrap">
                Your brand deserves a <span className="font-serif italic">story</span> and an <span className="font-serif italic">identity</span>. I make sure they're both compelling.
              </p>
            </div>
            
            <div className="absolute bottom-8 right-8 flex items-center gap-4">
              <span className="text-[11px] tracking-[0.25em] text-gray-400 uppercase font-[350]">
                SCROLL
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-gray-400 to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutIntro; 