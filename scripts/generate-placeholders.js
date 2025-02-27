import { createCanvas } from 'canvas';
import fs from 'fs';
import sharp from 'sharp';

// Create directory if it doesn't exist
if (!fs.existsSync('public/projects')) {
  fs.mkdirSync('public/projects', { recursive: true });
}

// Project mockup configurations with more asymmetric designs
const projects = [
  {
    name: 'ecommerce',
    colors: ['#1A1A1A', '#252525'],
    elements: [
      // Left sidebar
      { type: 'rect', x: 80, y: 80, w: 320, h: 920, color: '#222222' },
      // Main content area - product grid
      { type: 'rect', x: 440, y: 80, w: 1400, h: 920, color: '#202020' },
      // Product cards - asymmetric layout
      { type: 'rect', x: 480, y: 120, w: 400, h: 400, color: '#2A2A2A' },
      { type: 'rect', x: 920, y: 120, w: 400, h: 400, color: '#2A2A2A' },
      { type: 'rect', x: 1360, y: 120, w: 400, h: 400, color: '#2A2A2A' },
      { type: 'rect', x: 480, y: 560, w: 820, h: 400, color: '#2A2A2A' },
      { type: 'rect', x: 1340, y: 560, w: 420, h: 400, color: '#2A2A2A' },
      // UI elements
      { type: 'rect', x: 120, y: 150, w: 240, h: 40, color: '#333333' },
      { type: 'rect', x: 120, y: 220, w: 180, h: 30, color: '#333333' },
      { type: 'rect', x: 120, y: 280, w: 200, h: 30, color: '#333333' },
      { type: 'rect', x: 120, y: 340, w: 160, h: 30, color: '#333333' },
    ]
  },
  {
    name: 'dashboard',
    colors: ['#121212', '#1E1E1E'],
    elements: [
      // Top navigation
      { type: 'rect', x: 0, y: 0, w: 1920, h: 80, color: '#1A1A1A' },
      // Left sidebar
      { type: 'rect', x: 0, y: 80, w: 280, h: 1000, color: '#1A1A1A' },
      // Main content - asymmetric layout
      // Large chart
      { type: 'rect', x: 320, y: 120, w: 1000, h: 400, color: '#222222' },
      // Stats cards
      { type: 'rect', x: 1360, y: 120, w: 500, h: 180, color: '#222222' },
      { type: 'rect', x: 1360, y: 340, w: 500, h: 180, color: '#222222' },
      // Bottom charts - asymmetric
      { type: 'rect', x: 320, y: 560, w: 480, h: 300, color: '#222222' },
      { type: 'rect', x: 840, y: 560, w: 480, h: 300, color: '#222222' },
      { type: 'rect', x: 1360, y: 560, w: 500, h: 300, color: '#222222' },
      // UI elements
      { type: 'rect', x: 60, y: 120, w: 160, h: 30, color: '#333333' },
      { type: 'rect', x: 60, y: 180, w: 140, h: 30, color: '#333333' },
      { type: 'rect', x: 60, y: 240, w: 180, h: 30, color: '#333333' },
    ]
  },
  {
    name: 'travel',
    colors: ['#151515', '#202020'],
    elements: [
      // Phone frame
      { type: 'rect', x: 680, y: 80, w: 560, h: 920, rx: 30, ry: 30, color: '#1A1A1A' },
      // Screen
      { type: 'rect', x: 700, y: 100, w: 520, h: 880, color: '#0F0F0F' },
      // UI elements - asymmetric layout
      { type: 'rect', x: 720, y: 140, w: 480, h: 300, color: '#222222' },
      { type: 'rect', x: 720, y: 460, w: 230, h: 230, color: '#222222' },
      { type: 'rect', x: 970, y: 460, w: 230, h: 230, color: '#222222' },
      { type: 'rect', x: 720, y: 710, w: 480, h: 120, color: '#222222' },
      { type: 'rect', x: 720, y: 850, w: 480, h: 80, color: '#222222' },
      // Left side content
      { type: 'rect', x: 200, y: 300, w: 400, h: 60, color: '#222222' },
      { type: 'rect', x: 200, y: 380, w: 300, h: 40, color: '#222222' },
      { type: 'rect', x: 200, y: 440, w: 350, h: 40, color: '#222222' },
      // Right side content
      { type: 'rect', x: 1320, y: 300, w: 400, h: 60, color: '#222222' },
      { type: 'rect', x: 1320, y: 380, w: 300, h: 40, color: '#222222' },
      { type: 'rect', x: 1320, y: 440, w: 350, h: 40, color: '#222222' },
    ]
  },
  {
    name: 'healthcare',
    colors: ['#101010', '#1A1A1A'],
    elements: [
      // Top navigation
      { type: 'rect', x: 0, y: 0, w: 1920, h: 80, color: '#151515' },
      // Left sidebar
      { type: 'rect', x: 0, y: 80, w: 320, h: 1000, color: '#151515' },
      // Main content - asymmetric layout
      // Header area
      { type: 'rect', x: 360, y: 120, w: 1500, h: 160, color: '#1E1E1E' },
      // Content blocks - asymmetric
      { type: 'rect', x: 360, y: 320, w: 700, h: 400, color: '#1E1E1E' },
      { type: 'rect', x: 1100, y: 320, w: 760, h: 180, color: '#1E1E1E' },
      { type: 'rect', x: 1100, y: 540, w: 760, h: 180, color: '#1E1E1E' },
      // Bottom section
      { type: 'rect', x: 360, y: 760, w: 1500, h: 240, color: '#1E1E1E' },
      // UI elements
      { type: 'rect', x: 60, y: 120, w: 200, h: 40, color: '#333333' },
      { type: 'rect', x: 60, y: 180, w: 180, h: 30, color: '#333333' },
      { type: 'rect', x: 60, y: 240, w: 220, h: 30, color: '#333333' },
      { type: 'rect', x: 60, y: 300, w: 160, h: 30, color: '#333333' },
    ]
  }
];

// Canvas dimensions (16:9 aspect ratio)
const width = 1920;
const height = 1080;

async function generatePlaceholder(project) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, project.colors[0]);
  gradient.addColorStop(1, project.colors[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw elements
  project.elements.forEach(el => {
    ctx.fillStyle = el.color;
    
    if (el.rx && el.ry) {
      // Draw rounded rectangle
      roundRect(ctx, el.x, el.y, el.w, el.h, el.rx, el.ry);
    } else {
      // Draw regular rectangle
      ctx.fillRect(el.x, el.y, el.w, el.h);
    }
  });

  // Add subtle grain texture
  addNoiseTexture(ctx, width, height, 0.03);

  // Convert to WebP using sharp
  const buffer = canvas.toBuffer('image/png');
  await sharp(buffer)
    .webp({ quality: 90 })
    .toFile(`public/projects/${project.name}.webp`);
}

// Helper function to draw rounded rectangles
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

// Add subtle noise texture
function addNoiseTexture(ctx, width, height, opacity) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 255 * opacity;
    data[i] = Math.min(data[i] + noise, 255);
    data[i+1] = Math.min(data[i+1] + noise, 255);
    data[i+2] = Math.min(data[i+2] + noise, 255);
  }
  
  ctx.putImageData(imageData, 0, 0);
}

// Generate all project images
async function generateAll() {
  for (const project of projects) {
    await generatePlaceholder(project);
    console.log(`Generated ${project.name}.webp`);
  }
}

generateAll().catch(console.error); 