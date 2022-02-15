export const posts = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_USER':
            return action.payload;
        case 'CREATE_POST_REQUEST':
            return [...posts, { ...action.payload, creating: true }];
        case 'CREATE_POST':
            return posts.map(post => post._id === action.payload._id ? action.payload : post);
        case 'UPDATE_POST_REQUEST':
            return posts.map(post => post._id === action.payload._id ? {...action.payload, updating: true} : post);
        case 'UPDATE_POST':
            return posts.map(post => post._id === action.payload._id ? action.payload : post);
        case 'POST_DELETE_REQUEST':
            return posts.map(post => post._id === action.payload ? { ...post, deleting: true } : post);
        case 'POST_DELETE':
            return posts.filter(post => post._id !== action.payload);
        default:
            return posts;
    }
};