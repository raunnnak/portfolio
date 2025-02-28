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
    [0, 0.9, 1],  // Keep visible longer
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
      const maxWidth = 1280;
      const screenWidth = Math.min(window.innerWidth, maxWidth);
      const offsetX = (window.innerWidth - screenWidth) / 2;
      
      // Calculate x positions relative to max width
      const getX = (relativeX) => {
        return offsetX + (relativeX * screenWidth);
      };
      
      // Square configurations with wider distribution
      const positions = [
        // Large squares (24-28px)
        { x: 0.05, y: 1.2, size: 28, opacity: 0.95, delay: 0 },
        { x: 0.95, y: 1.3, size: 28, opacity: 0.92, delay: 0.1 },
        { x: 0.25, y: 1.4, size: 26, opacity: 0.90, delay: 0.2 },
        { x: 0.75, y: 1.5, size: 26, opacity: 0.88, delay: 0.3 },
        { x: 0.15, y: 1.6, size: 24, opacity: 0.86, delay: 0.4 },
        { x: 0.85, y: 1.7, size: 24, opacity: 0.84, delay: 0.5 },
        { x: 0.45, y: 1.8, size: 24, opacity: 0.95, delay: 0.6 },
        { x: 0.55, y: 1.9, size: 24, opacity: 0.92, delay: 0.7 },
        
        // Medium squares (18-22px)
        { x: 0.1, y: 2.0, size: 22, opacity: 0.95, delay: 0.8 },
        { x: 0.9, y: 2.1, size: 22, opacity: 0.92, delay: 0.9 },
        { x: 0.3, y: 2.2, size: 20, opacity: 0.90, delay: 1.0 },
        { x: 0.7, y: 2.3, size: 20, opacity: 0.88, delay: 1.1 },
        { x: 0.2, y: 2.4, size: 18, opacity: 0.86, delay: 1.2 },
        { x: 0.8, y: 2.5, size: 18, opacity: 0.84, delay: 1.3 },
        { x: 0.4, y: 2.6, size: 18, opacity: 0.95, delay: 1.4 },
        { x: 0.6, y: 2.7, size: 18, opacity: 0.92, delay: 1.5 },
        
        // Small squares (12-16px)
        { x: 0.02, y: 2.8, size: 16, opacity: 0.95, delay: 1.6 },
        { x: 0.98, y: 2.9, size: 16, opacity: 0.92, delay: 1.7 },
        { x: 0.35, y: 3.0, size: 14, opacity: 0.90, delay: 1.8 },
        { x: 0.65, y: 3.1, size: 14, opacity: 0.88, delay: 1.9 },
        { x: 0.15, y: 3.2, size: 12, opacity: 0.86, delay: 2.0 },
        { x: 0.85, y: 3.3, size: 12, opacity: 0.84, delay: 2.1 },
        
        // Additional squares for better coverage
        { x: 0.08, y: 3.4, size: 20, opacity: 0.95, delay: 2.2 },
        { x: 0.92, y: 3.5, size: 18, opacity: 0.92, delay: 2.3 },
        { x: 0.22, y: 3.6, size: 16, opacity: 0.90, delay: 2.4 },
        { x: 0.78, y: 3.7, size: 16, opacity: 0.88, delay: 2.5 },
        { x: 0.48, y: 3.8, size: 14, opacity: 0.86, delay: 2.6 },
        { x: 0.52, y: 3.9, size: 14, opacity: 0.84, delay: 2.7 },
        { x: 0.12, y: 4.0, size: 22, opacity: 0.95, delay: 2.8 },
        { x: 0.88, y: 4.1, size: 20, opacity: 0.92, delay: 2.9 },
        { x: 0.32, y: 4.2, size: 18, opacity: 0.90, delay: 3.0 },
        { x: 0.68, y: 4.3, size: 16, opacity: 0.88, delay: 3.1 }
      ];

      positions.forEach((pos) => {
        const x = getX(pos.x);
        const y = pos.y * canvas.height;

        particles.push({
          x,
          y,
          targetY: y - canvas.height * 2.5, // Increased movement range for longer emergence
          size: pos.size,
          opacity: pos.opacity,
          delay: pos.delay,
          originalX: x,
          originalY: y - canvas.height * 2.5,
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.1,
          progress: 0
        });
      });
    };

    const drawSquare = (x, y, size, opacity) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(x - size/2, y - size/2, size, size);
    };

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      // Calculate scroll progress for extended emergence
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      ) - window.innerHeight;
      
      // Adjust scroll progress calculation for longer emergence
      const scrollProgress = Math.min(1, scrollTop / (scrollHeight * 0.85));
      
      particles.forEach(particle => {
        // Update progress for extended emergence
        const particleProgress = Math.max(0, Math.min(1, (scrollProgress * 1.8 - particle.delay * 0.4)));
        particle.progress = particleProgress;
        
        // Calculate emergence position from bottom
        const startY = canvas.height + particle.size;
        const targetY = particle.targetY;
        const currentY = startY - (startY - targetY) * easeOutCubic(particleProgress);

        // Very subtle cursor influence
        if (mouseX && mouseY) {
          const dx = mouseX - particle.x;
          const dy = mouseY - currentY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 400;
          
          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.015;
            particle.x += dx * force;
          }
        }

        // Return to original position
        const returnSpeed = 0.02;
        particle.x += (particle.originalX - particle.x) * returnSpeed;

        // Only draw if in view and within max width
        if (particleProgress > 0) {
          const fadeInProgress = Math.min(1, particleProgress * 2);
          drawSquare(
            particle.x,
            currentY,
            particle.size,
            particle.opacity * fadeInProgress
          );
        }
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