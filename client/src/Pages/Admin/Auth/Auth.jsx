import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, IconButton, InputAdornment, Button, Typography, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Visibility, VisibilityOff  } from '@mui/icons-material';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { addUsers, getUsers } from '../../../actions/users';

const useQuery = () => {
    const { search } = useLocation();
    
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Auth = () => {
    let query = useQuery();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector( store => store.users.allUsers );
    let userObj = {id: uuid(), firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: ''};

    const [ user, setUser ] = useState(userObj);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ errorPasswordMatch, setErrorPasswordMatch ] = useState(false);
    const [ loginErr, setLoginErr ] = useState(false);
    // const [ isLogin, setIsLogin ] = useState(false);
    const [ userCreated, setUserCreated ] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'First Name':
                return setUser({ ...user, firstName: e.target.value });
            case 'Last Name':
                return setUser({ ...user, lastName: e.target.value });
            case 'Email':
                return setUser({ ...user, email: e.target.value });
            case 'Username':
                return setUser({ ...user, username: e.target.value });
            case 'Password':
                return setUser({ ...user, password: e.target.value });
            case 'Confirm Password':
                return setUser({ ...user, confirmPassword: e.target.value });
            default:
                return setUser({ ...user, formNonKey: e.target.value });
        }
    }

    useEffect(() => {
        if(query.get('type') === 'signup') setLoginErr(false);
    }, [query]);

    const handleFormTypeChange = () => {
        setUser(userObj);
        setUserCreated(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const curUser = users.find(oUser => oUser.email === user.email);

        const hasUsername = Boolean(users.find(oUser => oUser.username === user.username));
        const hasEmail = Boolean(users.find(oUser => oUser.email === user.email));
        const checkPassword = Boolean(curUser?.password === user.password);
        
        setLoading(true);
        /******
        *@Login
        ******/
        if(query.get('type') === 'login') {
            // if( profile?.email !== user.email || profile?.password !== user.password ) return setLoginErr(true);
            if(!hasEmail || !checkPassword) {
                setLoginErr(true);
                // setIsLogin(false);
                setUserCreated(false);
                setLoading(false);
                return false;
            }

            // setIsLogin(true);
            
            localStorage.setItem('isLogin', true);
            localStorage.setItem('profile', JSON.stringify(curUser));
            // dispatch(AuthLogin(isLogin));
            
            setLoginErr(false);
            setUserCreated(false);
            navigate('/admin');
            setLoading(false);

            return true;
        }

        /******
        *@Signup
        ******/
        if(query.get('type') !== 'login') {
            // localStorage.setItem('profile', JSON.stringify(user));

            if(user.password !== user.confirmPassword) {
                setLoading(false);
                setErrorPasswordMatch(true);
                return false;
            }

            dispatch(addUsers(user))
            .then(() => {

                if(hasUsername && hasEmail) {
                    throw new Error('both');
                }
        
                if(hasUsername) {
                    setErrorEmail(false);
                    throw new Error('username');
                }
        
                if(hasEmail) {
                    setErrorUsername(false);
                    throw new Error('email');
                }

                setUser(userObj);
                setUserCreated(true);
                setErrorEmail(false);
                setErrorUsername(false);
                setErrorPasswordMatch(false);

                navigate('/auth?type=login');
                setLoading(false);

                return true;
            })
            .catch((err) => {
                err.message === 'username' && setErrorUsername(true);
                err.message === 'email' && setErrorEmail(true);
          
                if(err.message === 'both') {
                  setErrorUsername(true);
                  setErrorEmail(true);
                }
                setUserCreated(false);
                setLoading(false);
                return false;
            });
        }

    }

    return (
        <Container maxWidth='xs' sx={{ padding: 3, borderRadius: 2, border: '1px solid #eee'}}>
            <Typography variant='h6' component='h4' sx={{textAlign: 'center', borderBottom: '1px solid #03488d', mb: 3, paddingBottom: 1}}>{query.get('type') === 'login' ? 'Login' : 'Sign up'}</Typography>
            { loginErr && <Typography variant='body2' component='p' sx={{padding: "10px 5px", mb: 3, color: 'red', borderLeft: '3px solid red'}}>Invalid user credentials.</Typography> }
            { userCreated && <Typography variant='body2' component='p' sx={{padding: "10px 5px", mb: 3, color: 'green', borderLeft: '3px solid green'}}>Account created successfuly. Please, login!!</Typography> }
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    { query.get('type') !== 'login' && <SignUP name='First Name' type='text' half handleChange={handleChange} /> }
                    { query.get('type') !== 'login' && <SignUP name='Last Name' type='text' half handleChange={handleChange} /> }
                    <SignUP name='Email' type='email' value={user.email} errorEmail={errorEmail} errorHelperText={errorEmail ? 'An account already exist with this email.' : ''} handleChange={handleChange} />
                    { query.get('type') !== 'login' && <SignUP name="Username" value={user.username} errorUsername={errorUsername} errorHelperText={errorUsername ? 'Username already exist. Please try another.' : ''} variant="outlined" required handleChange={handleChange} /> }
                    <SignUP name='Password' tooglePass={true} value={user.password} errorPasswordMatch={errorPasswordMatch} errorHelperText={errorPasswordMatch ? 'Passwords do not match.' : ''} type={showPassword? 'text' : 'password'} showPassword={showPassword} handleChange={handleChange} handleClickShowPassword={handleClickShowPassword} handleMouseDownPassword={handleMouseDownPassword} />
                    { query.get('type') !== 'login' && <SignUP name='Confirm Password' type={showPassword? 'text' : 'password'} errorPasswordMatch={errorPasswordMatch} errorHelperText={errorPasswordMatch ? 'Passwords do not match.' : ''} handleChange={handleChange} handleClickShowPassword={handleClickShowPassword} handleMouseDownPassword={handleMouseDownPassword} /> }
                </Grid>
                { loading ? <LoadingButton loading variant="outlined" sx={{mt: 2}}>Submit</LoadingButton> :
                <Button variant='contained' type='submit' sx={{mt: 2, textTransform: 'capitalize'}} >{query.get('type') === 'login' ? 'Login' : 'Sign up'}</Button>}
            </form>
            <Box sx={{mt: 2}} onClick={handleFormTypeChange}>
            { query.get('type') === 'login' ? <Link to="/auth?type=signup" style={{textDecoration: 'none !important'}}>Don't have a account? Signup</Link>
            : <Link to="/auth?type=login" style={{textDecoration: 'none !important'}}>Already have a account? login</Link> }
            </Box>
        </Container>
    )};

export default Auth;

const SignUP = ({ name, type, value, half, tooglePass, showPassword, errorEmail, errorUsername, errorPasswordMatch, errorHelperText, handleChange, handleClickShowPassword, handleMouseDownPassword }) => {
    
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField variant='outlined' label={name} name={name} type={type} value={value} required fullWidth onChange={handleChange} error={errorPasswordMatch || errorUsername || errorEmail} helperText={errorHelperText}
                InputProps = { 
                    tooglePass ?
                        {endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )}
                    : null
                }
            />
        </Grid>
    )};
