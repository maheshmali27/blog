import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Stack, MenuItem, TextField, CardMedia, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import FileBase from 'react-file-base64';

import { updatePosts } from '../../../../actions/posts';
import { getUsers } from '../../../../actions/users';

const useStyles = makeStyles(() => ({
  adminLink: {
    display: 'inline-block',
    textDecoration: 'none',
    margin: '30px 0'
  },
  imageSelect: {
    width: '100% !important'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdatePost = () => {
  const { postID } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector( state => state.users.allUsers );
  const curPost = useSelector( state => postID ? state.posts.find(post => post._id === postID) : null );
  const [ user, setUser ] = useState('');
  const [ post, setPost ] = useState({title: '', content: '', author: '', image: ''});
  const [ loader, setLoader ] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if(curPost) setPost(curPost);
  }, [postID, curPost]);

  const handleChange= (e) => {
    setUser(e.target.value);
    return setPost({...post, author: e.target.value});
  }

  const handlePopupClose = () => {
    setLoader(false);
    setPopup(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoader(true);

    dispatch(updatePosts(postID, post)).then(() => {
      setPopup(true);
    });
  }

  return (
    <Box>
      <Typography variant="h4" component='h2'>Update Post</Typography>
      <Link to='/admin/posts' className={classes.adminLink}>
          <Button variant="contained">⬅ Back</Button>
      </Link>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={9}>
            <Stack spacing={2}>
              <TextField label="Title" name="title" value={post.title} variant="outlined" fullWidth required onChange={(e) => setPost({ ...post, title: e.target.value })} />
              <TextField label="Content" multiline value={post.content} rows={10} name="content" variant="outlined" fullWidth required onChange={(e) => setPost({ ...post, content: e.target.value })} />
            </Stack>
            <Box >
              { loader ?
                <LoadingButton loading variant="contained" color='primary' sx={{mt:2}}>Updating...</LoadingButton> : 
                <Button variant='contained' type='submit' sx={{mt: 2, textTransform: 'capitalize'}} >Update Post</Button>
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField select label="Select Author" value={user || post.author} fullWidth onChange={handleChange}>
              {
                users?.map((user) => (
                  <MenuItem key={user.id} value={user.firstName}>
                    {user.firstName}
                  </MenuItem>
                ))
              }
              { !users && <MenuItem value={user.firstName}>{post.author}</MenuItem> }
            </TextField>
            <Box sx={{mt: 2}}>
              <Typography variant='subtitle2' variant='span' sx={{mb: 1, display: 'block'}}>Post Image</Typography>
              <FileBase
                type='file'
                multiple={false}
                onDone={({base64}) => setPost({...post, image: base64})}
                className={classes.imageSelect}
              />
              { post.image ? <CardMedia image={post.image} sx={{height: '100px', mt: 2}} alt='post-image' /> : '' }
            </Box>
          </Grid>
        </Grid>
      </form>
      <Dialog open={popup} TransitionComponent={Transition} keepMounted onClose={handlePopupClose}>
        <DialogTitle>{"Post updated successfuly."}</DialogTitle>
        <DialogActions>
          <Button variant='outlined' onClick={handlePopupClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )};

export default UpdatePost;
