import * as api from '../api/index';

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const getLimitUsers = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchLimitUsers(page);

        dispatch({type: 'FETCH_LIMIT', payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const addUsers = (user) => { 
    
    return (async (dispatch) => {

        try {
            const { data } = await api.createUsers(user);
            dispatch({type: 'CREATE', payload: data});
        } catch (error) {
            console.log(error);
        }

    });
};

export const updateUsers = (id, updatedUser) => {

    return (async (dispatch) => {

        try {
            const {data} = await api.updateUsers(id, updatedUser);
            dispatch({type: 'UPDATE', payload: data});
        } catch (error) {
            console.log(error);
        }

    });
};

export const removeUsers = (id) => {
    const deleteUserInit = (id) => ({type: 'USER_DELETE_REQUEST', payload: id});

    return (async (dispatch) => {
        dispatch(deleteUserInit(id));
        
        try {
            await api.deleteUsers(id);
            dispatch({type: 'DELETE', payload: id});
        } catch (error) {
            console.log(error);
        }
    });
};