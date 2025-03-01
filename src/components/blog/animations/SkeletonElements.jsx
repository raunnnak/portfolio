import { motion } from 'framer-motion';
import styles from './SkeletonElements.module.css';

// Skeleton for blog cards
export const SkeletonCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={styles.skeletonCard}
    >
      <div className={styles.skeletonImage}>
        <div className={styles.skeletonScanlines}></div>
      </div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonCategory}></div>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonExcerpt}></div>
        <div className={styles.skeletonFooter}>
          <div className={styles.skeletonReadTime}></div>
          <div className={styles.skeletonReadMore}></div>
        </div>
      </div>
    </motion.div>
  );
};

// Skeleton for featured post
export const SkeletonFeaturedPost = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.skeletonFeaturedPost}
    >
      <div className={styles.skeletonScanlines}></div>
      <div className={styles.skeletonFeaturedContent}>
        <div className={styles.skeletonCategory}></div>
        <div className={styles.skeletonFeaturedTitle}>
          <div></div>
          <div className={styles.skeletonFeaturedTitleAccent}></div>
          <div></div>
        </div>
        <div className={styles.skeletonFeaturedExcerpt}></div>
        <div className={styles.skeletonFeaturedFooter}>
          <div className={styles.skeletonReadMoreButton}></div>
          <div className={styles.skeletonReadTime}></div>
        </div>
      </div>
    </motion.div>
  );
};

// Skeleton for blog post content
export const SkeletonPostContent = () => {
  return (
    <div className={styles.skeletonPostContent}>
      <div className={styles.skeletonScanlines}></div>
      <div className={styles.skeletonPostHeader}>
        <div className={styles.skeletonCategory}></div>
        <div className={styles.skeletonPostTitle}></div>
        <div className={styles.skeletonPostMeta}>
          <div className={styles.skeletonAuthor}></div>
          <div className={styles.skeletonDate}></div>
        </div>
      </div>
      <div className={styles.skeletonPostImage}></div>
      <div className={styles.skeletonPostBody}>
        <div className={styles.skeletonParagraph}></div>
        <div className={styles.skeletonParagraph}></div>
        <div className={styles.skeletonCodeBlock}></div>
        <div className={styles.skeletonParagraph}></div>
        <div className={styles.skeletonParagraph}></div>
      </div>
    </div>
  );
}; 