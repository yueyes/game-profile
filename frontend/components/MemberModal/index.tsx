import { LockOutlined } from '@mui/icons-material';
import {Avatar, Box, Button, Checkbox, FormControlLabel, Grid,Link,Paper, TextField, Typography} from '@mui/material';
import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const paperStyle ={ padding : 20,height:"47vh",width : 500,margin:"20px auto",    position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',}
  const avatarStyle = {backgroundColor : "#1bbd7e",margin : "0 auto"}
  const btnstyle={margin:'8px 0'}

const MemberModal = () => {
    const [currentMode,setCurrentMode] = useState("login");
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                {
                    currentMode === "login" && <LoginModal setCurrentMode={setCurrentMode} />
                }
                {
                    currentMode === "register" && <RegisterModal setCurrentMode={setCurrentMode} />
                }
            </Paper>
        </Grid>
    )
}

export default MemberModal