import React, { useContext, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { Controller, useForm } from 'react-hook-form';
import { TaskContext } from '../utils/taskManager';
import { Box, List, ListItem, TextField, Typography, Button, Link } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/dist/client/router';
import styleObjects from '../utils/styles';
import NextLink from 'next/link';
import GoogleLogin from 'react-google-login';
import Cookies from 'js-cookie';
import Image from 'next/image';
import axios from 'axios';

const Login = () => {
    const {state,dispatch} = useContext(TaskContext);
    const { userInfo } = state;
    // use form states
    const {handleSubmit, control, formState:{errors}} = useForm();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const router = useRouter();
    // styles
    const {useLoginStyles} = styleObjects();
    const classes = useLoginStyles();

    // google client id
    const clientId = '963986818059-jg6cmm0ge7p9k9jk7gid9304p92773f0.apps.googleusercontent.com';

    // jumping back to home
    useEffect(()=>{
        if(userInfo){
            router.push('/')
        }
    },[router, userInfo])

    // form submit handler for custom login
    const submitHandler = async ({email, password})=>{ // custom login component
        closeSnackbar();
        try{
            const {data} = await axios.post('/api/user/login', {email, password});
            dispatch({type: 'ADD_USER_INFO_CUSTOM', payload:data});
            Cookies.set('userInfo', data);
            router.push('/');
            enqueueSnackbar('Login Succesful',
            {variant:'success'});
        }catch(err){
            enqueueSnackbar('unable to login', {
                variant:'error'
            })
        }
    };

    // google login -- to be continued
    const googleSuccess = async (res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try{
            dispatch({type:'ADD_USER_INFO', payload: {result, token}});
            // Cookies.set('userInfo', result);
            enqueueSnackbar(
                'Login Successful',
                {variant:'success'}
            )
            router.push('/');// redirect back to home
        }catch(err){
            enqueueSnackbar('failed login',
            {variant:'error'})
        }
    }
    const googleFailure = (error)=>{
        closeSnackbar();
        console.log(error);
        enqueueSnackbar(
            'Sign in was unsuccessful',
            {variant:'error'}
        )
    }
    return (
        <MainLayout title='Login'>
            <Box justifyContent='center' display='flex' className={classes.formBox}>
                <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                    <Typography variant='h4'>Login Page</Typography>
                    <List>
                        <ListItem>
                            <Controller
                                name='email'
                                control={control}
                                defaultValue=''
                                rules={{
                                    required:true,
                                    pattern:  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                }}
                                render={({field})=>(
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id='email'
                                        label='Email'
                                        inputProps={{type:'email'}}
                                        error={Boolean(errors.email)}
                                        helperText={
                                            errors.email
                                            ? errors.email.type === 'pattern'
                                                ? 'Email is not valid'
                                                : 'Email is required'
                                            : ''
                                        }
                                        {...field}
                                    >
                                    </TextField>
                                )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                                name='password'
                                control={control}
                                defaultValue=''
                                rules={{
                                    required:true,
                                    minLength: 5
                                }}
                                render={({field})=>(
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id='password'
                                        label='Password'
                                        inputProps={{type:'password'}}
                                        error={Boolean(errors.password)}
                                        helperText={
                                            errors.password
                                            ? errors.password.type === 'minlength'
                                                ? 'Password is too small'
                                                : 'Password is required'
                                            :''
                                        }
                                        {...field}
                                    />
                                )}>
                            </Controller>
                        </ListItem>

                        <ListItem>
                            <Typography style={{display:'flex'}}>Already Have an account? 
                            <NextLink href='/register'>
                                <Link>
                                    <Typography style={{cursor:'pointer'}}>Register</Typography>
                                </Link>
                            </NextLink></Typography>
                        </ListItem>
                           
                       <ListItem>
                           <Button variant='contained' type='submit'>Login</Button>
                       </ListItem>

                       <ListItem>
                            <GoogleLogin
                                clientId={clientId}
                                render={(renderProps)=>(
                                    <Button
                                        onClick={renderProps.onClick}
                                        color='primary'
                                        className={classes.googleLogin}
                                        fullWidth
                                        variant='contained'>
                                        Google Sign In
                                    </Button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy='single_host_origin'
                            />        
                        </ListItem>
                    </List>
                </form>
            </Box>
        </MainLayout>
    )
}

export default Login;

