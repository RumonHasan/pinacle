import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { TextField,
Button, 
Container} from '@material-ui/core';
import styleObjects from '../utils/styles';
import { useSnackbar } from 'notistack';
import database from '../utils/database';
import axios from 'axios';

 const AddTask = () => {
    const {useAddTaskStyles} = styleObjects();
    const classes = useAddTaskStyles();
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
    const handleAddTask = async (e)=>{
       e.preventDefault();
       try{
       const {data} = await axios.post('/api/addTask', {...taskForm});
       }catch(err){
            enqueueSnackbar(
                err.message,{variant:'error'}
            )
       }
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

















