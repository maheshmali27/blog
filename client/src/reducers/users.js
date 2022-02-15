export const users = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return { ...state, allUsers: action.payload };
        case 'FETCH_LIMIT':
            return { ...state, users: action.payload.data, curPage: action.payload.curPage, totalPages: action.payload.totalPages };
        case 'CREATE':
            return { ...state, users: [ ...state.users, action.payload ] };
        case 'UPDATE':
            return { ...state, users: state.users.map(user => user.id === action.payload.id ? action.payload : user) };
        case 'USER_DELETE_REQUEST':
            return { ...state, users: state.users.map(user => user.id === action.payload ? { ...user, deleting: true } : user) };
        case 'DELETE':
            return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
        default:
            return state;
    }
};