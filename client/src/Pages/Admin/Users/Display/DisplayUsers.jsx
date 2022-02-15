import React from 'react';
import { Grid, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeUsers  } from '../../../../actions/users';
import useStyles from './styles';

const DisplayUsers = ({ user }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClick = () => {
        dispatch(removeUsers(user.id));
    };

    return (
        <Grid container spacing={1} className={classes.gridUserItem}>
            <Grid item xs={4} sm={4}>
                <b>Name</b>: {user.firstName}
            </Grid>
            <Grid item xs={4} sm={4}>
                <b>Username</b>: {user.username}
            </Grid>
            <Grid item xs={4} sm={4} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Link to={`/admin/edit/user/${user.username}`}>
                    <IconButton>
                        <EditOutlinedIcon color='primary' />
                    </IconButton>
                </Link>
                <IconButton onClick={handleClick}>
                    { user.deleting ?  '...' :<DeleteIcon color='primary' /> }
                </IconButton>
            </Grid>
        </Grid>
    )};

export default DisplayUsers;
