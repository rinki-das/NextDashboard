import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChevronRight, faArrowUp } from '@fortawesome/free-solid-svg-icons'; // Import solid icons
import styles from './performanceCard.module.css'; // Import local CSS module

const PerformanceCard = ({ isSidebarOpen }) => {
  return (
    <div className={`${styles.roundedLG} ${styles.shadowMD} ${styles.padding4} ${isSidebarOpen ? '' : styles.shrinkContent}`}>
      <div className={`${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter} ${styles.marginBottom4}`}>
        <h2 className={`${styles.textXL} ${styles.textGray800}`}>Performance</h2>
        <div className={`${styles.flex} ${styles.itemsCenter} ${styles.spaceX2}`}>
          <div className={`${styles.bgGray200} ${styles.padding2} ${styles.roundedLG} ${styles.flex} ${styles.itemsCenter}`}>
            <FontAwesomeIcon icon={faCalendar} className={`${styles.textGray500} ${styles.textSM}`} />
            <span className={`${styles.textGray500} ${styles.textSM}`}>This week Trend</span>
            <FontAwesomeIcon icon={faChevronRight} className={`${styles.textGray500} ${styles.textSM}`} />
          </div>
        </div>
      </div>
      <div className={`${styles.flex} ${styles.itemsCenter} ${styles.bgLightGreen} ${styles.largeGreenContainer} ${styles.justifyCenter}`}>
        <FontAwesomeIcon icon={faArrowUp} className={`${styles.textGreen500} ${styles.textSM}`} style={{ fontSize: '0.6rem' }} />
        <span className={`${styles.textGreen500} ${styles.textSM} ${styles.boldGreen}`}>
          Up 4%
        </span>
        <span className={`${styles.textGray600}`}> from previous week</span>
      </div>
      
      {/* New section for performance circle and stats */}
      <div className={styles.performanceContainer}>
        <div className={styles.performanceCircleContainer}>
          <div className={styles.performanceCircle}>
            45%
            <span className={styles.completedText}>Completed</span>
          </div>
        </div>
        <div className={styles.performanceStatsContainer}>
          <div className={styles.performanceStats}>
            <div className={styles.greenDot} />
            <span>23/52 Excellent</span>
          </div>
          <div className={styles.performanceStats}>
            <div className={styles.purpleDot} />
            <span>4/52 Good</span>
          </div>
          <div className={styles.performanceStats}>
            <div className={styles.yellowDot} />
            <span>22/52 Average</span>
          </div>
          <div className={styles.performanceStats}>
            <div className={styles.redDot} />
            <span>3/52 Below Average</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PerformanceCard;
