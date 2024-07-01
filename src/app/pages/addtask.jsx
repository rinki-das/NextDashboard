import React, { useState } from 'react';
import styles from './Task.module.css';
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
  Button,
  Drawer,
  Box,
  FormControl,
  InputLabel, MenuItem, Select,
} from '@mui/material';
import { Search, FilterList, GetApp, Fullscreen, ExpandMore, ExpandLess } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { faBell as farBell, faEnvelope, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';
import ProfileDrawer from './ProfileDrawer'; // Adjust the path as necessary


const employees = [
  { name: 'John Doe', taskOverdue: 3, weeklyScore: 85, department: 'Engineering', branch: 'New York', notApprovedCount: 1, photo: 'https://s3-alpha-sig.figma.com/img/4bc7/938d/1780151ede42298971c5225154399ae1?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h-pcSE6pyPlmYvhWkED991JWUy0e6BNrvijXnzmBgmHvSX88kzbtAtCSCMPzwmbKgVh~ALaQaSI7qTHUKgMqZ-z~VxEqy1XELX6fnKVW0cQSaiod7ZmkUy~sEsklwJL7fnctSa-uP1~U2zQLYODMMIRAEn8vfX5DG27p3izsGSqWVK8p5BhMdE6WJKBvMAS~E-9ZRH~yaEz5RANY2NfGN85PxsYK8CD2RzbvM9EB8fZ4CjK7V3hhJOW4gDxrvHNN5rlIQV5dGlpNsaHJFEDtEZDXyW4r43Q9v7GHHkcnXJwR4mac-1lsQhRs8crHJbStfcoyH89aNFaNYPeVwQlICQ__' },
  { name: 'Jane Smith', taskOverdue: 0, weeklyScore: 92, department: 'Marketing', branch: 'San Francisco', notApprovedCount: 0, photo: 'https://s3-alpha-sig.figma.com/img/2405/e02a/9413a640fe960350945e8e8286b9e420?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DUpLO9MutEg22u0Xz8Kil4x5mx2mQchpbsuWFGXKLJLTPZ1rlBRIVG5GUYjSpcQpp3p9Ro54xUTLnn~jZTFAJEspUZYeaQt48AJCHgr6ovNWlHKKoIeB6jOJZG4v0tnaZ4Uc6Iuc8iqDuoVGNfz2RvX00kvlY8z-N9frTknqrh2EB8ehHXOghdJdaumqJ2ebv-ox0cbx4jA-h8oIefA5d~6cUljSHOIsMCIIxTA~uvNxBQtV2fEC~~meDS4s5iX0Zm~GvWfshhCz4lchLBMotpMl2Y8Pk-4hlUN5DYfggul4ZPdyrXV--1SelOZdXHMzoNrJhUX3RO2fFbvHJwV9iQ__' },
  { name: 'Emily Johnson', taskOverdue: 2, weeklyScore: 78, department: 'Finance', branch: 'Chicago', notApprovedCount: 2, photo: 'https://s3-alpha-sig.figma.com/img/5542/84b6/9aede8a476ddb6b88431bce799d3461e?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bDn2r~uWNs03gjNM0ttHbh5bj2mAilhFTieT1nLWE-GRmILe51cQpVWXGVZ2sBL-YBOgjJQ42wEdYf-UKIIegd6pGlSF6UzZo3TLp377InHYR60B~OrpVrAVZRqM9LTm9w1bB7lY5L2Kj0NK8AxMbUK6k6hqV-bRn4jXqxiREJV31Ccw2BoFViqHSTunfwY8D3IZj~gXqPdy46bg1U-bQB14ISbj-5FcFeQSiO8jhvvJwPl~xfowN70dtnOySaRkJQpC4LGsXQ0~FlgN6TLVcq6eSMKbqai5p7lcIVRJZ-kHJaJWs-CLhMyLUQoI-12gncegzF84HnuNk9j~w099Hw__' },
  { name: 'Michael Brown', taskOverdue: 1, weeklyScore: 80, department: 'HR', branch: 'Boston', notApprovedCount: 0, photo: 'https://s3-alpha-sig.figma.com/img/87aa/96ce/42e32ff7dc42df96ee27c9b7445f57c0?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mbkYwM5LpCH2bliJuiSiu0KdL2fKMDzbfBljlYlCQAutKshTZ3ZNx2-SOim13ia9ou~7rFIW6BZu8anM2n8tKjIX-BUQjaFuoIbMS6pP8gPYwaL1FqeRbaICGkw0E-1sky9XTYjnAlZfnLWZ0KIP0PbFwaRhu8yu0aCEKBae9HUwd8ok23YwhppNbW0GRFCi1Hw1Jio19JoRuqDew3slKPlZ1MrlrNTC7jVGqzkbMNBka3wUDUZh-Gvw4hX1-QmsVM2qgvUTDpHs7DIMyDyHgThN9B2JTuYBsADlAl~ULB1Zme1YZkRp6RB7O9pWxxR6JkgrpWaAkg6cqPrEDwIcBw__' },
  { name: 'Jessica Davis', taskOverdue: 4, weeklyScore: 88, department: 'Engineering', branch: 'Seattle', notApprovedCount: 3 , photo: 'https://s3-alpha-sig.figma.com/img/7644/bf65/bcff340f9b653e44a1598d9c6042065f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nlnkfVmOYfDlrfOnFO7e3Dj0daBs2~U1DjRQ-BXOj5F7wfCdcj28hvJ8LfPXq~LrJXjObwaYUXY3dD0P0HuF0ENzPWJAUJ8Lhi25sclPivx2hJ06eLjfNwxHA8gN09Ich0fiJ7Wy9p-VwivOpu5hp03X0G8f8VeErUo5okDoPnLs3Q5BNBbkrXf0jBPwkj1gR-EmZi~3LvhX2fqtZUTsSR1cMaBScESDbS7ujc947MxC0SV0aQlKO-rSaFhc55lQ402u5w~VRX2kvqZVl417dYOB3-mZJpTNPmQCM7DO1TDcnRKufx4gAcq2XD~OE~gWJk9SBK9~uYSrLNMYqeNAMg__'},
  { name: 'Daniel Wilson', taskOverdue: 0, weeklyScore: 95, department: 'Design', branch: 'Austin', notApprovedCount: 0, photo: 'https://s3-alpha-sig.figma.com/img/0790/5147/ffbba7b206b94aceb0fc9ee4568d309d?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HvKY3lCM2gS1i2uxE2KUC4jH0t5hB2gaoG6qgKfWsN531Kbf0KeUIh7Ap9jAg2YS1yY4GBdwDTLJi55x3I~0r8mcmKFMfwjAgWJOWBoaX5yl-lsaXEtghIJrg9mynJkxa3LfmIRB-3VxE-7x4wn-cfQu4wpjUSPUTQD~gcQ6QrpamRPDvpz4cO-v6j6a2T1tt7heJ~wLLO72cTWxrTN5odSsoyO4G0oft~7iLbZKKbGK7NSS39CC24~jiCUIOpzX5656Gx4TsVY7LMuR9YTZElqrxb5UZSOTVysnTmAvBYlit7jBBYhJqTfK9Z6kvzgcU~QXYXo9tml7OCaCQjHEKw__' },
  { name: 'Matthew Moore', taskOverdue: 1, weeklyScore: 85, department: 'Engineering', branch: 'Denver', notApprovedCount: 1 , photo: 'https://s3-alpha-sig.figma.com/img/9665/f675/3103df52ee78d6e4d9f90d52ba269b53?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j84Etei6f11fYmQVVKWX4IZhNsIS-INNECL83kjGxjxYabCDrEXGATzDkO9FKPKM-kLfw6a2hZYTH-e2XCNazVYy4LxiFogjzMmm6nFI6ZEL9HV6xJ~KMvKS8BnPrjKaF6FB4PLiaoKPUmbwtKSxbD0d-tWu3w1Z-YhJdCf9oe9Jp1RDCtIbOZcGDXGMRs6e9kFJvvLx6oznaU43NnJZoLF64eI067ZEr3FDZgabGsaBSf2HiF~w0hlnCvz7rcd4gzWTJZRaIvJu4l4-sea9HTud6oYVe-E4fN7V2-5VVs8kenc4eLT0ZuVgbFq4jujLakxCGUKafzbqx-Z123DmQg__'},
  { name: 'Ashley Taylor', taskOverdue: 0, weeklyScore: 93, department: 'Finance', branch: 'Chicago', notApprovedCount: 0, photo: 'https://s3-alpha-sig.figma.com/img/9665/f675/3103df52ee78d6e4d9f90d52ba269b53?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j84Etei6f11fYmQVVKWX4IZhNsIS-INNECL83kjGxjxYabCDrEXGATzDkO9FKPKM-kLfw6a2hZYTH-e2XCNazVYy4LxiFogjzMmm6nFI6ZEL9HV6xJ~KMvKS8BnPrjKaF6FB4PLiaoKPUmbwtKSxbD0d-tWu3w1Z-YhJdCf9oe9Jp1RDCtIbOZcGDXGMRs6e9kFJvvLx6oznaU43NnJZoLF64eI067ZEr3FDZgabGsaBSf2HiF~w0hlnCvz7rcd4gzWTJZRaIvJu4l4-sea9HTud6oYVe-E4fN7V2-5VVs8kenc4eLT0ZuVgbFq4jujLakxCGUKafzbqx-Z123DmQg__' },
  { name: 'James Anderson', taskOverdue: 3, weeklyScore: 82, department: 'HR', branch: 'Boston', notApprovedCount: 2, photo: 'https://s3-alpha-sig.figma.com/img/9665/f675/3103df52ee78d6e4d9f90d52ba269b53?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j84Etei6f11fYmQVVKWX4IZhNsIS-INNECL83kjGxjxYabCDrEXGATzDkO9FKPKM-kLfw6a2hZYTH-e2XCNazVYy4LxiFogjzMmm6nFI6ZEL9HV6xJ~KMvKS8BnPrjKaF6FB4PLiaoKPUmbwtKSxbD0d-tWu3w1Z-YhJdCf9oe9Jp1RDCtIbOZcGDXGMRs6e9kFJvvLx6oznaU43NnJZoLF64eI067ZEr3FDZgabGsaBSf2HiF~w0hlnCvz7rcd4gzWTJZRaIvJu4l4-sea9HTud6oYVe-E4fN7V2-5VVs8kenc4eLT0ZuVgbFq4jujLakxCGUKafzbqx-Z123DmQg__' },
  { name: 'Patricia Thomas', taskOverdue: 2, weeklyScore: 75, department: 'Design', branch: 'Austin', notApprovedCount: 0, photo: 'https://s3-alpha-sig.figma.com/img/9665/f675/3103df52ee78d6e4d9f90d52ba269b53?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j84Etei6f11fYmQVVKWX4IZhNsIS-INNECL83kjGxjxYabCDrEXGATzDkO9FKPKM-kLfw6a2hZYTH-e2XCNazVYy4LxiFogjzMmm6nFI6ZEL9HV6xJ~KMvKS8BnPrjKaF6FB4PLiaoKPUmbwtKSxbD0d-tWu3w1Z-YhJdCf9oe9Jp1RDCtIbOZcGDXGMRs6e9kFJvvLx6oznaU43NnJZoLF64eI067ZEr3FDZgabGsaBSf2HiF~w0hlnCvz7rcd4gzWTJZRaIvJu4l4-sea9HTud6oYVe-E4fN7V2-5VVs8kenc4eLT0ZuVgbFq4jujLakxCGUKafzbqx-Z123DmQg__' },
  { name: 'Christopher Jackson', taskOverdue: 0, weeklyScore: 90, department: 'Marketing', branch: 'San Francisco', notApprovedCount: 0, photo: 'https://s3-alpha-sig.figma.com/img/9665/f675/3103df52ee78d6e4d9f90d52ba269b53?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j84Etei6f11fYmQVVKWX4IZhNsIS-INNECL83kjGxjxYabCDrEXGATzDkO9FKPKM-kLfw6a2hZYTH-e2XCNazVYy4LxiFogjzMmm6nFI6ZEL9HV6xJ~KMvKS8BnPrjKaF6FB4PLiaoKPUmbwtKSxbD0d-tWu3w1Z-YhJdCf9oe9Jp1RDCtIbOZcGDXGMRs6e9kFJvvLx6oznaU43NnJZoLF64eI067ZEr3FDZgabGsaBSf2HiF~w0hlnCvz7rcd4gzWTJZRaIvJu4l4-sea9HTud6oYVe-E4fN7V2-5VVs8kenc4eLT0ZuVgbFq4jujLakxCGUKafzbqx-Z123DmQg__' },
  { name: 'Linda White', taskOverdue: 1, weeklyScore: 87, department: 'Engineering', branch: 'New York', notApprovedCount: 1, photo: 'https://s3-alpha-sig.figma.com/img/9665/f675/3103df52ee78d6e4d9f90d52ba269b53?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j84Etei6f11fYmQVVKWX4IZhNsIS-INNECL83kjGxjxYabCDrEXGATzDkO9FKPKM-kLfw6a2hZYTH-e2XCNazVYy4LxiFogjzMmm6nFI6ZEL9HV6xJ~KMvKS8BnPrjKaF6FB4PLiaoKPUmbwtKSxbD0d-tWu3w1Z-YhJdCf9oe9Jp1RDCtIbOZcGDXGMRs6e9kFJvvLx6oznaU43NnJZoLF64eI067ZEr3FDZgabGsaBSf2HiF~w0hlnCvz7rcd4gzWTJZRaIvJu4l4-sea9HTud6oYVe-E4fN7V2-5VVs8kenc4eLT0ZuVgbFq4jujLakxCGUKafzbqx-Z123DmQg__' },
  { name: 'Anthony Harris', taskOverdue: 2, weeklyScore: 77, department: 'Finance', branch: 'Chicago', notApprovedCount: 3 , photo: 'https://s3-alpha-sig.figma.com/img/9665/f675/3103df52ee78d6e4d9f90d52ba269b53?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j84Etei6f11fYmQVVKWX4IZhNsIS-INNECL83kjGxjxYabCDrEXGATzDkO9FKPKM-kLfw6a2hZYTH-e2XCNazVYy4LxiFogjzMmm6nFI6ZEL9HV6xJ~KMvKS8BnPrjKaF6FB4PLiaoKPUmbwtKSxbD0d-tWu3w1Z-YhJdCf9oe9Jp1RDCtIbOZcGDXGMRs6e9kFJvvLx6oznaU43NnJZoLF64eI067ZEr3FDZgabGsaBSf2HiF~w0hlnCvz7rcd4gzWTJZRaIvJu4l4-sea9HTud6oYVe-E4fN7V2-5VVs8kenc4eLT0ZuVgbFq4jujLakxCGUKafzbqx-Z123DmQg__'},
  
];

const AddTask = ({ isSidebarOpen }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTableFullscreen, setIsTableFullscreen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer visibility
  const [branch, setBranch] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedInterval, setSelectedInterval] = useState('');
  const [selectedScore, setSelectedScore] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
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


  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to toggle drawer visibility
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleIntervalSelect = (interval) => {
    setSelectedInterval(interval);
  };

  const handleScoreSelect = (score) => {
    setSelectedScore(score);
  };


 // Function to handle opening profile drawer
 const handleProfileOpen = () => {
  setProfileOpen(true);
  setIsDropdownOpen(false); // Close dropdown when profile drawer opens
};

// Function to handle closing profile drawer
const handleProfileClose = () => {
  setProfileOpen(false);
};




  return (
    <div className={styles.taskContainer}>
      <div className={styles.header}>
        <h1 className={styles.taskTitle}>Member Insights</h1>
        <div className={styles.headerIcons}>
          <Button variant="contained" color="primary" className={styles.addButton}>
            Add Task +
          </Button>
          <IconButton className={styles.icons}>
            <FontAwesomeIcon icon={farBell} style={{ fontSize: '20px' }} />
          </IconButton>

          <IconButton className={styles.icons}>
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '20px' }} />
          </IconButton>

