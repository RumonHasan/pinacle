import React, { useContext, useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Controller, useForm } from 'react-hook-form';
import { TaskContext } from '../utils/taskManager';
import { Box, List, ListItem, TextField, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/dist/client/router';
import styleObjects from '../utils/styles';

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

    // form submit handler
    const submitHandler = async ()=>{
        closeSnackbar();
        try{

        }catch(err){
            enqueueSnackbar(err.message, {
                variant:'error'
            })
        }
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

                            />
                        </ListItem>
                    </List>
                </form>
            </Box>
        </MainLayout>
    )
}

export default Login;

