import { useState } from 'react';
import Link from 'next/link';
import { IconButton } from '@material-ui/core';
import { FilterList, Close } from '@material-ui/icons';
import Panel from './Panel'; // Create Panel component separately

const Filter = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="filter-container">
      {/* FilterList icon to open panel */}
      <IconButton className={styles.iconButton} onClick={togglePanel}>
        <FilterList />
      </IconButton>

      {/* Panel that opens from the left */}
      {isPanelOpen && (
        <div className="panel-container">
          <IconButton className="close-button" onClick={togglePanel}>
            <Close />
          </IconButton>
          <Panel />
        </div>
      )}
    </div>
  );
};

export default Filter;
