import { Container, 
Typography, 
Grid, 
FormControl, 
FormControlLabel, 
FormLabel, 
RadioGroup,Radio, Link, IconButton, Icon, Box, Dialog, DialogTitle, Divider, DialogActions, Button, DialogContent } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React,{useContext, useEffect, useState} from 'react'
import MainLayout from '../components/MainLayout';
import Task from '../models/TaskModel';
import database from '../utils/database';
import styleObjects from '../utils/styles';
import NextLink from 'next/link';
import {BiDetail} from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { TaskContext } from '../utils/taskManager';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AllTasks = (props) => {
    const {state, dispatch} = useContext(TaskContext)
    const {tasks} = props;
    const {searchValue,delete:{deleteBox, deleteId, deleteTitle}} = state;
    const {useAllTaskStyles} = styleObjects();
    const classes = useAllTaskStyles();
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();
    console.log(searchValue);

    // passing task length
    useEffect(()=>{
        dispatch({type:'TOTAL_TASKS', payload: tasks.length})
    },[dispatch, tasks]);

    // delete
    const deleteTaskHandler = (id, title)=>{
        dispatch({type:'OPEN_DELETE_BOX', payload:{id, title}})
    }
    const handleDeleteClose = ()=>{
      dispatch({type:'CLOSE_DELETE_BOX'})
    }
    const clientSideDelete = ()=>{
        const filteredItems = taskItems.filter(task=> task._id !== deleteId);
        setTaskItems(filteredItems);
    }

    const deleteTask = async ()=>{ 
        try{
            const {data} = await axios.post('api/modifyTask/delete', {id: deleteId});
            handleDeleteClose();
            enqueueSnackbar('Task has been deleted',
                {variant:'success'}
            )
            
        }catch(err){
            enqueueSnackbar(
                'Unable to delete task',
                {variant:'error'}
            )
        }
    }
    
    return (
        <MainLayout>
            <Dialog
            open={deleteBox}
            onClose={handleDeleteClose}
            >
                <DialogTitle>
                    {deleteTitle} will be permanently deleted!
                </DialogTitle>
                <DialogContent dividers>
                    <Typography>You will not be able to undo this action!</Typography>
                </DialogContent>
                <DialogActions style={{display:'flex', justifyContent:'center'}}>
                    <Button variant='contained' onClick={handleDeleteClose}>Cancel</Button>
                    <Button variant='contained' onClick={deleteTask}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Container className={classes.container}>
                    <Typography className={classes.title}>All Tasks</Typography>
                    <Grid container alignItems='center' className={classes.tasksGrid}>
                    {tasks.map((task, index)=>{
                        return (
                            <Grid item xs={12} key={index} className={classes.taskBlock}>
                                    <Container className={classes.taskContainer}>
                                        <FormControl component='fieldset'>
                                            <RadioGroup
                                            aria-label={task.title}
                                            defaultValue=''
                                            name={task.title}>
                                                <FormControlLabel className={classes.taskTitle} 
                                                value={task.title} 
                                                control={<Radio/>} 
                                                label={task.title}/>
                                            </RadioGroup>
                                        </FormControl>
                                        <Box className={classes.taskBtn}>
                                            <NextLink href={`/task/${task.title}`} passHref>
                                                <Link>
                                                    <IconButton>
                                                        <BiDetail/>
                                                    </IconButton>
                                                </Link>
                                            </NextLink>
                                            <IconButton onClick={()=>deleteTaskHandler(task._id, task.title)}>
                                                <FaTrash/>
                                            </IconButton>
                                        </Box>
                                    </Container>
                            </Grid>
                        )
                    })}
                    </Grid>
                    <Typography className={classes.title}>Completed</Typography>
            </Container>
        </MainLayout>
    )
}
export default AllTasks;

// serverside task render;
export const getServerSideProps = async ()=> {
    await database.connect();
    const tasks = await Task.find({}).lean();
    await database.disconnect();
    return{
        props:{
            tasks: tasks.map(database.convertDocToObj)
        }
    }
}