<div className={styles.roundPhotoContainer}>
      <Avatar
        alt="Your Name"
        src="https://s3-alpha-sig.figma.com/img/b482/3df3/84c0d7e5be072bd4eaa9f5f603b44d01?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K7K5m7s6hMyXX2ppITvNjnmIdVnhlXoL1hvDvall0fV8IDFvvwvnZ-NHipHRtfyahuAsnrONSSCKThn7MOQq0y7m0SIcROZdT9zmq6F8RuXVInxG-AQ9dsFux3AI6VTN~6bTmWyfBm0x46SfsMRopps6lLKEHz77k9mwKq2-JCuf4O3G7-5xf~dBMH23rjamLF0pCmE-rRrTRxZ-Gca1s-Uiw20TnxqnbZ9WBhHdx-RN6QoiW4lAqi8PZ6YmfooLto5j9MEpJeqkJklwsg4F8l4slTJ1HHlmb5hGrrNequErNkqhJByC8NInoLWXoNfSc4x-pT7av-NigaKmek70lA__"
        className={styles.roundPhoto}
      />
    </div>
    <FontAwesomeIcon icon={faChevronDown} style={{ color: "#9d9b9b", fontSize: '10px' , cursor: "pointer",   marginLeft: "-10px"
}} onClick={toggleDropdown}  /> 
    

 {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <Typography component="div" className={styles.dropdownItem}>
                  <span className={`${styles.profileLink} profileLink`} onClick={handleProfileOpen}>
                    Profile
                  </span>
                </Typography>
                <Typography component="div" className={styles.dropdownItem}>
                  <span className={`${styles.profileLink} profileLink`}>
                    Logout
                  </span>
                </Typography>
              </div>
            )}
          </div>
