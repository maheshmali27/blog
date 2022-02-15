import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Typography, Stack, Button, Box, Grid, MenuItem, CardMedia, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {v4 as uuid} from 'uuid';
import LoadingButton from '@mui/lab/LoadingButton';
import FileBase from 'react-file-base64';

import { addPosts } from '../../../../actions/posts';
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

const curDate = () => {
  const x = new Date();
  const dd = x.getDate();
  const mm = x.getMonth();
  const yyyy = x.getFullYear();
  return `${dd}-${mm + 1}-${yyyy}`;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddPost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const users = useSelector( state => state.users.allUsers );

  const [post, setPost] = useState({_id: uuid(), title: '', author: '', content: '', image: '', date: curDate()});
  const [user, setUser] = useState('');
  const [loader, setLoader] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
    
    dispatch(addPosts(post)).then(() => {

      setPopup(true);
      setPost({_id: uuid(), title: '', author: '', content: ''});
    });
  }
  return (
    <Box>
      <Typography variant="h4" component='h2'>Add New Post</Typography>
      <Link to='/admin/posts' className={classes.adminLink}>
          <Button variant="contained">⬅ Back</Button>
      </Link>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={9}>
            <Stack spacing={2}>
              <TextField label="Title" name="title" variant="outlined" fullWidth required onChange={(e) => setPost({ ...post, title: e.target.value })} />
              <TextField label="Content" multiline rows={10} name="content" variant="outlined" fullWidth required onChange={(e) => setPost({ ...post, content: e.target.value })} />
            </Stack>
            <Box >
              { loader ?
                <LoadingButton loading variant="contained" color='primary' sx={{mt:2}}>Creating...</LoadingButton> : 
                <Button variant='contained' type='submit' sx={{mt: 2, textTransform: 'capitalize'}} >Create Post</Button>
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField select required label="Select Author" value={user} fullWidth onChange={handleChange}>
              {
                users?.map((user) => (
                  <MenuItem key={user.id} value={user.firstName}>
                    {user.firstName}
                  </MenuItem>
                ))
              }
              { !users && <MenuItem>Demo</MenuItem> }
            </TextField>
            <Box sx={{mt: 2}}>
              <span>Set Post Image</span>
              <FileBase
                type='file'
                multiple={false}
                onDone={({base64}) => setPost({...post, image: base64})}
                className={classes.imageSelect}
              />
              { post.image ? <CardMedia sx={{height: '100px', mt: 2}} image={post.image} alt='post-image' /> : '' }
            </Box>
          </Grid>
        </Grid>
      </form>
      <Dialog open={popup} TransitionComponent={Transition} keepMounted onClose={handlePopupClose}>
        <DialogTitle>{"Post added successfuly."}</DialogTitle>
        <DialogActions>
          <Button variant='outlined' onClick={handlePopupClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
)};

export default AddPost;
