import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ShapeDivider.module.css';

/**
 * Animated Shape Divider Component
 * 
 * Creates an animated wave-style divider between sections
 * Based on the Elementor shape divider animation technique
 * 
 * @param {Object} props - Component props
 * @param {string} props.position - Position of the divider ('top' or 'bottom')
 * @param {string} props.color - Color of the shape divider
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.shape - The type of shape to use
 * @param {number} props.height - Height of the divider in pixels
 * @param {number} props.animationDuration - Duration of the animation in seconds
 */
const ShapeDivider = ({ 
  position = 'bottom', 
  color = '#ffffff', 
  className = '', 
  shape = 'wave',
  height = 60,
  animationDuration = 22
}) => {
  const dividerRef = useRef(null);
  
  // Dictionary of SVG paths for different shapes
  const shapePaths = {
    wave: 'M0,0 C200,50 300,0 500,50 C700,100 800,50 1000,50 L1000,100 L0,100 Z',
    curve: 'M0,100 C250,0 750,0 1000,100 L1000,100 L0,100 Z',
    triangle: 'M0,100 L500,0 L1000,100 L0,100 Z',
    zigzag: 'M0,100 L250,0 L500,100 L750,0 L1000,100 L0,100 Z',
    arches: 'M0,0 C50,100 200,100 250,0 C300,100 450,100 500,0 C550,100 700,100 750,0 C800,100 950,100 1000,0 L1000,100 L0,100 Z',
    waves: 'M0,50 C100,0 200,100 300,50 C400,0 500,100 600,50 C700,0 800,100 900,50 C950,0 1000,25 1000,25 L1000,100 L0,100 Z',
    bubbles: 'M0,70 C150,100 350,0 500,100 C650,0 850,100 1000,70 L1000,100 L0,100 Z',
    peaks: 'M0,100 L250,30 L500,100 L750,30 L1000,100 L0,100 Z',
    clouds: 'M0,100 C100,20 300,100 400,30 C500,0 600,100 800,30 C900,10 1000,90 1000,90 L1000,100 L0,100 Z',
    drops: 'M0,100 C200,0 300,100 500,0 C700,100 800,0 1000,100 L0,100 Z'
  };

  // Get the path for the selected shape
  const path = shapePaths[shape] || shapePaths.wave;

  // Apply custom animation duration
  const customStyle = {
    '--animation-duration': `${animationDuration}s`
  };

  return (
    <div 
      ref={dividerRef}
      className={`${styles.shapeDivider} ${styles[`shape${position.charAt(0).toUpperCase() + position.slice(1)}`]} ${className} ${styles.animated}`}
      style={{ height: `${height}px`, ...customStyle }}
    >
      <svg 
        className={styles.shapeFill}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1000 100" 
        preserveAspectRatio="none"
        style={{ fill: color }}
      >
        <path d={path}></path>
      </svg>
    </div>
  );
};

ShapeDivider.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom']),
  color: PropTypes.string,
  className: PropTypes.string,
  shape: PropTypes.oneOf([
    'wave', 'curve', 'triangle', 'zigzag', 
    'arches', 'waves', 'bubbles', 'peaks', 'clouds', 'drops'
  ]),
  height: PropTypes.number,
  animationDuration: PropTypes.number
};

export default ShapeDivider; 