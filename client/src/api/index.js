import axios from 'axios';

const baseURL = 'http://localhost:5000';

export const fetchUsers = () =>  axios.get(`${baseURL}/users/`);
export const fetchLimitUsers = (page) =>  axios.get(`${baseURL}/users/${page}`);
export const createUsers = (newUser) => axios.post(`${baseURL}/users/add/`, newUser);
export const updateUsers = (id, updatedUser) => axios.patch(`${baseURL}/users/${id}/`, updatedUser);
export const deleteUsers = (id) => axios.delete(`${baseURL}/users/${id}/`);

export const fetchPosts = () => axios.get(`${baseURL}/posts`);
export const createPosts = (newPost) => axios.post(`${baseURL}/posts/add`, newPost);
export const updatePosts = (id, updatedPost) => axios.patch(`${baseURL}/posts/${id}`, updatedPost);
export const deletePosts = (id) => axios.delete(`${baseURL}/posts/${id}`);

