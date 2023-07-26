import { CloseOutlined, LockOutlined } from '@mui/icons-material';
import {Avatar,Button, Checkbox, FormControlLabel, Grid,IconButton,Link,Paper, Snackbar, TextField, Typography} from '@mui/material';
import { IModalProps } from './interface';
import { useState } from 'react';
import { userRegister } from '@frontend/services/user';
import { useAppDispatch } from '@frontend/hooks';
import { useSelector } from 'react-redux';
import { getIsLoading, setIsLoading } from '@frontend/store/loadingSlice';
import { setIsLoggedIn } from '@frontend/store/authSlice';

const avatarStyle = {backgroundColor : "#1bbd7e",margin : "0 auto"}
const btnstyle={margin:'8px 0'}

const RegisterModal = ({setCurrentMode}:IModalProps) =>{

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [rePassword,setRePassword] = useState("");
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [isReceiveNews,setIsReceiveNews] = useState(false);

    const [registerErrMsg ,setRegisterErrMsg] = useState("")

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getIsLoading);

    const handleRegister = async () => {
        if(password !== rePassword){
            setRegisterErrMsg("Password is not same. please check.");
            return;
        }
        try{
            dispatch(setIsLoading(true));
            const payload = {
                email,
                username,
                firstname,
                lastname,
                password,
                rePassword,
                isReceiveNews
            }
            console.log(payload);
            const res = await userRegister(payload);
            if(res){
                dispatch(setIsLoggedIn(true));
            }
            console.log(res);
        }catch(err){
            console.debug(err);
        }finally{
            // TODO: set is not loading
            dispatch(setIsLoading(false));
        }
    }

    const handleClose = () => {
        setRegisterErrMsg("");
    }



    return (
        <>
                        <div style={{textAlign:"center"}}>
                    <Avatar style={avatarStyle}><LockOutlined /></Avatar>
                    <h2 style={{marginTop : "5px"}}>Sign Up</h2>
                </div>
                <TextField style={{margin : "10px 0"}} value={email} onChange={(e)=>setEmail(e.target.value)} label='Email' placeholder='Enter email' fullWidth required/>
                <TextField style={{margin : "10px 0"}} value={username} onChange={(e)=>setUsername(e.target.value)} label='Username' placeholder='Enter username' fullWidth required/>
                <TextField style={{margin : "10px 5px 0 0",width:"calc(50% - 5px)"}} value={firstname} onChange={(e)=>setFirstname(e.target.value)} label='First Name' placeholder='Enter First Name' required/>
                <TextField style={{margin : "10px 0 0 5px", width:"calc(50% - 5px)"}} value={lastname} onChange={(e)=>setLastname(e.target.value)} label='Last Name' placeholder='Enter Last Name' required/>
                <TextField style={{margin : "10px 0"}} value={password} onChange={(e)=>setPassword(e.target.value)} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <TextField style={{margin : "10px 0"}} value={rePassword} onChange={(e)=>setRePassword(e.target.value)} label='Confirm Password' placeholder='Enter Confirm Password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                        onChange={(e,checked)=>setIsReceiveNews(checked)}
                        checked={isReceiveNews}
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
                <Button onClick={handleRegister} color='primary' variant="contained" style={btnstyle} fullWidth>Sign Up</Button>
                <Typography  style={{margin : "10px 0"}}> Do you have an account ?
                <span onClick={()=>setCurrentMode("login")}>
                        Sign In
                </span>
                </Typography>
                <Snackbar
                open={registerErrMsg !== ""}
                autoHideDuration={4000}
                onClose={handleClose}
                message={registerErrMsg}
                action={<>
                <IconButton size="small" aria-label='close' color="inherit" onClick={handleClose}><CloseOutlined fontSize='small' /></IconButton>
                </>}
                />
                </>
    )
}

export default RegisterModal;