import React from 'react';
import { CardMedia, Box, Divider, Grid, Paper, Typography, Button } from '@mui/material';
import ClockIcon from '@mui/icons-material/AccessTime';

import useStyles from './style';

const Post = ({ post }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper variant="outlined" className={classes.postItem}>
                {post.image && <CardMedia 
                    component='img' 
                    image={post.image}
                    alt='image' 
                    height='150' 
                />}
                <Box className={classes.itemContent}>
                    <Typography variant='h6' component='h2' color='black'>{ post.title }</Typography>
                    <Divider sx={{my: 1}} />
                    <Typography variant='body2' component='p' color='darkgray'>{ post.content }</Typography>
                    <Button variant='outlined' color='primary' size='small' sx={{mt: 2, textTransform: 'none'}}>Read more...</Button>
                </Box>
                <Divider />
                <Box className={classes.metaInfo}>
                    <Typography variant='body2' component='p'>{ post.author }</Typography>
                    <Box className={classes.metaInfo__publishTime}>
                        <ClockIcon sx={{fontSize: '15px', mr: 1}} />
                        <Typography variant='body2' component='p'>{ post.date }</Typography>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )};

export default Post;