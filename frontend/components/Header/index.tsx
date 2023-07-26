import Toolbar from '@mui/material/Toolbar';

import styles from '../../styles/Header.module.scss';
import Link from '@mui/material/Link';
import Profile from '../../assets/profile-logo.png';
import Image from 'next/image';
import { Avatar, Button, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '@frontend/store/authSlice';
import { deepOrange } from '@mui/material/colors';
import { getUserInfo } from '@frontend/store/userSlice';

interface IProps{
    sections: Array<{
        title : string;
        url : string;
    }>;
    title : string;
    setIsOpenLogin : Dispatch<SetStateAction<boolean>>;
}

const settings = ['Profile','Account','Dashboard','Logout']

function Header(props:IProps) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getUserInfo);
    const { sections,setIsOpenLogin } = props;
    const [anchorElUser,setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event:React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    }
    const handleCloseUserMenu = () => setAnchorElUser(null);
    console.log(user);
  
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
}}>
  {
    !isLoggedIn && <>
        <span><Button variant="contained" size="small" onClick={()=>setIsOpenLogin(true)}>
Login
</Button></span><span><Button variant="outlined" size="small">
Register
</Button></span>
    </>
  }
  { isLoggedIn && <>

    <Tooltip title="settings">
      <Avatar sx={{bgColor : deepOrange[500]}} onClick={handleOpenUserMenu}>{user.displayName[0].toUpperCase()}</Avatar>
    </Tooltip>
    <Menu
    sx ={{mt : '45px'}}
    id="menu-appbar"
    anchorEl={anchorElUser}
    anchorOrigin={{
      vertical : 'top',
      horizontal: 'right'
    }}
    keepMounted
    transformOrigin={{
      vertical : 'top',
      horizontal: 'right'
    }}
    open={!!anchorElUser}
    onClose={handleCloseUserMenu}
    >
      {
        settings.map((setting)=>(
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))
      }
    </Menu>

  </>}
</div>
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