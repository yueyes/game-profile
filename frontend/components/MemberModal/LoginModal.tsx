import { LockOutlined } from '@mui/icons-material';
import {Avatar,Button, Checkbox, FormControlLabel, Grid,Link,Paper, TextField, Typography} from '@mui/material';
import { IModalProps } from './interface';

const avatarStyle = {backgroundColor : "#1bbd7e",margin : "0 auto"}
const btnstyle={margin:'8px 0'}

const LoginModal = ({setCurrentMode}:IModalProps) =>{
    return (
        <>
                        <div style={{textAlign:"center"}}>
                    <Avatar style={avatarStyle}><LockOutlined /></Avatar>
                    <h2 style={{marginTop : "5px"}}>Sign in</h2>
                </div>
                <TextField style={{margin : "10px 0"}} label='Username' placeholder='Enter username' fullWidth required/>
                <TextField style={{margin : "10px 0"}} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Typography style={{margin : "5px 0"}}>
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography  style={{margin : "10px 0"}}> Not have account ?
                     <span onClick={()=>setCurrentMode("register")}>
                        Sign Up 
                </span>
                </Typography></>
    )
}

export default LoginModal;