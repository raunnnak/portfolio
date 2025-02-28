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
      const maxWidth = window.innerWidth;
      const screenWidth = maxWidth;
      const offsetX = 0;
      
      const getX = (relativeX) => {
        return offsetX + (relativeX * screenWidth);
      };

      const positions = [];
      const numParticles = 1200;
      const numColumns = 35;
      
      const generatePosition = (index) => {
        const column = index % numColumns;
        const row = Math.floor(index / numColumns);
        const baseXSpread = column / (numColumns - 1);
        const xSpread = baseXSpread * 0.98 + 0.01 + (Math.random() * 0.02 - 0.01);
        
        // Adjusted vertical distribution to fill more of the screen
        const yBase = 0.2 + (row / (numParticles / numColumns)) * 45;  // Start higher (0.2) and spread more (45)
        
        let size;
        const sizeRandom = Math.random();
        if (sizeRandom < 0.45) {
          size = Math.random() * 4 + 2;
        } else if (sizeRandom < 0.75) {
          size = Math.random() * 6 + 6;
        } else if (sizeRandom < 0.9) {
          size = Math.random() * 8 + 12;
        } else {
          size = Math.random() * 6 + 20;
        }

        // Keep the enhanced floating parameters
        const floatParams = {
          primaryAmplitude: Math.random() * 50 + 30,
          secondaryAmplitude: Math.random() * 30 + 20,
          primarySpeed: Math.random() * 0.03 + 0.02,
          secondarySpeed: Math.random() * 0.02 + 0.015,
          phaseOffset: Math.random() * Math.PI * 2,
          directionChange: Math.random() * Math.PI * 2
        };
        
        return {
          x: xSpread,
          y: yBase + Math.random() * 2,  // Increased random vertical variation
          size: Math.round(size),
          opacity: 0.5 + Math.random() * 0.4,
          delay: (index * (6.5 / numParticles)) * 0.7,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.8,
          floatParams,
          scaleRange: 0.2 + Math.random() * 0.3
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
          targetY: y - canvas.height * 8,  // Increased vertical range
          size: pos.size,
          opacity: pos.opacity,
          delay: pos.delay,
          originalX: x,
          originalY: y - canvas.height * 8,  // Match the increased range
          rotation: pos.rotation,
          rotationSpeed: pos.rotationSpeed,
          floatParams: pos.floatParams,
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
      
      const currentOpacity = opacity.get();
      const scrollProgress = Math.min(1, scrollTop / scrollHeight);
      
      particles.forEach(particle => {
        particle.time += 0.05;  // Even faster time increment
        
        let particleProgress;
        if (currentOpacity === 1) {
          particleProgress = Math.max(0, Math.min(1, scrollProgress * 2.2 - particle.delay * 0.3));
        } else if (currentOpacity === 0) {
          particleProgress = 0;
        } else {
          const emergenceProgress = Math.max(0, Math.min(1, scrollProgress * 2.2 - particle.delay * 0.3));
          particleProgress = Math.max(emergenceProgress, particle.progress);
        }
        
        particle.progress = particleProgress;
        
        const startY = canvas.height + particle.size;
        const targetY = particle.targetY;
        const baseY = startY - (startY - targetY) * easeOutCubic(particleProgress);
        
        const fp = particle.floatParams;
        const time = particle.time;
        
        // Super simple, very obvious floating motion
        const floatX = Math.sin(time * fp.primarySpeed) * fp.primaryAmplitude;
        const floatY = Math.cos(time * fp.secondarySpeed) * fp.secondaryAmplitude;
        
        // More dynamic rotation
        particle.rotation += particle.rotationSpeed * (1 + Math.sin(time * 0.002) * 0.3);
        
        // More pronounced scale variation
        const movementScale = Math.sqrt(floatX * floatX + floatY * floatY) / fp.primaryAmplitude;
        const scale = 1 + Math.sin(time * 0.003) * particle.scaleRange * (1 + movementScale * 0.3);

        // Enhanced cursor interaction with more force
        if (mouseX && mouseY) {
          const dx = mouseX - (particle.x + floatX);
          const dy = mouseY - (baseY + floatY);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 600;
          
          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.08;
            particle.x += dx * force;
            baseY += dy * force;
          }
        }

        // Very quick return for responsive movement
        const returnSpeed = 0.05;  // Fixed, fast return speed
        particle.x += (particle.originalX - particle.x) * returnSpeed;

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
            className="absolute top-0 left-0 w-full h-full"
            style={{ y: backgroundY }}
          />
        </motion.div>
        
        <div className="relative z-10 flex items-center justify-center h-full w-full">
          <div className="max-w-[90rem] mx-auto px-8 relative h-full w-full">
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 flex items-center gap-1">
              <motion.span 
                className="text-[0.75rem] tracking-[0.25em] text-white/60 uppercase font-['Pixelify_Sans']"
                animate={{
                  y: [-5, 5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >&#123; ABOUT &#125;</motion.span>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
              <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-[200] text-white/100 tracking-[-0.02em] leading-[1.15] text-center max-w-[100rem] mx-auto">
                I pair strong <span className="font-['Cormorant'] italic font-[700] text-white text-[3rem] md:text-[4rem] lg:text-[5rem] tracking-[0.02em]">visual design</span> skills with a<br />
                focus on <span className="font-['Cormorant'] italic font-[700] text-white text-[3rem] md:text-[4rem] lg:text-[5rem] tracking-[0.02em]">user-centered</span> design.
              </h2>
            </div>

            <div className="absolute top-[62%] left-1/2 -translate-x-1/2 w-full">
              <p className="text-xs md:text-sm text-gray-400 font-[200] tracking-[-0.01em] text-center max-w-[65rem] mx-auto whitespace-nowrap">
                Your brand deserves a <span className="font-['Cormorant'] italic font-[700] text-[1.35em] tracking-[0.03em]">story</span> and an <span className="font-['Cormorant'] italic font-[700] text-[1.35em] tracking-[0.03em]">identity</span>. I make sure they're both compelling.
              </p>
            </div>
            
            <div className="absolute bottom-8 right-8 flex items-center gap-4">
              <motion.span 
                className="text-[11px] tracking-[0.25em] text-gray-400 uppercase font-['Pixelify_Sans'] font-[300] inline-block"
                animate={{
                  y: [-10, 10],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                SCROLL
              </motion.span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-gray-400 to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutIntro; 