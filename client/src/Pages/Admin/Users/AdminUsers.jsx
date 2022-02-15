import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Paper, Divider, Box, Button, Pagination, PaginationItem } from '@mui/material';
import DisplayUsers from './Display/DisplayUsers';
import { makeStyles } from '@mui/styles'
import { Link, useLocation } from 'react-router-dom';

import { getLimitUsers, getUsers } from '../../../actions/users';

const useStyles = makeStyles(() => ({
    adminLink: {
      display: 'inline-block',
      textDecoration: 'none',
      margin: '30px 10px'
    }
}));

const useQuery = () => {
    const {search} = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector((store) => store.users.users);
    const allUsers = useSelector((store) => store.users.allUsers);
    const totalPages = useSelector((store) => store.users.totalPages);
    const query = useQuery();
    const classes = useStyles();
    const page = query.get('page') || 1;

    useEffect(() => {
        dispatch(getLimitUsers(page));
        dispatch(getUsers());
    }, [dispatch, page]);

    if(!users?.length) return 'No users, please create some.';

    return (
        <Paper variant="outlined" sx={{ padding: '10px'}}>
            <Box>
                <Link to='/admin/' className={classes.adminLink}>
                    <Button variant="contained">⬅ Back</Button>
                </Link>
                <Link to='/admin/add/user' className={classes.adminLink}>
                    <Button variant="contained">New User</Button>
                </Link>
            </Box>
            <Typography variant="h6" component="h3">All Users</Typography>
            <Typography variant="subtitle2" component="p" sx={{mt: 2}}>Total Users: {allUsers?.length}</Typography>
            <Divider sx={{ margin: '10px 0' }} />
            {users.length === 0 && 'No users. Please Create User.'}
            <Box>
                {
                    users.map((user) => (
                        user.username && <DisplayUsers key={user.id} user={user} />
                    ))
                }
            </Box>
            <Divider sx={{borderColor: '#bababa', my: 3}} />
            <Pagination 
                count={totalPages} 
                variant="outlined" 
                shape="rounded" 
                page={Number(page) || 1}
                renderItem={(item) => (
                    <PaginationItem {...item} component={Link} to={`/admin/users?page=${item.page}`} />
                )}
            />
        </Paper>
)};

export default Users;
