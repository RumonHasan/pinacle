import React, { useState, useContext } from 'react';
import MainLayout from '../components/MainLayout';
import { TextField,
Button, 
Container} from '@material-ui/core';
import styleObjects from '../utils/styles';
import { useSnackbar } from 'notistack';
import database from '../utils/database';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import {TaskContext} from '../utils/taskManager';

 const AddTask = () => {
    const {dispatch} = useContext(TaskContext);
    const {useAddTaskStyles} = styleObjects();
    const classes = useAddTaskStyles();
    const router = useRouter();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    // add task
    const [taskForm, setTaskForm] = useState({
        title:'',
        details:'',
        completed:false,
    })
    const handleTaskChange = (e)=>{
        const {value, name} = e.target;
        setTaskForm({
            ...taskForm,
            [name]: value
        })
    }
    // adding task handler
    const handleAddTask = async (e)=>{
       e.preventDefault();
       try{
        const {data} = await axios.post('/api/task/add', {title: taskForm.title, 
        details: taskForm.details, completed: taskForm.completed, comment:[]}); // passing the data to the add handler
        enqueueSnackbar(
            'Task Has Been Added',
            {variant:'success'},
        )
       router.push('/');
       }catch(err){
            enqueueSnackbar(
                err.message,{variant:'error'}
            )
       }
       setTaskForm({
           title:'',
           details:'',
       })
    }
    return (
        <MainLayout title='Add Task'>
            <Container className={classes.formContainer}>
                <form onSubmit={handleAddTask}>
                    <TextField
                        name='title'
                        label='Task Title'
                        value={taskForm.title}
                        onChange={handleTaskChange}
                        variant='outlined'
                        fullWidth
                        style={{marginBottom: '7px'}}
                    />
                    <TextField
                        multiline
                        name='details'
                        label='Task Details'
                        value={taskForm.details}
                        variant='outlined'
                        minRows={3}
                        onChange={handleTaskChange}
                        maxRows={4}
                        style={{marginBottom: '7px'}}
                        fullWidth
                    />
                    <Button type='submit' variant='contained'>Add Task</Button>
                </form>
            </Container>
        </MainLayout>
    )
}

export default AddTask;

















