import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Image from 'next/image';
import PlatiumIcon from '../../assets/icons/40-platinum.png';
import GoldIcon from '../../assets/icons/40-gold.png';
import SilverIcon from '../../assets/icons/40-silver.png';
import BronzeIcon from '../../assets/icons/40-bronze.png';
import styles from '../../styles/MainFeatureGame.module.scss';

interface MainFeaturedPostProps {
  post: {
    description: JSX.Element;
    image: string;
    imageText: string;
    linkText: string;
    title: string;
  };
  userDetails: {
    username : string;
    avatarUrl : string;
    aboutMe : string;
    languageUsed : string[];
    trophySummary :{
      level : number;
      progress: number;
      earnedTrophies : {
        platinum : number;
        gold : number;
        silver : number;
        bronze : number;
      }
    };
    firstName : string;
    lastName : string;
    profilePictureUrl : string;
    personalDetailSharing : boolean;
    isOnline : boolean;
    lastOnlineDate : string;
  }
}

export default function MainFeaturedGame(props: MainFeaturedPostProps) {
  const { post,userDetails } = props;

  return (
    userDetails && 
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(https://p.qpic.cn/mwegame/0/877bc5f395c0ca66cdd208ae5077f4fe/)`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={12}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
            style={{
              padding : 24
            }}
          >
            <Typography component="div" color="inherit" gutterBottom>
            <div className={styles["profile-headers"]}>
                <div className={styles["user-image"]}>
                    <img src={userDetails.profilePictureUrl} />
                </div>
                <div className={styles.arrow} />
              <div className={styles["user-info"]}>
                    <span className={styles.username}>
                      {userDetails.username}
                      {/* LV.{userDetails.trophySummary.level} */}
                    </span>
                    <div className={styles["user-earned-trophies"]}>
                      <div>
                        <Image width={32} height={32} src={PlatiumIcon} /> <span className="platinum">{userDetails.trophySummary.earnedTrophies.platinum}</span>
                        <Image width={32} height={32} src={GoldIcon} /> <span className="gold">{userDetails.trophySummary.earnedTrophies.gold}</span>
                        <Image width={32} height={32} src={SilverIcon} /> <span className="silver">{userDetails.trophySummary.earnedTrophies.silver}</span>
                        <Image width={32} height={32} src={BronzeIcon} /> <span className="bronze">{userDetails.trophySummary.earnedTrophies.bronze}</span>
                      </div>
                    </div>
                </div>
            </div>
            </Typography>
            <Typography component={'span'} color="inherit" paragraph>
              {post.description}
            </Typography>
            <Link className={styles["game-anchor"]} variant="subtitle1" href="#">
              {post.linkText}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}