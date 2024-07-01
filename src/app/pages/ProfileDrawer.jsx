import React from 'react';
import { Drawer, Avatar, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Close as CloseIcon, CalendarToday as CalendarIcon, GetApp as DownloadIcon } from '@mui/icons-material';
import { FontAwesomeIcon, faCalendar } from '@fortawesome/react-fontawesome';
import { faSort, faChevronsUp, faArrowUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import styles from './ProfileDrawer.module.css';
import PerformanceCard from './PerformanceCard';
 // Import Avatar from MUI

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ProfileDrawer = ({ handleProfileClose }) => {
  const createGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, area.bottom);
    gradient.addColorStop(0, 'rgba(0, 128, 0, 0.3)'); // Blue at the top
    gradient.addColorStop(1, 'rgba(0, 128, 255, 0.3)'); // Green at the bottom
    return gradient;
  };

  const data = {
    labels: ['', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 May'],
    datasets: [
      {
        label: 'Blue Line',
        data: [null, 20, 14, 40, 45, 44],
        borderColor: '#1a7bf1',
        tension: 0.1,
        fill: true,
        borderWidth: 1,
      },
      {
        label: 'Green Line',
        data: [null, 24, 47, 48, 70, 89],
        borderColor: '#85f9ae',
        tension: 0.1,
        fill: true,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          padding: 6,
          font: {
            size: 9,
          },
        },
      },
      y: {
        grid: {
          display: false, // Hide y-axis grid lines
        },
        ticks: {
          stepSize: 20,
          font: {
            size: 9,
          },
        },
        title: {
          display: true,
          text: 'Task Completed (%)',
          align: 'center',
          color: '#aaabad',
          font: {
            size: 8,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart render
            return null;
          }
          return createGradient(ctx, chartArea);
        },
      },
    },
  };

  return (
    <div className={styles.profileDrawer}>
      {/* Drawer Header */}
      <div className={styles.drawerHeader}>
        <CloseIcon className={styles.closeIcon} onClick={handleProfileClose} />
      </div>

      {/* Drawer Content */}
      <div className={styles.drawerContent}>
        <div className={styles.profileContainer}>
          <Avatar
            alt="Your Name"
            src="https://s3-alpha-sig.figma.com/img/67fe/e701/78eb4d04731f74d6f2e21b9976bd1a2c?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YcVgzwWoWg-WC3M4irUesq~nmVbu5pyLivxD4PzrSRcu-jA~jKYaTha7gzDYuVWG5~gPagqWCwXsq-VcmwfM6m8wDpKpfUoF98m7TXXjVUfQ-4WoX64vwKhBPFcSSUxvXxhg6qlP-vaC~TpEOCJKkb60nMpRljl167kteUmuNpUs6KHl5ssgcyxeffqQ3B78Q56aTdZp9fo4eoEQQew5IYlmuXKOr4oMHx3DcAKqHmlPUpFIJGwY8QPd-KKBd2nlXG~zqw1bEC1oY26CB4LA1Bduap4irISTGj1uwK2Fm8X6hAwq1OtPBlp5qd1QRSh1OhNnjOhqfBRw64RUPXqPCg__" // Example URL
            className={styles.drawerAvatar}
          />
          <div className={styles.profileText}>
            <Typography variant="h6" className={styles.drawerName}>
              Subhangee Agarwal
            </Typography>
            <Typography variant="subtitle1" className={styles.drawerInfo}>
              Senior Manager
            </Typography>
            <Typography variant="body2" className={styles.drawerInfo}>
              Design | Kolkata
            </Typography>
          </div>
          <div className={styles.iconContainer}>
            <div className={styles.icon}>
              <CalendarIcon className={styles.calendarIcon} />
            </div>
            <div className={styles.icon}>
              <DownloadIcon className={styles.downloadIcon} />
            </div>
          </div>
        </div>

        {/* Horizontal Cards */}
        <div className={styles.horizontalCards}>
          {/* First Card (PerformanceCard) */}
          <div className={`${styles.card} ${styles.performanceCard}`}>
            <PerformanceCard />
          </div>

          {/* Second Card (Custom Design) */}
          <div className={`${styles.card} ${styles.customCard}`}>
            <div className={styles.customCardHeader}>
              <Typography variant="h6" className={styles.customCardTitle}>
                Task Completed (%)
              </Typography>
              <div className={styles.statusContainer}>
                <div className={styles.statusItem}>
                  <span className={`${styles.statusDot} ${styles.greenDot}`} />
                  <Typography variant="body2" className={styles.statusText}>
                    Completed
                  </Typography>
                </div>
                <div className={styles.statusItem}>
                  <span className={`${styles.statusDot} ${styles.blueDot}`} />
                  <Typography variant="body2" className={styles.statusText}>
                    On Time
                  </Typography>
                </div>
                <div className={`${styles.flex} ${styles.itemsCenter} ${styles.spaceX2}`}>
                  <div className={`${styles.bgGray200} ${styles.padding2} ${styles.roundedLG} ${styles.flex} ${styles.itemsCenter}`}>
                    <FontAwesomeIcon icon={faCalendar} className={`${styles.textGray500} ${styles.textSM}`} />
                    <span className={`${styles.textGray500} ${styles.textSM}`}>This week Trend</span>
                    <FontAwesomeIcon icon={faChevronRight} className={`${styles.textGray500} ${styles.textSM}`} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.graphContainer}>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>

        {/* Additional Profile Information */}
        <Typography variant="body1" className={styles.notApprovedText}>
          Task Not Approved: 34
        </Typography>

        {/* Bordered Container */}
        <div className={styles.borderedContainer}>
          <Typography variant="body2" className={`${styles.smallText}`}>
            One time Task
          </Typography>
          <div className={styles.verticalDivider} />
          <Typography variant="body2" className={`${styles.smallText}`}>
            Recurring Task
          </Typography>
          <div className={styles.verticalDivider} />
          <Typography variant="body2" className={`${styles.smallText}`}>
            Process
          </Typography>
        </div>

        {/* Bold Text */}
        <Typography variant="body2" className={styles.boldText}>
          Total one-time task - 34
        </Typography>

        {/* MUI Table with Container */}
        <TableContainer className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                  Task&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} style={{ color: '#8a8a8a' }} />
                </TableCell>
                <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                  Status&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} style={{ color: '#8a8a8a' }} />
                </TableCell>
                <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                  Assignee&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} style={{ color: '#8a8a8a' }} />
                </TableCell>
                <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                  Due Date&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} style={{ color: '#8a8a8a' }} />
                </TableCell>
                <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                  Priority&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} style={{ color: '#8a8a8a' }} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Table rows go here */}
              <TableRow>
                <TableCell>Inventory statement Check (COGS)</TableCell>
                <TableCell>
                  <div className={`${styles.statusContainer} ${styles.overdueContainer}`}>
                    Overdue
                  </div>
                </TableCell>
                <TableCell>
                  <div className={styles.assigneeContainer}>
                    <Avatar alt="John Doe" src="https://s3-alpha-sig.figma.com/img/87aa/96ce/42e32ff7dc42df96ee27c9b7445f57c0?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mZ0DAh-1AiXsiR-Lje6fVg0wNOq-TnptIJJIJ4-fXRpBTU0yF5CMmIrPCf5MWvH3V14sQ03rsAKVPzoBb7VKZNIL8J9VRDS50r~lt1x1Cv9pYi0ELBlok40fRk90sWE0Mq36n7PgExG7psoxkuQPOcsJ5RaT7Tgsmb1onk~Jpp5s3lo80yota4O0SL3jQnkTwSEEVhd~Mxx2ROCxVBbEt5z5wBN6jqCfP~M0ijtc7W5RXyCFQ2KkLIrOG0FeNTKl~9qK7qKSPg-bmkgrtEvi7gE~XGdufJZPMlMvZFWO6xo07mKtInXl69O3DsYynCF7YC0Rh4XFbJtgzrJtgZBy4A__" className={styles.assigneeAvatar} />
                    <Typography variant="body2" className={styles.assigneeName}>
                      John Doe
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>25 Mar, 2024</TableCell>
                <TableCell><FontAwesomeIcon icon={faArrowUp} style={{ color: "red" }} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Inventory statement Check (COGS)</TableCell>
                <TableCell>
                  <div className={`${styles.statusContainer} ${styles.upcomingContainer}`}>
                    Upcoming
                  </div>
                </TableCell>
                <TableCell>
                  <div className={styles.assigneeContainer}>
                    <Avatar alt="Jane Smith" src="https://s3-alpha-sig.figma.com/img/87aa/96ce/42e32ff7dc42df96ee27c9b7445f57c0?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mZ0DAh-1AiXsiR-Lje6fVg0wNOq-TnptIJJIJ4-fXRpBTU0yF5CMmIrPCf5MWvH3V14sQ03rsAKVPzoBb7VKZNIL8J9VRDS50r~lt1x1Cv9pYi0ELBlok40fRk90sWE0Mq36n7PgExG7psoxkuQPOcsJ5RaT7Tgsmb1onk~Jpp5s3lo80yota4O0SL3jQnkTwSEEVhd~Mxx2ROCxVBbEt5z5wBN6jqCfP~M0ijtc7W5RXyCFQ2KkLIrOG0FeNTKl~9qK7qKSPg-bmkgrtEvi7gE~XGdufJZPMlMvZFWO6xo07mKtInXl69O3DsYynCF7YC0Rh4XFbJtgzrJtgZBy4A__" className={styles.assigneeAvatar} />
                    <Typography variant="body2" className={styles.assigneeName}>
                      Jane Smith
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>25 Mar, 2024</TableCell>
                <TableCell><FontAwesomeIcon icon={faArrowUp} style={{ color: "red" }} /></TableCell> 
              </TableRow>
              <TableRow>
                <TableCell>Inventory statement Check (COGS)</TableCell>
                <TableCell>
                  <div className={`${styles.statusContainer} ${styles.overdueContainer}`}>
                    Overdue
                  </div>
                </TableCell>
                <TableCell>
                  <div className={styles.assigneeContainer}>
                    <Avatar alt="John Doe" src="https://s3-alpha-sig.figma.com/img/87aa/96ce/42e32ff7dc42df96ee27c9b7445f57c0?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mZ0DAh-1AiXsiR-Lje6fVg0wNOq-TnptIJJIJ4-fXRpBTU0yF5CMmIrPCf5MWvH3V14sQ03rsAKVPzoBb7VKZNIL8J9VRDS50r~lt1x1Cv9pYi0ELBlok40fRk90sWE0Mq36n7PgExG7psoxkuQPOcsJ5RaT7Tgsmb1onk~Jpp5s3lo80yota4O0SL3jQnkTwSEEVhd~Mxx2ROCxVBbEt5z5wBN6jqCfP~M0ijtc7W5RXyCFQ2KkLIrOG0FeNTKl~9qK7qKSPg-bmkgrtEvi7gE~XGdufJZPMlMvZFWO6xo07mKtInXl69O3DsYynCF7YC0Rh4XFbJtgzrJtgZBy4A__" className={styles.assigneeAvatar} />
                    <Typography variant="body2" className={styles.assigneeName}>
                      John Doe
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>25 Mar, 2024</TableCell>
                <TableCell><FontAwesomeIcon icon={faArrowUp} style={{ color: "red" }} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Inventory statement Check (COGS)</TableCell>
                <TableCell>
                  <div className={`${styles.statusContainer} ${styles.upcomingContainer}`}>
                    Upcoming
                  </div>
                </TableCell>
                <TableCell>
                  <div className={styles.assigneeContainer}>
                    <Avatar alt="Jane Smith" src="https://s3-alpha-sig.figma.com/img/87aa/96ce/42e32ff7dc42df96ee27c9b7445f57c0?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mZ0DAh-1AiXsiR-Lje6fVg0wNOq-TnptIJJIJ4-fXRpBTU0yF5CMmIrPCf5MWvH3V14sQ03rsAKVPzoBb7VKZNIL8J9VRDS50r~lt1x1Cv9pYi0ELBlok40fRk90sWE0Mq36n7PgExG7psoxkuQPOcsJ5RaT7Tgsmb1onk~Jpp5s3lo80yota4O0SL3jQnkTwSEEVhd~Mxx2ROCxVBbEt5z5wBN6jqCfP~M0ijtc7W5RXyCFQ2KkLIrOG0FeNTKl~9qK7qKSPg-bmkgrtEvi7gE~XGdufJZPMlMvZFWO6xo07mKtInXl69O3DsYynCF7YC0Rh4XFbJtgzrJtgZBy4A__" className={styles.assigneeAvatar} />
                    <Typography variant="body2" className={styles.assigneeName}>
                      Jane Smith
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>25 Mar, 2024</TableCell>
                <TableCell><FontAwesomeIcon icon={faArrowUp} style={{ color: "red" }} /></TableCell> 
              </TableRow>
              <TableRow>
                <TableCell>Inventory statement Check (COGS)</TableCell>
                <TableCell>
                  <div className={`${styles.statusContainer} ${styles.overdueContainer}`}>
                    Overdue
                  </div>
                </TableCell>
                <TableCell>
                  <div className={styles.assigneeContainer}>
                    <Avatar alt="John Doe" src="https://s3-alpha-sig.figma.com/img/87aa/96ce/42e32ff7dc42df96ee27c9b7445f57c0?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mZ0DAh-1AiXsiR-Lje6fVg0wNOq-TnptIJJIJ4-fXRpBTU0yF5CMmIrPCf5MWvH3V14sQ03rsAKVPzoBb7VKZNIL8J9VRDS50r~lt1x1Cv9pYi0ELBlok40fRk90sWE0Mq36n7PgExG7psoxkuQPOcsJ5RaT7Tgsmb1onk~Jpp5s3lo80yota4O0SL3jQnkTwSEEVhd~Mxx2ROCxVBbEt5z5wBN6jqCfP~M0ijtc7W5RXyCFQ2KkLIrOG0FeNTKl~9qK7qKSPg-bmkgrtEvi7gE~XGdufJZPMlMvZFWO6xo07mKtInXl69O3DsYynCF7YC0Rh4XFbJtgzrJtgZBy4A__" className={styles.assigneeAvatar} />
                    <Typography variant="body2" className={styles.assigneeName}>
                      John Doe
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>25 Mar, 2024</TableCell>
                <TableCell><FontAwesomeIcon icon={faArrowUp} style={{ color: "red" }} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Inventory statement Check (COGS)</TableCell>
                <TableCell>
                  <div className={`${styles.statusContainer} ${styles.upcomingContainer}`}>
                    Upcoming
                  </div>
                </TableCell>
                <TableCell>
                  <div className={styles.assigneeContainer}>
                    <Avatar alt="Jane Smith" src="https://s3-alpha-sig.figma.com/img/87aa/96ce/42e32ff7dc42df96ee27c9b7445f57c0?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mZ0DAh-1AiXsiR-Lje6fVg0wNOq-TnptIJJIJ4-fXRpBTU0yF5CMmIrPCf5MWvH3V14sQ03rsAKVPzoBb7VKZNIL8J9VRDS50r~lt1x1Cv9pYi0ELBlok40fRk90sWE0Mq36n7PgExG7psoxkuQPOcsJ5RaT7Tgsmb1onk~Jpp5s3lo80yota4O0SL3jQnkTwSEEVhd~Mxx2ROCxVBbEt5z5wBN6jqCfP~M0ijtc7W5RXyCFQ2KkLIrOG0FeNTKl~9qK7qKSPg-bmkgrtEvi7gE~XGdufJZPMlMvZFWO6xo07mKtInXl69O3DsYynCF7YC0Rh4XFbJtgzrJtgZBy4A__" className={styles.assigneeAvatar} />
                    <Typography variant="body2" className={styles.assigneeName}>
                      Jane Smith
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>25 Mar, 2024</TableCell>
                <TableCell><FontAwesomeIcon icon={faArrowUp} style={{ color: "red" }} /></TableCell> 
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
          {/* Pagination Controls */}
          <div className={styles.pagination}>
          <div className={styles.paginationLeft}>
            1-10 of 400
          </div>
          <div className={styles.paginationRight}>
            <FontAwesomeIcon icon={faChevronLeft} className={styles.paginationIcon} />
            <span>1 2 3 4</span>
            <FontAwesomeIcon icon={faChevronRight} className={styles.paginationIcon} />
          </div>
        </div>
      </div>
      </div>
  
  );
};

export default ProfileDrawer;
