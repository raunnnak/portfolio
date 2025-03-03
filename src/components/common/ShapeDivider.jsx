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
  height = 45,
  animationDuration = 28
}) => {
  const dividerRef = useRef(null);
  
  // Dictionary of SVG paths for different shapes
  const shapePaths = {
    wave: 'M0,40 C200,20 300,60 500,40 C700,20 800,60 1000,40 L1000,100 L0,100 Z',
    curve: 'M0,100 C300,30 700,30 1000,100 L1000,100 L0,100 Z',
    triangle: 'M0,100 L500,20 L1000,100 L0,100 Z',
    zigzag: 'M0,100 L250,30 L500,100 L750,30 L1000,100 L0,100 Z',
    arches: 'M0,30 C150,80 350,80 500,30 C650,80 850,80 1000,30 L1000,100 L0,100 Z',
    waves: 'M0,45 C150,25 300,65 450,45 C600,25 750,65 900,45 C950,35 1000,40 1000,40 L1000,100 L0,100 Z',
    bubbles: 'M0,70 C200,40 400,100 600,40 C800,100 900,70 1000,60 L1000,100 L0,100 Z',
    peaks: 'M0,100 L250,40 L500,100 L750,40 L1000,100 L0,100 Z',
    clouds: 'M0,80 C250,30 350,90 500,50 C650,20 750,60 1000,45 L1000,100 L0,100 Z',
    drops: 'M0,100 C200,30 300,80 500,30 C700,80 800,30 1000,100 L0,100 Z'
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