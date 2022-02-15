import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import _ from 'lodash';

import { deletePosts } from '../../../../actions/posts';
import useStyles from './styles';

const DisplayPost = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Grid container spacing={1} className={classes.gridPostItem}>
      <Grid item xs={12} sm={12}>
        <b>Title</b>: {post.title}
      </Grid>
      <Grid item xs={6} sm={6}>
        <b>Author</b>: {post.author}
      </Grid>
      <Grid item xs={6} sm={6}>
        <b>Published on</b>: {post.date}
      </Grid>
      <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Link to={`/admin/edit/post/${post._id}`}>
          <IconButton>
            <EditOutlinedIcon color='primary' />
          </IconButton>
        </Link>
        <IconButton onClick={() => dispatch(deletePosts(post._id))}>
          { post.deleting ?  '...' :<DeleteIcon color='primary' /> }
        </IconButton>
      </Grid>
    </Grid>
  )};

export default DisplayPost;
