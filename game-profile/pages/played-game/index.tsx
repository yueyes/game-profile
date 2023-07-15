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
const PlayedGame: NextPage = () => {
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
            <div className={styles["game-container"]}>
            {
                data.length > 0 && data.map((
                    res
                )=> (
                    <div className="recent-play">
                            <Card sx={{ maxWidth: 345,maxHeight : 600 }}>
                                <CardMedia
                                    className={styles.media}
                                    sx={{ height: 400 }}
                                    image={res.image}
                                    title={res.gameTitle}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                    {res.gameTitle}
                                    </Typography>
                                    <Typography gutterBottom component="div">
                                    {res.platform}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    platium :　{res.earnedTrophies.platinum} gold : {res.earnedTrophies.gold} silver : {res.earnedTrophies.silver} bronze : {res.earnedTrophies.bronze}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                                </Card>
                    </div>
                ))
               
            }
            </div>
        </div>
    )
}

export default PlayedGame;