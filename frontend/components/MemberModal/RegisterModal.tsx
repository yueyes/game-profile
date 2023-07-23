import { LockOutlined } from '@mui/icons-material';
import {Avatar,Button, Checkbox, FormControlLabel, Grid,Link,Paper, TextField, Typography} from '@mui/material';
import { IModalProps } from './interface';

const avatarStyle = {backgroundColor : "#1bbd7e",margin : "0 auto"}
const btnstyle={margin:'8px 0'}

const RegisterModal = ({setCurrentMode}:IModalProps) =>{
    return (
        <>
                        <div style={{textAlign:"center"}}>
                    <Avatar style={avatarStyle}><LockOutlined /></Avatar>
                    <h2 style={{marginTop : "5px"}}>Sign Up</h2>
                </div>
                <TextField style={{margin : "10px 0"}} label='Username' placeholder='Enter username' fullWidth required/>
                <TextField style={{margin : "10px 0"}} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <TextField style={{margin : "10px 0"}} label='Confirm Password' placeholder='Enter Confirm Password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Receive News"
                 />
                {/* <FormControlLabel
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
                </Typography> */}
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign Up</Button>
                <Typography  style={{margin : "10px 0"}}> Do you have an account ?
                <span onClick={()=>setCurrentMode("login")}>
                        Sign In
                </span>
                </Typography></>
    )
}

export default RegisterModal;