import PropTypes from 'prop-types';
import ShapeDivider from './ShapeDivider';

const ScrollSection = ({ 
  children, 
  isBlack = false, 
  isFirst = false,
  showTopDivider = false,
  showBottomDivider = false,
  dividerColor = null,
  dividerShape = 'wave',
  dividerHeight = 60,
  animationDuration = 22
}) => {
  // Determine divider color based on section color if not explicitly provided
  const topDividerColor = dividerColor || (isBlack ? '#ffffff' : '#000000');
  const bottomDividerColor = dividerColor || (isBlack ? '#000000' : '#ffffff');
  
  return (
    <section className={`w-screen relative ${isBlack ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
      {/* Top Shape Divider - only if not the first section and showTopDivider is true */}
      {!isFirst && showTopDivider && (
        <ShapeDivider 
          position="top"
          color={topDividerColor}
          shape={dividerShape}
          height={dividerHeight}
          animationDuration={animationDuration}
        />
      )}
      
      <div className="max-w-[120rem] mx-auto px-8">
        {children}
      </div>
      
      {/* Bottom Shape Divider */}
      {showBottomDivider && (
        <ShapeDivider 
          position="bottom"
          color={bottomDividerColor}
          shape={dividerShape}
          height={dividerHeight}
          animationDuration={animationDuration}
        />
      )}
    </section>
  );
};

ScrollSection.propTypes = {
  children: PropTypes.node.isRequired,
  isBlack: PropTypes.bool,
  isFirst: PropTypes.bool,
  showTopDivider: PropTypes.bool,
  showBottomDivider: PropTypes.bool,
  dividerColor: PropTypes.string,
  dividerShape: PropTypes.oneOf([
    'wave', 'curve', 'triangle', 'zigzag', 
    'arches', 'waves', 'bubbles', 'peaks', 'clouds', 'drops'
  ]),
  dividerHeight: PropTypes.number,
  animationDuration: PropTypes.number
};

export default ScrollSection; 