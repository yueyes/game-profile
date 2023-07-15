import Toolbar from '@mui/material/Toolbar';

import styles from '../../styles/Header.module.scss';
import Link from '@mui/material/Link';
import Profile from '../../assets/profile-logo.png';
import Image from 'next/image';

interface IProps{
    sections: Array<{
        title : string;
        url : string;
    }>;
    title : string;
}

function Header(props:IProps) {
    const { sections, title } = props;
  
    return (
      <>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider',justifyContent: 'space-between', overflowX: 'auto',columnGap : "3rem" }}>
          <div className={styles["logo-image-containter"]}>        <Image src={Profile} className="logo-image"/></div>
          <div className={styles["nav-container"]}>
          {sections.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              sx={{ p: 1, flex: 1}}
              style={{
                margin: "0 1rem"
              }}
            >
              {section.title}
            </Link>
          ))}
          </div>
          {/* <IconButton>
            <SearchIcon />
          </IconButton>
          <Button variant="outlined" size="small">
            Sign up
          </Button> */}
        </Toolbar>
        {/* <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
        >
          {sections.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              sx={{ p: 1, flexShrink: 0 }}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar> */}
      </>
    );
  }


export default Header;