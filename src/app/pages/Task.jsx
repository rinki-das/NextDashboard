import React, { useState } from 'react';
import styles from './Task.module.css';
import CalendarCard from '../../components/CalendarCard'; // Adjust the path as per your project structure
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
} from '@mui/material';
import { Search, FilterList, GetApp, Fullscreen, ExpandMore, ExpandLess } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Example employees data
const employees = [
  { name: 'John Doe', taskOverdue: 3, weeklyScore: 85, department: 'Engineering', branch: 'New York', notApprovedCount: 1, photo: '/images/john_doe.jpg' },
  { name: 'Jane Smith', taskOverdue: 0, weeklyScore: 92, department: 'Marketing', branch: 'San Francisco', notApprovedCount: 0, photo: '/images/jane_smith.jpg' },
  // Add more employees as needed
];

const Task = ({ isSidebarOpen }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // State for expand/collapse
  const [isTableFullscreen, setIsTableFullscreen] = useState(false); // State for fullscreen
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  // Function to handle pagination controls
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Filtered employees based on search query
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Slice data for current page
  const displayedEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Function to download table as PDF
  const downloadPDF = () => {
    const input = document.getElementById('table-to-pdf'); // ID of the table
    html2canvas(input)
      .then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297); // A4 size: 210 x 297 mm
        pdf.save('table.pdf');
      });
  };

  // Function to toggle expand/collapse state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to toggle fullscreen state
  const toggleFullscreen = () => {
    setIsTableFullscreen(!isTableFullscreen);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.taskContainer}>
      <h1 className={styles.taskTitle}>Member Insights</h1>
      <div className={styles.cardContainer}>
        {!isSidebarOpen && (
          // Show only if sidebar is closed
          <div className={styles.card}>
            <CalendarCard />
          </div>
        )}
        <div className={`${styles.card} ${isExpanded ? styles.expandedTable : ''}`}>
          <h2 className={styles.cardTitle}>Performance</h2>
          <p className={styles.cardContent}>Content for Performance card...</p>
        </div>
        <div className={`${styles.card} ${isExpanded ? styles.expandedTable : ''}`}>
          <h2 className={styles.cardTitle}>Top Performances</h2>
          <p className={styles.cardContent}>Content for Top Performances card...</p>
        </div>
        <div className={`${styles.card} ${isExpanded ? styles.expandedTable : ''}`}>
          <h2 className={styles.cardTitle}>Fourth Card</h2>
          <p className={styles.cardContent}>Content for the fourth card...</p>
        </div>
      </div>
      <div className={`${styles.tableContainer} ${isTableFullscreen ? styles.fullscreenTableContainer : ''}`}>
        <div className={styles.tableHeader}>
          <Typography variant="h6" className={styles.boldText}>Team Members</Typography>
          <IconButton onClick={toggleExpand}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
        <div className={styles.tableActions}>
          <div className={`${styles.searchContainer} ${!isSidebarOpen ? styles.searchContainerClosed : ''}`}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              className={`${styles.searchField} ${isSidebarOpen ? styles.searchFieldOpen : styles.searchFieldClosed}`}
            />
          </div>
          <div className={styles.iconContainer}>
            <IconButton className={styles.iconButton}>
              <FilterList />
            </IconButton>
            <IconButton className={styles.iconButton}>
              <GetApp onClick={downloadPDF} />
            </IconButton>
            <IconButton className={styles.iconButton} onClick={toggleFullscreen}>
              <Fullscreen />
            </IconButton>
          </div>
        </div>
        <div className={styles.outerTableContainer}>
          <TableContainer component={Paper} className={`${styles.roundedTableContainer} ${isTableFullscreen ? styles.fullscreenTable : ''}`}>
            <Table id="table-to-pdf" className={`${styles.roundedTable} ${isTableFullscreen ? styles.fullscreenTable : ''}`}>
              <TableHead>
                <TableRow className={styles.blueHeader}>
                  <TableCell></TableCell> {/* Empty TableCell for Photo */}
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Name&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Task Overdue&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Weekly Score %&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Department&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Branch&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Not Approved Count&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedEmployees.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell className={styles.checkboxContainer}>
                      <input type="checkbox" className={styles.checkboxInput} checked={isChecked} onChange={handleCheckboxChange} />
                      <div className={styles.roundPhoto}>
                        <Avatar alt={employee.name} src={employee.photo} />
                      </div>
                    </TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.taskOverdue}</TableCell>
                    <TableCell>{employee.weeklyScore}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.branch}</TableCell>
                    <TableCell>{employee.notApprovedCount}</TableCell>
                    <TableCell>
                      <img src="/images/email.png" alt="Email" className={styles.emailIcon} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={styles.paginationContainer}>
            <Typography variant="body2">{`${startIndex + 1} - ${Math.min(endIndex, filteredEmployees.length)} of ${filteredEmployees.length}`}</Typography>
            <div className={styles.paginationControls}>
              <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                <span>&lt;</span>
              </IconButton>
              {[...Array(Math.ceil(filteredEmployees.length / rowsPerPage))].map((_, index) => (
                <span key={index} onClick={() => handlePageChange(index + 1)} className={page === index + 1 ? styles.activePage : ''}>
                  {index + 1}
                </span>
              ))}
              <IconButton onClick={() => handlePageChange(page + 1)} disabled={page === Math.ceil(filteredEmployees.length / rowsPerPage)}>
                <span>&gt;</span>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
