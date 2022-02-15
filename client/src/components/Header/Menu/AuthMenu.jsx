import React from 'react';
import { Box, Button, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { styled } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';

const AuthButton = styled(Button)({
    color: '#fff !important',
    backgroundColor: '#03488d !important',
    border: '1px solid #fff !important',
    height: '40px',
    marginTop: '5px !important',
    '&:hover': {
        backgroundColor: '#013364 !important',
        border: '0 !important'
    }
});

const AuthMenu = ({ user }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const profile = JSON.parse(localStorage.getItem('profile'));
    const isLogin = localStorage.getItem('isLogin');

    const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
    };

    const handleClickMyAccount = () => {
        navigate('/myaccount');
    }

    const handleClickLogout = (e) => {
        localStorage.removeItem('profile');
        localStorage.removeItem('isLogin');
        navigate('/auth?type=login');
    }

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Box sx={{display: 'flex', ml: 3}}>
            { !isLogin && <Link to="/auth?type=login" sx={{textDecoration: 'none'}}><AuthButton varient='contained'>Login</AuthButton></Link> }
            { !isLogin && <Link to="/auth?type=signup" sx={{textDecoration: 'none'}}><AuthButton varient='contained' sx={{ml: 2}}>Sign Up</AuthButton></Link> }
            { user && isLogin && <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{backgroundColor: '#013364 !important', ml: 2}}
                >
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: 'inherit' }}>{ profile?.firstName[0]?.toUpperCase() }</Avatar>
                </IconButton>
                </Tooltip>
            </Box> }
            { user && isLogin && <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClickMyAccount}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClickLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu> }
        </Box>
    )};

export default AuthMenu;
