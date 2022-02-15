import React, { useEffect, useState } from 'react';
import { Typography, AppBar, Box, Toolbar, InputBase, styled, IconButton } from '@mui/material';
import { Search, Menu } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import useStyles from './styles';
import AppMenu from './Menu/AppMenu';
import AuthMenu from './Menu/AuthMenu';

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'white',
    '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

const Header = () => {
    const location = useLocation();
    let user = JSON.parse(localStorage.getItem('profile'));
    let isLogin = JSON.parse(localStorage.getItem('isLogin'));
    let navigate = useNavigate();

    useEffect(() => {
        // if(!isLogin) navigate('/auth?type=login');
        if(!user || !isLogin) navigate('/auth?type=login');
    }, [location.pathname]);

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    
    return (
        <Box sx={{flexGrow: 1}} >
            <AppBar className={classes.headerContainer} >
                <Toolbar sx={{display: 'flex', justifyContent: "space-between", alignItems: 'center'}}>
                    <Box sx={{display: 'flex'}}>
                        <AppMenu open={open} setOpen={setOpen} />
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, mt: '-5px' }} onClick={() => setOpen(true)}>
                            <Menu />
                        </IconButton>
                        <Typography variant='h5' component='h3' sx={{position: 'relative'}}>
                            <Link to='/' className={classes.siteBrand}>Blogs</Link>
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <div className={classes.searchContainer}>
                            <div className={classes.searchIcon}>
                                <Search />
                            </div>
                            <StyledInputBase placeholder="Search..." />
                        </div>
                        <AuthMenu user={user} />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
