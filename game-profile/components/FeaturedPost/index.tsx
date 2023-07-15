import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import moment from 'moment';

interface FeaturedPostProps {
  post: {
    date: string;
    description: JSX.Element;
    image: string;
    imageLabel: string;
    title: string;
    platform : string;
  };
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title} ({post.platform})
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              上次遊玩時間 : {moment(post.date).utc().format("YYYY-MM-DD HH:mm:ss")}
            </Typography>
            <Typography component={'span'} variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              更多關於此遊戲的資訊...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            style={{objectFit:"contain"}}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}