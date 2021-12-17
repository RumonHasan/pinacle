import React, {useContext, useEffect, useState} from 'react';
import MainLayout from '../components/MainLayout';
import { TaskContext } from '../utils/taskManager';
import styleObjects from '../utils/styles';
import { Container, Grid, Typography, Box, IconButton, Link, Dialog, DialogActions, DialogContent, 
DialogTitle, Button } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { FaTimes, FaCheck, FaTrash } from 'react-icons/fa';
import { BsArchiveFill } from 'react-icons/bs';
import NextLink from 'next/link';
import { Router } from 'next/dist/client/router';
import { useRouter } from 'next/dist/client/router';

const Archive = () => {
    const {state, dispatch} = useContext(TaskContext);
    const {userInfo, delete:{deleteBox, deleteId, deleteTitle}} = state;
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    const [archivedTasks, setArchivedTasks] = useState([]);
    // styles
    const {useAllTaskStyles} = styleObjects();
    const classes = useAllTaskStyles();

    // data refresh
    const refreshData = ()=>{//paku
        router.replace(router.asPath);
    }


    // delete handlers
            // delete

            const deleteTaskHandler = (id, title)=>{
                dispatch({type:'OPEN_DELETE_BOX', payload:{id, title}})
            }
            const handleDeleteClose = ()=>{
              dispatch({type:'CLOSE_DELETE_BOX'})
            }
        
        
            // client side delete
            const deleteTaskClient = (deleteId)=>{
                const newItems = taskItems.filter((task)=>{
                    return task._id !== deleteId
                });
                setTaskItems(newItems);
            }
        
            const deleteTask = async ()=>{ 
                try{
                    const {data} = await axios.post('api/task/delete', {id: deleteId});
                    handleDeleteClose();
                    enqueueSnackbar('Task has been deleted',
                        {variant:'success'}
                    );
                    deleteTaskClient(deleteId);
                    refreshData();
                }catch(err){
                    enqueueSnackbar(
                        'Unable to delete task',
                        {variant:'error'}
                    )
                }
            }

    // task select handlers
            // task select handler
            const taskSelectHandler = async (taskId)=>{
                try{
                    const {data} = await axios.post(`/api/task/${taskId}/taskComplete`);
                    refreshData();
                    enqueueSnackbar('Task put back in your inbox', {variant:'success'});
                    router.push('/allTasks');
                }catch{
                    enqueueSnackbar('unable to complete task', {variant:'error'})
                }
            }

    // fetch archive data
    useEffect(()=>{
        if(userInfo){
            const fetchArchives = async ()=>{
                try{
                    const {data} = await axios.post('/api/task/userTasks', {userId:userInfo._id});
                    getArchivedTasks(data).then((archive)=>setArchivedTasks(archive));
                }catch{ 
                    enqueueSnackbar('unable to fetch the tasks', {variant:'error'})
                }
            }
            fetchArchives();
        }else{
            Router.push('/login');
        }
    },[]);
    // filter out the archive tasks
    const getArchivedTasks = (tasks)=> new Promise((resolve, reject)=>{
        if(tasks){
            const archives = tasks?.filter((task)=> task.archive === true && task.completed);
            resolve(archives);
        }else{
            reject('Unable to find the archived tasks');
        }
    });

    useEffect(()=>{
        dispatch({type:'ADD_TO_ARCHIVE', payload: archivedTasks.length});
    },[]);

    return (
        <MainLayout title='Archives'>
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
                <Typography className={classes.title}>Archived Tasks</Typography>
                <Grid container alignItems='center' className={classes.tasksGrid}>
                    {archivedTasks?.map((task, index)=>{
                        return(
                            <Grid item xs={12} key={index} className={classes.taskBlock}>
                                <Container className={classes.taskContainer}>   
                                        <Box display='flex' justifyContent='center' alignItems='center' className={task.completed ? classes.checkTask : classes.uncheckTask}>           
                                                <IconButton onClick={()=> taskSelectHandler(task._id)}>
                                                    {task.completed ? <FaTimes/> :<FaCheck/>}
                                                </IconButton>
                                                <Typography>{task.title}</Typography>
                                        </Box>
                                            
                                    <Typography className={classes.taskTimestamp}>
                                        {task.createdAt.toString()}
                                    </Typography>
                                    <Box className={classes.taskBtn}>
                                        <NextLink href={`/task/${task.title}`} passHref>
                                            <Link>
                                                <Box display='flex'>
                                                    <Typography>View Details</Typography>
                                                </Box>
                                            </Link>
                                        </NextLink>
                                        <IconButton onClick={()=>deleteTaskHandler(task._id, task.title)}>
                                            <FaTrash/>
                                        </IconButton>
                                        <IconButton onClick={()=>changeArchiveState(task._id, task.archive)}>
                                                <BsArchiveFill/>
                                        </IconButton>   
                                    </Box>
                                </Container>
                        </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </MainLayout>
    )
};

export default Archive;
