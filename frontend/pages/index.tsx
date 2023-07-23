import type { NextPage } from 'next'
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MainFeaturedGame from '../components/MainFeatureGame'
import Footer from '../components/Footer'
import FeaturedPost from '../components/FeaturedPost'
import { useEffect, useMemo, useState } from 'react'
import { getTrophies,getUser as getUserData } from '../services/profile'
import PlatiumIcon from '../assets/icons/40-platinum.png';
import GoldIcon from '../assets/icons/40-gold.png';
import SilverIcon from '../assets/icons/40-silver.png';
import BronzeIcon from '../assets/icons/40-bronze.png';
import { IUserData } from './api/getUserData';
import { Modal } from '@mui/material';
import MemberModal from '@frontend/components/MemberModal';

const sections = [
  { title: 'Dashboard', url: '#' },
  { title: 'Profile', url: '#' },
  { title: 'Trophies', url: '#' },
];

const mainFeaturedPost:any = {
  title: 'Title of a longer featured blog post',
  description:
    <div>{"Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents."}</div>,
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: '更多資訊',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

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

const Home: NextPage = () => {
  const [data,setData] = useState<IData[]>([]);
  const [user,setUser] = useState<IUserData | null>(null);
  const [isOpenLogin,setIsOpenLogin] = useState(false);

  const getData = async()=>{
      const res = await getTrophies();
      const user = await getUserData();
      setData(res.data);
      setUser(user.data);
  }

  useEffect(()=>{
      getData();
  },[])

  const posts = useMemo(()=>{
    return data.slice(0,5).map((dat)=>({
      title: dat.gameTitle,
      date: dat.lastUpdated,
      description: <div><div>{dat.gameTitle}</div><div>
        <Image width={32} height={32} src={PlatiumIcon} /> {dat.earnedTrophies.platinum} <Image width={32} height={32} src={GoldIcon} /> {dat.earnedTrophies.gold} <Image width={32} height={32} src={SilverIcon} /> {dat.earnedTrophies.silver} <Image width={32} height={32} src={BronzeIcon} /> {dat.earnedTrophies.bronze}</div><div>進度 : {dat.progress}%</div></div>,
      image: dat.image,
      imageLabel: dat.gameTitle,
      platform : dat.platform
    }))
  },[data])

  return (
    <div className={styles.container}>
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} setIsOpenLogin={setIsOpenLogin} />
        <Modal open={isOpenLogin} onClose={()=>{setIsOpenLogin(false)}}>
          <MemberModal />
        </Modal>
        <main>
          <MainFeaturedGame   userDetails={user!} post={ data.length > 0?{
  title: '最近遊玩的遊戲',
  description: <div><div style={{fontSize : 25}}>正在遊玩 : {data[0].gameTitle} <span> 進度 : {data[0].progress}%</span></div><div><Image width={32} height={32} src={PlatiumIcon} /> {data[0].earnedTrophies.platinum} <Image width={32} height={32} src={GoldIcon} /> {data[0].earnedTrophies.gold} <Image width={32} height={32} src={SilverIcon} /> {data[0].earnedTrophies.silver} <Image width={32} height={32} src={BronzeIcon} /> {data[0].earnedTrophies.bronze}</div></div>,
  image: data.length > 0 ? data[0].image : 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: '點擊追蹤遊戲獎杯進度'
} : mainFeaturedPost} />
                                    <Typography gutterBottom variant="h4" component="div">
                                    最近遊玩的遊戲
                                    </Typography>
          <Grid container spacing={4}>
            {posts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          {/* <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid> */}
        </main>
      </Container>
      <Footer
        title="Game Profile"
        description="A side project to display game profile from different platform"
      />
    </div>
  )
}

export default Home
