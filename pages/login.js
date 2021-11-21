import React, { useContext, useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Controller, useForm } from 'react-hook-form';
import { TaskContext } from '../utils/taskManager';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/dist/client/router';
import styleObjects from '../utils/styles';

const Login = () => {
    const {state,dispatch} = useContext(TaskContext);
    const {handleSubmit, control} = useForm();
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    // styles
    const {useLoginStyles} = styleObjects();
    const classes = useLoginStyles();

    // form submit handler
    const submitHandler = async ()=>{
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
                            <Controller/>
                        </ListItem>
                    </List>
                </form>
            </Box>
        </MainLayout>
    )
}

export default Login;

