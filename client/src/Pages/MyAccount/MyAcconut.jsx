import { Paper, Button, Grid, Typography, Divider, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUsers,removeUsers, updateUsers } from '../../actions/users';

const MyAcconut = () => {
    const dispatch = useDispatch();
    const profile =JSON.parse(localStorage.getItem('profile'));
    const users = useSelector( store => store.users.allUsers );
    const curUser = users?.find(user => user.username === profile.username);
    const navigate = useNavigate();
    const [passError, setPassError] = useState(false);
    const [passChangeSuccess, setPassChangeSuccess] = useState(false);
    const [pass, setPass] = useState({curPassword: '', password: ''});

    
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleClickLogout = () => {
        localStorage.removeItem('profile');
        localStorage.removeItem('isLogin');
        navigate('/auth?type=login');
    }

    const handleClick = () => {
        localStorage.removeItem('profile');
        localStorage.removeItem('isLogin');
        dispatch(removeUsers(profile?.id));
        navigate('/auth?type=login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(pass.curPassword !== curUser.password) {
            setPassError(true);
            return false;
        }
        dispatch(updateUsers(curUser.id, pass));
        localStorage.setItem('profile', JSON.stringify({
            id: profile.id,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            username: profile.username,
            password: pass.password
        }));
        setPassError(false);
        setPassChangeSuccess(true);
        setTimeout(() => setPassChangeSuccess(false), 3000);
        setPass({curPassword: '', password: ''});
    }

    return (
        <Paper elevation={2} sx={{padding: 4}}>
            <Typography variant='h6' component='h4' sx={{mb: 3, pb: 2, borderBottom: '1px solid #000'}}>MyAcconut</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sx={{p: 2, display: 'flex', }}>
                            <Typography variant='subtitle1' component='div' sx={{mr: 2, fontWeight: '700'}}>First Name:</Typography>
                            <Typography variant='subtitle1' component='div'>{profile.firstName}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{mt: '-30px'}}>
                            <Divider sx={{borderColor: '#bababa'}} />
                        </Grid>
                        <Grid item xs={12} sx={{p: 2, display: 'flex', }}>
                            <Typography variant='subtitle1' component='div' sx={{mr: 2, fontWeight: '700'}}>Last Name:</Typography>
                            <Typography variant='subtitle1' component='div'>{profile.lastName}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{mt: '-30px'}}>
                            <Divider sx={{borderColor: '#bababa'}} />
                        </Grid>
                        <Grid item xs={12} sx={{p: 2, display: 'flex', }}>
                            <Typography variant='subtitle1' component='div' sx={{mr: 2, fontWeight: '700'}}>Email:</Typography>
                            <Typography variant='subtitle1' component='div'>{profile.email}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{mt: '-30px'}}>
                            <Divider sx={{borderColor: '#bababa'}} />
                        </Grid>
                    </Grid> 
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='h6' component='h4' sx={{mr: 2, fontWeight: '700'}}>Change Password</Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} sx={{mt: 2}}>
                            <TextField variant='outlined' label='Current Password' required value={pass.curPassword} error={passError} helperText={passError ? 'Password does not match.' : ''} onChange={e => setPass({...pass, curPassword: e.target.value})} />
                            <TextField variant='outlined' label='New Password' required value={pass.password} onChange={e => setPass({ ...pass, password: e.target.value })} />
                            <Button variant='contained' type='submit'>Change Password</Button>
                            {passChangeSuccess && <Typography variant='subtitle2' component='p' sx={{padding: 3, borderLeft: '3px solid green'}}>Password Changed</Typography>}
                        </Stack>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' sx={{mr: 2}} onClick={handleClickLogout}>Logout</Button>
                    <Button variant='outlined' onClick={handleClick}>Delete Account</Button>
                </Grid>
            </Grid>
        </Paper>
    )};

export default MyAcconut;
