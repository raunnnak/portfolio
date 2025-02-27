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
    let frame = 0;

    const resizeCanvas = () => {
      canvas.width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      canvas.height = window.innerHeight;
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a0f');
      gradient.addColorStop(0.5, '#141428');
      gradient.addColorStop(1, '#0a0a0f');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const createParticles = () => {
      particles = [];
      const numParticles = 300;
      
      for (let i = 0; i < numParticles; i++) {
        const sizeGroup = Math.random();
        let size, opacity, speed, color, glowRadius, shimmerSpeed;

        if (sizeGroup > 0.98) {
          size = Math.random() * 3 + 2;
          opacity = Math.random() * 0.2 + 0.8;
          speed = 0.15;
          color = 'rgba(255, 255, 255, 1)';
          glowRadius = size * 4;
          shimmerSpeed = 0.08;
        } else if (sizeGroup > 0.9) {
          size = Math.random() * 2 + 1.5;
          opacity = Math.random() * 0.3 + 0.5;
          speed = 0.2;
          color = 'rgba(220, 225, 255, 1)';
          glowRadius = size * 3;
          shimmerSpeed = 0.05;
        } else {
          size = Math.random() * 1 + 0.5;
          opacity = Math.random() * 0.3 + 0.2;
          speed = 0.25;
          color = 'rgba(200, 210, 255, 1)';
          glowRadius = size * 2;
          shimmerSpeed = 0.03;
        }

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          baseOpacity: opacity,
          currentOpacity: opacity,
          color,
          glowRadius,
          shimmerSpeed,
          shimmerOffset: Math.random() * Math.PI * 2,
          speedX: (Math.random() - 0.5) * speed * 2,
          speedY: (Math.random() - 0.5) * speed
        });
      }
    };

    const drawStar = (x, y, size, opacity, color, glowRadius) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
      gradient.addColorStop(0, color.replace('1)', `${opacity})`));
      gradient.addColorStop(0.5, color.replace('1)', `${opacity * 0.3})`));
      gradient.addColorStop(1, color.replace('1)', '0)'));

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = color.replace('1)', `${opacity})`);
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      frame++;
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a0f');
      gradient.addColorStop(0.5, '#141428');
      gradient.addColorStop(1, '#0a0a0f');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const shimmer = Math.sin(frame * particle.shimmerSpeed + particle.shimmerOffset) * 0.3 + 0.7;
        particle.currentOpacity = particle.baseOpacity * shimmer;

        drawStar(
          particle.x,
          particle.y,
          particle.size,
          particle.currentOpacity,
          particle.color,
          particle.glowRadius
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
      className="relative bg-black w-screen -mt-20"
      style={{ 
        height: '700vh',
        margin: 0,
        padding: 0,
        transform: 'translateX(-50%)',
        marginLeft: '50%'
      }}
    >
      <motion.div
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0f]"
        style={{ 
          opacity,
          width: '100vw',
          margin: 0,
          padding: 0
        }}
      >
        <motion.div 
          className="absolute inset-0 w-full"
          style={{
            width: '100vw',
            margin: 0,
            padding: 0
          }}
        >
          <motion.canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-screen h-full"
            style={{ y: backgroundY }}
          />
        </motion.div>
        
        <div className="relative z-10 flex items-center justify-center h-full w-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
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
      </motion.div>
    </motion.div>
  );
};

export default AboutIntro; 