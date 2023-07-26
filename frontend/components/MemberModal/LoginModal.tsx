import { LockOutlined } from '@mui/icons-material';
import {Avatar,Button, Checkbox, FormControlLabel, Grid,Link,Paper, TextField, Typography} from '@mui/material';
import { IModalProps } from './interface';
import { useState } from 'react';
import { userLogin } from '@frontend/services/user';
import { useAppDispatch } from '@frontend/hooks';
import { setIsLoading } from '@frontend/store/loadingSlice';
import { setIsLoggedIn } from '@frontend/store/authSlice';
import { setUser } from '@frontend/store/userSlice';

const avatarStyle = {backgroundColor : "#1bbd7e",margin : "0 auto"}
const btnstyle={margin:'8px 0'}

const LoginModal = ({setCurrentMode}:IModalProps) =>{
    const dispatch = useAppDispatch();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [isRememberMe,setIsRememberMe] = useState(false);

    const handleLogin = async () => {
        try{
            dispatch(setIsLoading(true));
            // setLoading
            const payload = {
                username,
                password,
                isRememberMe
            }
            const res = await userLogin(payload);
            if(res){
                console.log(res);
                dispatch(setIsLoggedIn(true));
                dispatch(setUser(res.data.data.user));
            }
            // update isLoggedIn
            // 
        }catch(err){
            console.debug(err);
        }finally{
            // setIsNotLoading
            dispatch(setIsLoading(false));
        }
    }

    return (
        <>
                        <div style={{textAlign:"center"}}>
                    <Avatar style={avatarStyle}><LockOutlined /></Avatar>
                    <h2 style={{marginTop : "5px"}}>Sign in</h2>
                </div>
                <TextField style={{margin : "10px 0"}} value={username} onChange={(e)=>setUsername(e.target.value)} label='Username' placeholder='Enter username' fullWidth required/>
                <TextField style={{margin : "10px 0"}} value={password} onChange={(e)=>setPassword(e.target.value)} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                        onChange={(e,checked)=>setIsRememberMe(checked)}
                        checked={isRememberMe}
                    />
                    }
                    label="Remember me"
                 />
                <Typography style={{margin : "5px 0"}}>
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Button onClick={handleLogin} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography  style={{margin : "10px 0"}}> Not have account ?
                     <span onClick={()=>setCurrentMode("register")}>
                        Sign Up 
                </span>
                </Typography></>
    )
}

export default LoginModal;