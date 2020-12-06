import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Container,
} from '@material-ui/core';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import axios from 'axios';

function Index({ posts, events }) {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <div className="grid-row" style={{marginTop: '28px'}}>
          {events.map((v) => (
            <div
              className="container card-wrapper grid-col grid-col-lg-4 grid-col-md-4 grid-col-sm-6 grid-col-xs-12"
              key={v.name}
              style={{ padding: '10px' }}
            >
              <Card style={{ borderRadius: 0 }}>
                <CardActionArea
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"                      
                  title={v.name}
                  src={v.image ? v.image.data.full_url : ''}
                  style={{
                    maxHeight: '146px',
                    height: '146px',
                    objectPosition: '0 0',
                  }}
                />
                <CardContent style={{ paddingBottom: '40px' }}>                        
                  <div className="title">{v.events_type.name}</div>
                </CardContent>
              </CardActionArea>
              </Card>
            </div>
          ))}
        </div>
        <Copyright />
      </Box>
    </Container>
  );
}

export async function getStaticProps(){
  const data = await axios.get('https://bigbox.co.id/blog/wp-json/wl/v1/posts');
  const dataEvents = await axios.get('https://bigbox.co.id/directus/public/Directus/items/events?fields=*.*&sort=-date');

  return {
    props: {
      posts: data.data,
      events: dataEvents.data.data
    }
  }
}

export default Index;