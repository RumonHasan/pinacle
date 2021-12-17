import React, { useState, useContext } from 'react';
import MainLayout from '../components/MainLayout';
import { TextField,
Button, 
Container,
Box,
Dialog,
DialogTitle,
DialogContent} from '@material-ui/core';
import styleObjects from '../utils/styles';
import { useSnackbar } from 'notistack';
import database from '../utils/database';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import {TaskContext} from '../utils/taskManager';
import { HexColorPicker } from 'react-colorful';
import { MdFormatColorFill } from 'react-icons/md';

 const AddTask = () => {
    const {state,dispatch} = useContext(TaskContext);
    const {userInfo} = state;
    const {useAddTaskStyles} = styleObjects();
    const classes = useAddTaskStyles();
    const router = useRouter();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    // add task
    const [taskForm, setTaskForm] = useState({
        title:'',
        details:'',
        completed:false,
        archive:false
    });
    // image state: still in progress
    const [images, setImages] = useState([{
        title:'',
        imageUrl: '',
    }]);
    // color picker
    const [color, setColor] = useState('#ffffff');
    const [showColor, setShowColor] = useState(false);

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
        details: taskForm.details, completed: taskForm.completed, archive: taskForm.archive, comment:[], images:[], taskBorder: color},
        {
            // passing on the headers userToken
            headers: {
                authorization: `Bearer ${userInfo.userToken}`
            }
        }); // passing the data to the add handler
        enqueueSnackbar(
            'Task Has Been Added',
            {variant:'success'},
        )
       router.push('/allTasks');
       }catch{
           enqueueSnackbar('Task already exists', {variant:'error'})
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

                    <Button variant='outlined' onClick={()=>setShowColor(true)} style={{height:'40px', marginRight:'10px', color:color}}>
                        <MdFormatColorFill style={{fontSize:25}}/>
                    </Button>
                    <Button type='submit' variant='contained'>Add Task</Button>

                    <Dialog
                    open={showColor}
                    onClose={()=>setShowColor(false)}>
                        <DialogTitle>
                            Highlight your task!
                        </DialogTitle>
                        <DialogContent dividers>
                            <Box style={{display:'flex', justifyContent:'center'}}>
                                <HexColorPicker color={color} onChange={setColor}/>
                            </Box>
                        </DialogContent>
                    </Dialog>

                </form>
            </Container>
        </MainLayout>
    )
}

export default AddTask;

















