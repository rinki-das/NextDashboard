// CalendarCard.jsx

import React, { useState } from 'react';
import styles from '../components/CalendarCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faClock } from '@fortawesome/free-solid-svg-icons'; // FontAwesome icons
import { getDaysInMonth, isToday } from 'date-fns'; // Example: date-fns for date manipulation
import TimePicker from 'react-time-picker'; // Example: react-time-picker for time selection

const CalendarCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [showTimePicker, setShowTimePicker] = useState(false); // State to manage time picker visibility
  const [dueTime, setDueTime] = useState(''); // State for due time

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Handle date change logic here
  };

  // Function to generate an array of days in the selected month
  const generateDaysArray = (month, year) => {
    const daysInMonth = getDaysInMonth(new Date(year, month));
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const daysArray = [];

    // Add empty placeholders for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }

    // Generate days array
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    return daysArray;
  };

  // Example function to get month in MMM format
  const getMonthString = (date) => {
    return date.toLocaleString('en-US', { month: 'short' });
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Toggle time picker visibility
  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  // Handle month/year selection
  const handleSelectMonthYear = (month, year) => {
    setSelectedDate(new Date(year, month));
    setShowDropdown(false);
    // Additional logic for handling date change based on selected month and year
  };

  // Function to handle due time selection
  const handleDueTimeChange = (time) => {
    setDueTime(time);
    setShowTimePicker(false);
    // Additional logic for handling due time selection
  };

  // Function to generate months options
  const generateMonthOptions = () => {
    return Array.from({ length: 12 }, (_, i) => (
      <div key={i} onClick={() => handleSelectMonthYear(i, selectedDate.getFullYear())}>
        {getMonthString(new Date(2000, i))}
      </div>
    ));
  };

  // Function to generate year options
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      years.push(
        <div key={year} onClick={() => handleSelectMonthYear(selectedDate.getMonth(), year)}>
          {year}
        </div>
      );
    }
    return years;
  };

  return (
    <div className={styles.calendarCard}>
      <div className={styles.header}>
        <span>
          <strong>{getMonthString(selectedDate)}, {selectedDate.getFullYear()}</strong> <FontAwesomeIcon icon={faAngleDown} onClick={toggleDropdown} />
        </span>
        <div className={styles.dueTimeContainer} onClick={toggleTimePicker}>
          <span>Due Time :</span>
          <FontAwesomeIcon icon={faClock} />
          {dueTime && <span>{dueTime}</span>}
        </div>
        {showDropdown && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownColumn}>
              <h3>Select Month</h3>
              <div className={styles.scrollContainer}>
                {generateMonthOptions()}
              </div>
            </div>
            <div className={styles.dropdownColumn}>
              <h3>Select Year</h3>
              <div className={styles.scrollContainer}>
                {generateYearOptions()}
              </div>
            </div>
          </div>
        )}
        {showTimePicker && (
          <div className={styles.timePickerContainer}>
            <TimePicker
              onChange={handleDueTimeChange}
              value={dueTime}
              format="HH:mm"
              disableClock={false}
              clearIcon={null}
              className="react-time-picker__wrapper"
              clockClassName="react-time-picker__clock"
              calendarIcon={null}
              clockIcon={null}
              disableCalendar
              amPmAriaLabel="Select AM/PM"
              hourPlaceholder="HH"
              minutePlaceholder="MM"
            />
            <button className="react-time-picker__button">Save</button>
          </div>
        )}
      </div>
      <div className={styles.weekdaysContainer}>
        <div className={styles.weekdaysRow}>
          <div className={styles.weekday}>Su</div>
          <div className={styles.weekday}>Mo</div>
          <div className={styles.weekday}>Tu</div>
          <div className={styles.weekday}>We</div>
          <div className={styles.weekday}>Th</div>
          <div className={styles.weekday}>Fr</div>
          <div className={styles.weekday}>Sa</div>
        </div>
      </div>
      <div className={styles.calendarGrid}>
        {generateDaysArray(selectedDate.getMonth(), selectedDate.getFullYear()).map((day, index) => (
          <div key={index} className={`${styles.calendarDay} ${day === null ? styles.placeholder : ''} ${isToday(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)) ? styles.currentDay : ''}`}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarCard;
