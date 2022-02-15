import { Grid, Paper, Typography, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from './Post/Post';
import { getPosts } from '../../actions/posts';

const Posts = () => {
    const posts = useSelector( state => state.posts );
    const dispach = useDispatch();

    useEffect(() => {
        dispach(getPosts());
    }, [dispach]);

    return ( 
        <Paper variant="outlined" sx={{padding: '20px'}}>
            <Typography variant='h4' component='h2'>All Posts</Typography>
            <Grid container spacing={3} sx={{marginTop: '0 !important'}}>
                { posts.map(post => <Post key={post._id} post={post} />) }
            </Grid>
            { posts.length === 0 ? <CircularProgress sx={{my: 3, ml: '40vw'}} /> : null }
        </Paper>
    )};

export default Posts;
