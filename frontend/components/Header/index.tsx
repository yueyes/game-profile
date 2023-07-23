import Toolbar from '@mui/material/Toolbar';

import styles from '../../styles/Header.module.scss';
import Link from '@mui/material/Link';
import Profile from '../../assets/profile-logo.png';
import Image from 'next/image';
import { Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface IProps{
    sections: Array<{
        title : string;
        url : string;
    }>;
    title : string;
    setIsOpenLogin : Dispatch<SetStateAction<boolean>>;
}

function Header(props:IProps) {
    const { sections,setIsOpenLogin } = props;
  
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
          <div style={{
    columnGap: "1rem",
    display:"flex",
    position : "absolute",
    right : 0
}}><span><Button variant="contained" size="small" onClick={()=>setIsOpenLogin(true)}>
Login
</Button></span><span><Button variant="outlined" size="small">
Register
</Button></span></div>
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