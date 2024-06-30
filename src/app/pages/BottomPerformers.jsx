// TopPerformanceCard.jsx

import React from 'react';
import { Typography, Divider, Avatar } from '@mui/material';
import styles from './TopPerformanceCard.module.css';

// Sample employee data
const employees = [
  { name: 'Daniel Wilson', weeklyScore: 95, team: 'Marketing', photo: 'https://s3-alpha-sig.figma.com/img/2ef2/f860/e62ddbe0b472613ba7ac12672408ae2f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OdsQZa7DOSHOQ2bHPrynAyo6TomtYf4ottlOEcusrSh8ddBEP60zqB6VBfeapmbyK-7IOqb0jTMEi6NkdKByb2NrgceKhz1AwFaLyTu3yiHQDvFDsXalEwV3msWu5sWL68rw09mKIAcZzfFDdG4~XvvDxWrLmL6FgNCUT-8WV~lgFKRvrLfyWfoDlmY3hcHrlIXkNqxLXjY5QtJ~HXTTtm6CaVEldBAxRoDJZOIO~BhKgN9R3oawj43PfyXYYZZlBH7TAe5UI75bmxkotnr5sEXtek57k-MV0XiX7Ps5XdqdvEvaIRy-TU-ycHI0T~qpLheHMoPFaACFTTrgwBUKow__' },
  { name: 'Ashley Taylor', weeklyScore: 93, team: 'Sales', photo: 'https://s3-alpha-sig.figma.com/img/ce9a/931e/1e378eed52c92db6cf55cf05121ebc41?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GP7jwgjG4qL3QFTsUxaHvQjJvgQzxuJRufX3YAu3CDeamU0eLoY31dSj3cbsaSo97IWpglaU3VK-8ah4CD~KXXefnZE4cwqxOc-iN1Jo~EDlSM~CMKXKTeZpamX8PgBXepfo5KKlHfxrPe5oyQinmLwFtoYnR6o4jCcwp6K5ZR3jhVtkCKZnTxgEdTDzH126jpFwhhNSlFZyBG3Y8oITguy4fK4KFXtJSbDBYp-KIjFl0xV09b-4yxvznFSTCV8OzklkW19~aC-IcmoPpMp28yQphGk~BpnZQU5xkHJpzspc7Zy3VSO3jQpHl0LYVNBeMruI8XjhS8mMvQOxmPAddg__' },
  { name: 'Jane Smith', weeklyScore: 92, team: 'HR', photo: 'https://s3-alpha-sig.figma.com/img/2a17/453e/b95866da3ff61d57b161440437ba423a?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZzW0DDvjOz1S~Etpz~D6tH7G0L6aCW8FtyoSeWcAbXWObY~ElkcnDdZ0w-NgUAd9iMjgHrJBEz59HFjM5Ba2yP7R0Dk7i3IV4ozZNeXUml5OjXHiTVGPoyPZ8AWtX0EHZWvNwz6-as7aBxvfbUTs8E2qGBb2GzdlcDPbK1gDcl6Xf8kUtIgh3ObN-IjfZ6wt9rF3keszCSBOtJNYBHYyv7Q7THLXgwR1~WyOaY5XPjZUgE02i1SnWpTBu-XNcePZHe2gLnWuzxi81YUDif8YjYx9jYLLvPamAV4EC75UD2Mq2XvN2XTPfXAk-wgV-KLDULaEHL1MrmfnDjMmjWQfaw__' },
  { name: 'Susan Garcia', weeklyScore: 92, team: 'Engineering', photo: 'https://s3-alpha-sig.figma.com/img/9216/0e71/93f48f8a0d2f922ccd9e4237e1ddbcdb?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wu5-Vgk8vV9SsXuGHGdrnyh0SQ9QVaTEldjlZmDYZwELhAbcXxq7~hodpUtSPOqNIDTRKv7bQzl84DcpMREhgigDuZrGZQy92wR041iE9jE7fu6n21oe2s8fTNxH4t1Dk0lTfaA8IHCWtasjBEhh0zQMCf5ed7K4WiRHlkZc~tvd3P5jkMgHt2lz4kCuYbiLjExbQE03k-r0ydyd2rDdujd6dU9zhuC4K-gxWWZ3Vkowgg9HiKtAuWEC-5ypzTvXwUH0Lj6rWF1Lt8Bxvr3~nVIymAdihtreAZbF60vmTUP5eH-B~9Yq3rXzHu9rChNdvwEnbCmmJnIC2ZXw7rW9sg__' },
  { name: 'Christopher Jackson', weeklyScore: 90, team: 'Design', photo: 'https://s3-alpha-sig.figma.com/img/8f5f/8ebd/664fd0ff475cde63c0abec3829a13f2a?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RWL71NBnTudEHEmnzZfVZ5ch0ZV2pt4q86v7vVAA11zDXoe1Jo1iO3DO~8ktuLpGyQZXEGGfnlsZosIP9giY1u5O60W3SA7J5tuEu62oX1IFihL37bE40-4wtI8iIuLMknZO9~QBcHOYvXF0thqcnVzEMi41h-dXR98L4k2HL5HA3Cb~~LXeBrrBy60pVZ5Wb9VTY4wAg23ygfA4AVC0v7uAgfeHENoQ72ZJFSiUow8fAAEY6TY5DjMKn9WwgmyZkBYhN9vf8JKtBbN-H5mMbJlhWfXbLwc-hukR1U6azsoD95AoQRpNY2ScMHrpOd4JJBBPKRTdlE5grXaXrxctwA__' },
];

const BottomPerformanceCard = ({ isSidebarOpen }) => {
  return (
    <div className={`${styles.roundedLG} ${styles.shadowMD} ${styles.padding4} ${isSidebarOpen ? '' : styles.shrinkContent}`}>
      <div className={`${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter} ${styles.marginBottom4}`}>
        <Typography variant="h6" className={`${styles.textXL} ${styles.textGray800}`}>Bottom Performers</Typography>
        <div className={`${styles.flex} ${styles.itemsCenter} ${styles.spaceX2} ${styles.bgGray200} ${styles.padding2} ${styles.roundedLG}`}>
          <span className={`${styles.textGray500} ${styles.textSM}`}>This week Trend</span>
        </div>
      </div>
      <Divider className={`${styles.my4} ${styles.fullWidthDivider}`} />
      {employees.map((employee, index) => (
        <div key={index} className={`${styles.flex} ${styles.itemsCenter} ${styles.mb2}`}>
          <Avatar alt={employee.name} src={employee.photo} className={`${styles.w14} ${styles.h14} ${styles.mr4}`} />
          <div className={`${styles.flex} ${styles.itemsCenter} ${styles.justifyBetween} ${styles.widthFull}`}>
            <div>
              <Typography variant="subtitle1" className={styles.fontSemibold}>{employee.name}</Typography>
              <Typography variant="body2" className={styles.textGray800}>{employee.team}</Typography>
            </div>
            <Typography variant="body2" className={`${styles.textGreen600}`}>{employee.weeklyScore}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BottomPerformanceCard;
