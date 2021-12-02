import React, { useContext } from 'react';
import MainLayout from '../components/MainLayout';
import { useForm, Controller } from 'react-hook-form';
import { TaskContext } from '../utils/taskManager';
import { Box, ListItem, List, TextField } from '@material-ui/core';
import styleObjects from '../utils/styles';
import { useSnackbar } from 'notistack';

const Register = () => {
    const {handleSubmit, control, formState:{errors}} = useForm();
    const {state, dispatch} = useContext(TaskContext);
    const {useRegisterStyles} = styleObjects();
    const classes = useRegisterStyles();
    const {enqueueSnackbar} = useSnackbar();

    // register submit handler
    const registerSubmitHandler = async () =>{

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
                    </List>
                </form>
            </Box>
        </MainLayout>
    )
};

export default Register;
