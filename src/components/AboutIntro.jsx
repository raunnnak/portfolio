import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutIntro = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
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
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const createParticles = () => {
      particles = [];
      const numParticles = 12; // Reduced count
      
      // Strategic positions instead of random
      const positions = [
        { x: 0.2, y: 0.2 },    // Top left
        { x: 0.5, y: 0.15 },   // Top center
        { x: 0.8, y: 0.2 },    // Top right
        { x: 0.15, y: 0.5 },   // Middle left
        { x: 0.85, y: 0.5 },   // Middle right
        { x: 0.2, y: 0.8 },    // Bottom left
        { x: 0.5, y: 0.85 },   // Bottom center
        { x: 0.8, y: 0.8 },    // Bottom right
        { x: 0.35, y: 0.35 },  // Inner top left
        { x: 0.65, y: 0.35 },  // Inner top right
        { x: 0.35, y: 0.65 },  // Inner bottom left
        { x: 0.65, y: 0.65 },  // Inner bottom right
      ];

      positions.forEach((pos, i) => {
        const x = pos.x * canvas.width;
        const y = pos.y * canvas.height;
        const size = 60; // Fixed larger size
        const opacity = 0.12; // Very subtle opacity

        particles.push({
          x,
          y,
          size,
          opacity,
          rotation: 0, // No rotation
          speedX: (Math.random() - 0.5) * 0.05, // Much slower speed
          speedY: (Math.random() - 0.5) * 0.05,
          originalX: x,
          originalY: y
        });
      });
    };

    const drawSquare = (x, y, size, opacity) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(x - size/2, y - size/2, size, size);
    };

    const animate = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      particles.forEach(particle => {
        // Very subtle cursor influence
        if (mouseX && mouseY) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 300;
          
          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.01; // Reduced force
            particle.x += dx * force;
            particle.y += dy * force;
          }
        }

        // Gentle return to original position
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        particle.x += dx * 0.02;
        particle.y += dy * 0.02;

        // Very slow natural movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Keep squares within bounds
        if (Math.abs(particle.x - particle.originalX) > 100) {
          particle.speedX *= -1;
        }
        if (Math.abs(particle.y - particle.originalY) > 100) {
          particle.speedY *= -1;
        }

        drawSquare(
          particle.x,
          particle.y,
          particle.size,
          particle.opacity
        );
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      ref={sectionRef} 
      className="relative bg-black w-screen -ml-[calc((100vw-100%)/2)]"
      style={{ 
        height: '700vh',
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
              <h2 className="text-[2rem] md:text-[2.75rem] lg:text-[3.5rem] font-[200] text-white tracking-[-0.02em] leading-[1.15] text-center max-w-[75rem] mx-auto">
                I pair strong <span className="font-serif italic font-medium">visual design</span> skills with a<br />
                focus on <span className="font-serif italic font-medium">user-centered</span> design.
              </h2>
            </div>

            <div className="absolute top-[59%] left-1/2 -translate-x-1/2 w-full">
              <p className="text-xs md:text-sm text-gray-400 font-[200] tracking-[-0.01em] text-center max-w-[50rem] mx-auto whitespace-nowrap">
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