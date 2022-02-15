import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Typography, Stack, Button, Box, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {v4 as uuid} from 'uuid';
import LoadingButton from '@mui/lab/LoadingButton';

import { addUsers } from '../../../../actions/users';

const useStyles = makeStyles(() => ({
    adminLink: {
      display: 'inline-block',
      textDecoration: 'none',
      margin: '30px 0'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector( state => state.users.users );
  let userObj = {id: uuid(), firstName: '', lastName: '', username: '', email: '', password: ''};

  const [user, setUser] = useState(userObj);
  const [loader, setLoader] = useState(false);
  const [popup, setPopup] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const handlePopupClose = () => {
    setLoader(false);
    setPopup(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoader(true);

    dispatch(addUsers(user))
    .then(() => {
      const hasUsername = Boolean(users.find(oUser => oUser.username === user.username));
      const hasEmail = Boolean(users.find(oUser => oUser.email === user.email));

      if(hasUsername && hasEmail) {
        throw new Error('both');
      }

      if(hasUsername) {
        setErrorEmail(false);
        throw new Error('username');
      }

      if(hasEmail) {
        setErrorUsername(false);
        throw new Error('email');
      }

      setErrorUsername(false);
      setErrorEmail(false);
      setPopup(true);
              
      setUser(userObj);
    })
    .catch((err) => {
      err.message === 'username' && setErrorUsername(true);
      err.message === 'email' && setErrorEmail(true);

      if(err.message === 'both') {
        setErrorUsername(true);
        setErrorEmail(true);
      }

      setLoader(false);
    });
  }
  return (
    <div>
      <Typography variant="h4" component='h2'>Add New User</Typography>
      <Link to='/admin/users' className={classes.adminLink}>
          <Button variant="contained">⬅ Back</Button>
      </Link>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <Stack spacing={2} maxWidth='sm'>
          <TextField label="First Name" name="firstName" value={user.firstName} variant="outlined" required onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
          <TextField label="Last Name" name="lastName" value={user.lastName} variant="outlined" required onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
          <TextField label="Username" name="username" value={user.username} error={errorUsername} helperText={errorUsername ? 'Username Already Exist.' : ''} variant="outlined" required onChange={(e) => setUser({ ...user, username: e.target.value })} />
          <TextField label="Email" name="email" type='email' value={user.email} error={errorEmail} helperText={errorEmail ? 'An account already exist with this email.' : ''} variant="outlined" required onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <TextField label="Password" name='password' value={user.password} variant="outlined" required onChange={(e) => setUser({ ...user, password: e.target.value })} />
        </Stack>
        <Box >
          {
            !loader ? 
            <Button variant='contained' type='submit' sx={{mt: 2, textTransform: 'capitalize'}} >Create User</Button>
            : <LoadingButton loading variant="contained" color='primary' sx={{mt:2}}>Creating...</LoadingButton>
          }
        </Box>
      </form>
      <div>
        <Dialog open={popup} TransitionComponent={Transition} keepMounted onClose={handlePopupClose}>
          <DialogTitle>{"User created successfuly!"}</DialogTitle>
          <DialogActions>
            <Button onClick={handlePopupClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
)};

export default AddUser;