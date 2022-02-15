import React, {useEffect} from 'react';
import { Typography, Paper, Divider, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import DisplayPost from './Display/DisplayPost';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

import { getPosts } from '../../../actions/posts';

const useStyles = makeStyles(() => ({
    adminLink: {
      display: 'inline-block',
      textDecoration: 'none',
      margin: '30px 10px'
    }
}));

const Posts = () => {
    const posts = useSelector( state => state.posts );
    const classes = useStyles();
    const dispach = useDispatch();

    useEffect(() => {
        dispach(getPosts());
    }, [dispach]);


    if(!posts.length) return 'No posts, Plaese create some.';

    return (
        <Paper variant="outlined" sx={{ padding: '10px'}}>
            <Box>
                <Link to='/admin/' className={classes.adminLink}>
                    <Button variant="contained">⬅ Back</Button>
                </Link>
                <Link to='/admin/add/post' className={classes.adminLink}>
                    <Button variant="contained">New Post</Button>
                </Link>
            </Box>
            <Typography variant="h6" component="h3">All Posts</Typography>
            <Typography variant="subtitle2" component="p" sx={{mt: 2}}>Total Posts: {posts?.length}</Typography>
            <Divider sx={{ margin: '10px 0' }} />
            <Box>
                {
                    posts.map((post, i) => (
                        <DisplayPost key={post._id} post={post} />
                    ))
                }
            </Box>
        </Paper>
    )};

export default Posts;