import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

//Icons
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';

const useStyles = makeStyles(() => ({
    adminMenu: {
        '& div.MuiPaper-root': {
            minWidth: '240px'
        }
    },
    menuLinks: {
        '&:hover': {
            color: '#fff'
        },
        '& div.MuiListItemButton-root': {
            '&:hover': {
                backgroundColor: '#1976d2'
            }
        },
        '& div.MuiListItemIcon-root': {
            color: '#000'
        }
    },
    menuClose: {
        margin: '-3px 0 0 auto !important',
        transition: 'all 0.5s !important',
        '&:hover': {
            transform: 'rotate(360deg)'
        }
    }
}))

const AppMenu = ({open, setOpen}) => {
    const classes = useStyles();

    return (
        <Drawer open={open} className={classes.adminMenu} onClose={() => setOpen(false)}>
            <Box sx={{mt: 3, mx: 3, display: 'flex'}}>
                <Typography variant='h6' component='p'>Menu</Typography>
                <IconButton className={classes.menuClose} onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                <AppMenuList setOpen={setOpen} name='Home' link='/' icon={<HomeIcon />} />
                <AppMenuList setOpen={setOpen} name='Admin' link='/admin' icon={<AdminPanelSettingsIcon />} />
                <AppMenuList setOpen={setOpen} name='New Post' link='/admin/post' icon={<ArticleIcon />} />
                <AppMenuList setOpen={setOpen} name='New User' link='/admin/user' icon={<PersonIcon />} />
                <AppMenuList setOpen={setOpen} name='All Posts' link='/posts' icon={<ArticleIcon />} />
            </List>
        </Drawer>
    )};

export default AppMenu;

const AppMenuList = ({name, icon, link, setOpen}) => {
    const classes = useStyles();

    return(
        <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setOpen(false)}>
            <ListItem disablePadding className={classes.menuLinks}>
                <ListItemButton>
                    <ListItemIcon>
                        {icon ? icon : <CircleIcon />}
                    </ListItemIcon>
                    <ListItemText primary={name} />
                </ListItemButton>
            </ListItem>
            <Divider />
        </Link>
    )};