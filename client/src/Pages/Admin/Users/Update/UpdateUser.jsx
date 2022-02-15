import { Box, Typography, Button, TextField, Stack, CircularProgress, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { updateUsers } from '../../../../actions/users';

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

const UpdateUser = () => {
    let { username } = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    const [user, setUser] = useState({firstName: '', lastName: '', username: '', email: '', password: ''});
    const users = useSelector( store => store.users.users );
    const curUser = username ? users.find( user => user.username === username ) : null;
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(null);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        if(curUser) setUser(curUser);
    }, [username, curUser]);

    const handlePopupClose = () => {
        setLoader(false);
        setPopup(false);
      }    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setLoader(true);
        
        dispatch(updateUsers(user.id, user)).then(() => {
            setPopup(true);
            navigate(`../admin/edit/user/${user.username}`);
        });
    }

    return (
        <div>
            <Typography variant="h4" component='h2'>Update User</Typography>
            <Link to='/admin/users' className={classes.adminLink}>
                <Button variant="contained">⬅ Back</Button>
            </Link>
            <form autoComplete='off' onSubmit={handleSubmit}>
            <Stack spacing={2} maxWidth='sm'>
                <TextField label="First Name" name="firstName" value={user.firstName} variant="outlined" required onChange={(e) => setUser({...user, firstName: e.target.value})} />
                <TextField label="Last Name" name="lastName" value={user.lastName} variant="outlined" required onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                <TextField label="Username" name="username" value={user.username} variant="outlined" required onChange={(e) => setUser({...user, username: e.target.value})} />
                <TextField label="Email" name="email" type='email' value={user.email} variant="outlined" required onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <TextField label="Password" name='password' value={user.password} variant="outlined" required onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </Stack>
            <Box >
                {   loader ?
                    <Button variant='contained' sx={{mt: 2,}}><CircularProgress size='25px' sx={{color:'#fff'}} /></Button> :
                    <Button variant='contained' type='submit' sx={{mt: 2, textTransform: 'capitalize'}} >Update User</Button>
                }
            </Box>
            </form>
            <Dialog open={popup} TransitionComponent={Transition} keepMounted onClose={handlePopupClose}>
                <DialogTitle>{"User added successfuly."}</DialogTitle>
                <DialogActions>
                <Button variant='outlined' onClick={handlePopupClose}>
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )};

export default UpdateUser;
