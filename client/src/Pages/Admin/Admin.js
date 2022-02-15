import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Button, Grid, Box, Typography, Paper } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import useStyles from './styles';

const Admin = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2}>
            <Link to='/admin/add/post' className={classes.adminLink}>
              <Button variant="contained">Add Post</Button>
            </Link>
            <Link to='/admin/add/user' className={classes.adminLink}>
              <Button variant="outlined">Add User</Button>
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} sx={{display: 'grid', justifyContent: 'flex-end'}}>
          <Button variant="contained" onClick={() => window.location.reload()}>
            <RefreshIcon />
          </Button>
        </Grid>
      </Grid>
      <Box className={classes.adminSection}>
        <Paper elevation={2} className={classes.adminChildSection} sx={{width: '400px', mr:3}}>
          <Typography variant='h6' component='h4'>Posts</Typography>
          <Link to='posts' style={{textDecoration: 'none'}}>
            <Button variant='outlined'>All Posts</Button>
          </Link>
        </Paper>
        <Paper elevation={2} className={classes.adminChildSection} sx={{width: '400px'}}>
          <Typography variant='h6' component='h4'>Users</Typography>
          <Link to='users'  style={{textDecoration: 'none'}}>
            <Button variant='outlined'>All Users</Button>
          </Link>
        </Paper>
      </Box>
    </div>
)};

export default Admin;