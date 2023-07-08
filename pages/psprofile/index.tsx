import { NextPage } from "next";
import { useEffect, useState } from "react";
import { selectAuthState, setAuthState } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTrophies } from "../../services/profile";
import MenuBar from "../../components/MenuBar";
import { Avatar } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "../../styles/psprofile.module.scss";

interface IData{
    "trophies": {
        "bronze": number;
        "silver": number;
        "gold": number;
        "platinum": number;
    },
    "progress": number;
    "earnedTrophies": {
        "bronze": number;
        "silver": number;
        "gold": number;
        "platinum": number;
    },
    "gameTitle": string;
    "platform": "PS5" | "PS4" | "NS" | "PC" | "XBOX" | "STEAM";
    "image": string;
    "lastUpdated": string;
}
const PsProfile: NextPage = () => {
//    const authState = useSelector(selectAuthState);
//    const dispatch = useDispatch();
    const [data,setData] = useState<IData[]>([]);

    const getData = async()=>{
        const res = await getTrophies();
        setData(res.data);
    }

    useEffect(()=>{
        getData();
    },[])

    return(
        <div className="profile-container">
            <MenuBar />
            <div className="profiles">
                <div className={styles["icon-container"]}><Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /><div>Fergus Leung</div></div>
            </div>
            {
                data.length > 0 && 
                (
                    <div className="recent-play">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 400 }}
                                    image={data[0].image}
                                    title={data[0].gameTitle}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {data[0].gameTitle}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    platium :　{data[0].earnedTrophies.platinum} gold : {data[0].earnedTrophies.gold} silver : {data[0].earnedTrophies.silver} bronze : {data[0].earnedTrophies.bronze}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                                </Card>
                    </div>
                )
            }
        </div>
    )
}

export default PsProfile;