import React, { useContext } from 'react';
import MainLayout from '../components/MainLayout';
import { useForm, Controller } from 'react-hook-form';
import { TaskContext } from '../utils/taskManager';
import { Box, ListItem, List, TextField, Button, Typography, Link } from '@material-ui/core';
import styleObjects from '../utils/styles';
import { useSnackbar } from 'notistack';
import NextLink from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/dist/client/router';

const Register = () => {
    const {handleSubmit, control, formState:{errors}} = useForm();
    const {state, dispatch} = useContext(TaskContext);
    const {userInfo} = state;
    const {useRegisterStyles} = styleObjects();
    const classes = useRegisterStyles();
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();

    // register submit handler
    const registerSubmitHandler = async ({name, email, password, confirmPassword}) =>{
        if(password !== confirmPassword){
            enqueueSnackbar('passwords do not match', {
                variant:'error'
            })
            return;
        }
        try{
            const {data} = await axios.post('/api/user/register', {name, email, password, theme:null, background:null});
            dispatch({type: 'ADD_USER_INFO_CUSTOM', payload:data});
            Cookies.set('userInfo', data);
            enqueueSnackbar('registration successful', {variant:'success'})
            router.push(`/${data._id}`);
        }catch(err){
            enqueueSnackbar('unable to register',
            {variant:'error'})
        }
    }
    return (
        <MainLayout title='Register'>
            <Box justifyContent='center' display='flex' className={classes.formBox}>
                <form className={classes.form} onSubmit={handleSubmit(registerSubmitHandler)}>
                    <List>
                        <ListItem>
                            <Controller
                            name='name'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                minLength: 3
                            }}
                            render={({field})=>{
                                return (
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id='name'
                                        label='Name'
                                        inputProps={{type:'name'}}
                                        error={Boolean(errors.name)}
                                        helperText={
                                            errors.name ?
                                                errors.name.type === 'minLength'
                                                ? 'Enter a name above 2 chars'
                                                : 'Name is rerquired'
                                            : ''
                                        }
                                        {...field}>
                                        
                                    </TextField>
                                )}}>
                            </Controller>
                        </ListItem>
                        <ListItem>
                        <Controller
                            name='email'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: true,
                                pattern:  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            }}
                            render={({field})=>{
                                return (
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id='email'
                                        label='Email'
                                        inputProps={{type:'email'}}
                                        error={Boolean(errors.email)}
                                        helperText={
                                            errors.email ?
                                                errors.email.type === 'pattern'
                                                ? 'Enter a valid email'
                                                : 'Email is required'
                                            : ''
                                        }
                                        {...field}>
                                        
                                    </TextField>
                                )}}>
                            </Controller>
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
                            <Controller
                                name='confirmPassword'
                                control={control}
                                defaultValue=''
                                rules={
                                    {
                                        required:true,
                                        minLength: 5
                                    }
                                }
                                render={({field})=>{
                                    return (
                                        <TextField
                                            id='confirmPassword'
                                            label='Confirm Password'
                                            inputProps={{type:'password'}}
                                            error={Boolean(errors.password)}
                                            fullWidth
                                            variant='outlined'
                                            helperText={
                                                errors.confirmPassword ?
                                                    errors.confirmPassword.type === 'minLength'?
                                                        'Confirm password is too mall':
                                                        'Confirm password is invalid'
                                                    :
                                                    ''
                                            }
                                            {...field}
                                        />
                                    )
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <Button type='submit' variant='contained'>Register</Button>
                        </ListItem>
                        <ListItem>
                            <NextLink href={'/login'} passHref>
                                <Link>
                                    <Typography> Already have an account? login</Typography>
                                </Link>
                            </NextLink>
                        </ListItem>
                    </List>
                </form>
            </Box>
        </MainLayout>
    )
};

export default Register;
