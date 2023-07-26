import { Grid,Paper} from '@mui/material';
import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const paperStyle ={ padding : 20,height:"80vh",width : 500,margin:"20px auto",    position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'}

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