<Drawer
  anchor="right"
  open={profileOpen}
  onClose={handleProfileClose}
>
  <ProfileDrawer handleProfileClose={handleProfileClose} /> {/* Pass handleProfileClose */}
</Drawer>

        </div>
          
     
      <div className={`${styles.tableContainer} ${isTableFullscreen ? styles.fullscreenTableContainer : ''}`}>
        <div className={styles.tableHeader}>
          <Typography variant="h6" className={styles.boldText}>Task</Typography>
          <IconButton onClick={toggleExpand} className={styles.bold}> 
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
    <IconButton className={styles.iconButton} onClick={downloadPDF}>
      <GetApp />
    </IconButton>
    <IconButton className={styles.iconButton} onClick={toggleDrawer}>
              <FilterList />
            </IconButton>
    <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: '26%', // Set the drawer width to 26%
          },
        }}
      >
        <Box sx={{ width: '100%', padding: '20px', boxSizing: 'border-box', position: 'relative' }}>
          <IconButton onClick={toggleDrawer} sx={{ position: 'absolute', top: '10px', right: '10px', color: '#000' }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Filters</Typography>

          <FormControl fullWidth sx={{ marginTop: '30px', height: '40px' }}>
            <InputLabel
              id="branch-label"
              sx={{
                marginTop: '-7px',
                height: '40px',
                fontWeight: 'bold',
                fontSize: '0.7rem',
              }}
            >
              Branch
            </InputLabel>
            <Select
              labelId="branch-label"
              value={branch}
              label="Branch"
              onChange={handleBranchChange}
              sx={{ height: '40px', paddingTop: '10px' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: '#e2effc', // Light sky blue background color
                    marginTop: '7px',
                  },
                },
              }}
            >
              <MenuItem
                value="Kolkata"
                sx={{ fontSize: '0.7rem' }}
              >
                Kolkata
              </MenuItem>
              <MenuItem
                value="Bangalore"
                sx={{ fontSize: '0.7rem' }}
              >
                Bangalore
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: '20px', height: '40px' }}>
            <InputLabel
              id="department-label"
              sx={{
                marginTop: '-6px',
                height: '40px',
                fontWeight: 'bold',
                fontSize: '0.7rem', // Reduced font size
              }}
            >
              Department
            </InputLabel>
            <Select
              labelId="department-label"
              value={department}
              label="Department"
              onChange={handleDepartmentChange}
              sx={{ height: '40px', paddingTop: '10px' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: '#e2effc', // Light sky blue background color
                    marginTop: '7px',
                  },
                },
              }}
            >
              <MenuItem
                value="Development"
                sx={{ fontSize: '0.7rem' }} // Adjust font size of MenuItem
              >
                Development
              </MenuItem>
              <MenuItem
                value="Marketing"
                sx={{ fontSize: '0.7rem' }} // Adjust font size of MenuItem
              >
                Marketing
              </MenuItem>
            </Select>
          </FormControl>

          {/* Score Interval */}
          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '8px' }}>Score Interval</Typography>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  padding: '8px',
                  borderRadius: '4px',
                  marginRight: '5px',
                  width: '21%', // Adjusted width
                  transition: 'background-color 0.3s',
                  backgroundColor: selectedInterval === 'Weekly' ? '#e2effc' : '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => handleIntervalSelect('Weekly')}
              >
                <Typography variant="body2" sx={{ fontSize: '0.7rem', textAlign: 'center' }}>Weekly</Typography>
              </Box>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  padding: '8px',
                  marginRight: '5px',
                  borderRadius: '4px',
                  width: '21%', // Adjusted width
                  transition: 'background-color 0.3s',
                  backgroundColor: selectedInterval === 'Monthly' ? '#e2effc' : '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => handleIntervalSelect('Monthly')}
              >
                <Typography variant="body2" sx={{ fontSize: '0.7rem', textAlign: 'center' }}>Monthly</Typography>
              </Box>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  padding: '8px',
                  borderRadius: '4px',
                  width: '21%', // Adjusted width
                  transition: 'background-color 0.3s',
                  backgroundColor: selectedInterval === 'Yearly' ? '#e2effc' : '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => handleIntervalSelect('Yearly')}
              >
                <Typography variant="body2" sx={{ fontSize: '0.7rem', textAlign: 'center' }}>Yearly</Typography>
              </Box>
            </Box>
          </Box>

          {/* Score % Tab */}
          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '8px' }}>Score % Tab</Typography>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <Box
                sx={{
                  position: 'relative',
                  border: '1px solid #ccc',
                  padding: '8px',
                  marginRight: '5px',
                  borderRadius: '4px',
                  width: '22%', // Adjusted width
                  transition: 'background-color 0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#e2effc', // Light sky blue on hover
                  },
                }}
                onClick={() => handleScoreSelect('75-100')}
              >
                <Typography variant="body2" sx={{ fontSize: '0.7rem', textAlign: 'left' }}>75-100</Typography>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '1px',
                    right: '-2px',
                    visibility: selectedScore === '75-100' ? 'visible' : 'hidden',
                  }}
                >
                 <CloseIcon fontSize="small"  sx={{ fontSize: '0.9rem' }}/>

                </IconButton>
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  border: '1px solid #ccc',
                  padding: '8px',
                  marginRight: '5px',
                  borderRadius: '4px',
                  width: '22%', // Adjusted width
                  transition: 'background-color 0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#e2effc', // Light sky blue on hover
                  },
                }}
                onClick={() => handleScoreSelect('74-50')}
              >
                <Typography variant="body2" sx={{ fontSize: '0.7rem', textAlign: 'left'  }}>74-50</Typography>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '1px',
                    right: '-2px',
                    visibility: selectedScore === '74-50' ? 'visible' : 'hidden',
                  }}
                >
                  <CloseIcon fontSize="small"  sx={{ fontSize: '0.9rem' }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  border: '1px solid #ccc',
                  padding: '8px',
                  marginRight: '5px',
                  borderRadius: '4px',
                  width: '22%', // Adjusted width
                  transition: 'background-color 0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#e2effc', // Light sky blue on hover
                  },
                }}
                onClick={() => handleScoreSelect('25-49')}
              >
                <Typography variant="body2" sx={{ fontSize: '0.7rem', textAlign: 'left'  }}>25-49</Typography>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '1px',
                    right: '-2px',
                    visibility: selectedScore === '25-49' ? 'visible' : 'hidden',
                  }}
                >
                  <CloseIcon fontSize="small"  sx={{ fontSize: '0.9rem' }}/>
                </IconButton>
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  border: '1px solid #ccc',
                  padding: '8px',
                  borderRadius: '4px',
                  width: '22%', // Adjusted width
                  transition: 'background-color 0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#e2effc', // Light sky blue on hover
                  },
                }}
                onClick={() => handleScoreSelect('<25')}
              >
                <Typography variant="body2" sx={{ fontSize: '0.7rem', textAlign: 'left'  }}>&lt;25</Typography>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '1px',
                    right: '-2px',
                    visibility: selectedScore === '<25' ? 'visible' : 'hidden',
                  }}
                >
                  <CloseIcon fontSize="small" sx={{ fontSize: '0.9rem' }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>

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
                    Name&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} style={{ color: '#8a8a8a' }} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Task Overdue&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} style={{ color: '#8a8a8a' }} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Weekly Score %&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} style={{ color: '#8a8a8a' }} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Department&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon}  style={{ color: '#8a8a8a' }}/>
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Branch&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} style={{ color: '#8a8a8a' }} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>
                    Not Approved Count&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} className={styles.sortIcon} style={{ color: '#8a8a8a' }} />
                  </TableCell>
                  <TableCell className={`${styles.tableHeaderCell} ${styles.sortableHeader}`}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedEmployees.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell className={styles.checkboxContainer}>
                      <input type="checkbox" className={styles.checkboxInput} checked={isChecked} onChange={handleCheckboxChange} />
                      <div className={styles.roundPhotos}>
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
          <div className={styles.paginationControls}>
  <Typography variant="body2" className={styles.paginationInfo}>
    {startIndex + 1} - {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length}
  </Typography>
  <div className={styles.paginationButtons}>
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

export default AddTask;
