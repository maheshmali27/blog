import * as api from '../api/index';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({type: 'FETCH_ALL_USER', payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const addPosts = (newPost) => async (dispatch) => {

    try {
        const { data } = await api.createPosts(newPost);
        dispatch({type: 'CREATE_POST', payload: data});
    } catch (error) {
        console.log(error);
    }

};

export const updatePosts = (id, updatedPost) => async (dispatch) => {

    try {
        const { data } = await api.updatePosts(id, updatedPost);
        dispatch({type: 'UPDATE_POST', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePosts = (id) => async (dispatch) => {
    const deletePostsReq = (id) => ({type: 'POST_DELETE_REQUEST', payload: id});

    try {
        dispatch(deletePostsReq(id));

        await api.deletePosts(id);
        dispatch({type: 'POST_DELETE', payload: id});
    } catch (error) {
        console.log(error);
    }

}