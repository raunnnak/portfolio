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
    [0, 0.85, 0.95],  // Adjusted timing points
    ["0%", "-50%", "-150%"]  // Adjusted movement values
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
      const maxWidth = 1280;  // Fixed width for consistent distribution
      const screenWidth = Math.min(window.innerWidth, maxWidth);
      const offsetX = (window.innerWidth - screenWidth) / 2;
      
      const getX = (relativeX) => {
        return offsetX + (relativeX * screenWidth);
      };

      const positions = [];
      const numParticles = 800;  // Increased from 120
      const numColumns = 25;  // Increased from 12
      
      const generatePosition = (index) => {
        // More even horizontal distribution with more columns
        const column = index % numColumns;
        const row = Math.floor(index / numColumns);
        const baseXSpread = column / (numColumns - 1);
        const xSpread = baseXSpread * 0.94 + 0.03 + (Math.random() * 0.03 - 0.015); // Adjusted margins and random offset
        
        // More even vertical distribution with increased range
        const yBase = 1.2 + (row / (numParticles / numColumns)) * 25; // Increased vertical range
        
        // Create more varied size distribution
        let size;
        const sizeRandom = Math.random();
        if (sizeRandom < 0.3) {
          // Extra small squares (2-6px) - increased frequency
          size = Math.random() * 4 + 2;
        } else if (sizeRandom < 0.6) {
          // Small squares (6-12px) - increased frequency
          size = Math.random() * 6 + 6;
        } else if (sizeRandom < 0.85) {
          // Medium squares (12-20px)
          size = Math.random() * 8 + 12;
        } else {
          // Large squares (20-28px)
          size = Math.random() * 6 + 20;
        }
        
        return {
          x: xSpread,
          y: yBase + Math.random() * 1.8, // Increased random vertical offset
          size: Math.round(size),
          opacity: 0.6 + Math.random() * 0.35,
          delay: (index * (6.5 / numParticles)) * 0.7, // Adjusted delay for more particles
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          floatAmplitude: Math.random() * 25 + 8,
          floatSpeed: Math.random() * 0.003 + 0.0008,
          floatOffset: Math.random() * Math.PI * 2,
          scaleRange: 0.1 + Math.random() * 0.15
        };
      };

      // Generate particles with better distribution
      for (let i = 0; i < numParticles; i++) {
        positions.push(generatePosition(i));
      }

      positions.forEach((pos) => {
        const x = getX(pos.x);
        const y = pos.y * canvas.height;

        particles.push({
          x,
          y,
          targetY: y - canvas.height * 6, // Increased range for more particles
          size: pos.size,
          opacity: pos.opacity,
          delay: pos.delay,
          originalX: x,
          originalY: y - canvas.height * 6, // Match the increased range
          rotation: pos.rotation,
          rotationSpeed: pos.rotationSpeed,
          floatAmplitude: pos.floatAmplitude,
          floatSpeed: pos.floatSpeed,
          floatOffset: pos.floatOffset,
          scaleRange: pos.scaleRange,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          progress: 0,
          time: 0
        });
      });
    };

    const drawSquare = (x, y, size, opacity, rotation, scale = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.scale(scale, scale);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(-size/2, -size/2, size, size);
      ctx.restore();
    };

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      ) - window.innerHeight;
      
      // Get current opacity of the section for sync
      const currentOpacity = opacity.get();
      
      // Keep emergence going until text is completely gone
      const scrollProgress = Math.min(1, scrollTop / scrollHeight);
      
      particles.forEach(particle => {
        particle.time += 0.016;
        
        // Calculate base emergence progress
        let particleProgress;
        
        if (currentOpacity === 1) {
          // Faster scroll through particles
          particleProgress = Math.max(0, Math.min(1, scrollProgress * 2.2 - particle.delay * 0.3));
        } else if (currentOpacity === 0) {
          particleProgress = 0;
        } else {
          const emergenceProgress = Math.max(0, Math.min(1, scrollProgress * 2.2 - particle.delay * 0.3));
          particleProgress = Math.max(emergenceProgress, particle.progress);
        }
        
        particle.progress = particleProgress;
        
        // Calculate emergence position with floating motion
        const startY = canvas.height + particle.size;
        const targetY = particle.targetY;
        const baseY = startY - (startY - targetY) * easeOutCubic(particleProgress);
        
        // Add floating motion
        const floatY = Math.sin(particle.time * particle.floatSpeed + particle.floatOffset) * particle.floatAmplitude;
        const floatX = Math.cos(particle.time * particle.floatSpeed * 1.5 + particle.floatOffset) * particle.floatAmplitude;
        
        // Update rotation
        particle.rotation += particle.rotationSpeed;
        
        // Calculate scale based on time
        const scale = 1 + Math.sin(particle.time * 0.001) * particle.scaleRange;

        // Enhanced cursor interaction
        if (mouseX && mouseY) {
          const dx = mouseX - (particle.x + floatX);
          const dy = mouseY - (baseY + floatY);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 400;
          
          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.03;
            particle.x += dx * force;
            baseY += dy * force;
          }
        }

        // Return to original position with inertia
        const returnSpeed = 0.015;
        particle.x += (particle.originalX - particle.x) * returnSpeed;

        // Only draw if in progress
        if (particleProgress > 0) {
          const fadeInProgress = Math.min(1, particleProgress * 2);
          drawSquare(
            particle.x + floatX,
            baseY + floatY,
            particle.size,
            particle.opacity * fadeInProgress * currentOpacity,
            particle.rotation,
            scale
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
        className="sticky top-0 h-screen w-full overflow-visible"
        style={{ opacity }}
      >
        <motion.div className="absolute inset-0 w-full overflow-visible">
          <motion.canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-screen h-full"
            style={{ y: backgroundY }}
          />
        </motion.div>
        
        <div className="relative z-10 flex items-center justify-center h-full w-screen">
          <div className="max-w-[90rem] mx-auto px-8 relative h-full w-full">
            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 flex items-center gap-1">
              <span className="text-[0.625rem] tracking-[0.25em] text-white/60 uppercase font-['Pixelify_Sans']">← ABOUT →</span>
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
              <span className="text-[11px] tracking-[0.25em] text-gray-400 uppercase font-['Pixelify_Sans'] font-[300]">
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