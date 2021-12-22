import { Container, 
    Typography, 
    Grid, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    RadioGroup,
    Radio, 
    Link, 
    IconButton, 
    Icon, 
    Box, 
    Dialog, 
    DialogTitle, 
    Divider, 
    DialogActions, 
    Button, 
    DialogContent, LinearProgress, TextField, FormGroup, Checkbox, Badge } from '@material-ui/core';
    import { useRouter } from 'next/dist/client/router';
    import React,{useContext, useEffect, useState} from 'react'
    import MainLayout from '../components/MainLayout';
    import styleObjects from '../utils/styles';
    import NextLink from 'next/link';
    import {BsArchiveFill} from 'react-icons/bs';
    import { FaTrash, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';
    import { TaskContext } from '../utils/taskManager';
    import axios from 'axios';
    import { useSnackbar } from 'notistack';
    import dynamic from 'next/dynamic';
    import Cookies from 'js-cookie';
import Tasks from '../utils/Tasks';
import DrawerComp from '../utils/Drawer';
import { MdLabelImportant, MdLabelImportantOutline } from 'react-icons/md';
    
    const AllTasks = () => {
        const {state, dispatch} = useContext(TaskContext)
        const [taskItems, setTaskItems] = useState([]); // task state for client side
        const {searchValue,delete:{deleteBox, deleteId, deleteTitle}, userInfo} = state;
        const {useAllTaskStyles} = styleObjects();//i love u
        const classes = useAllTaskStyles();
        const router = useRouter();
        const {enqueueSnackbar} = useSnackbar();
        const [isLoading, setLoading] = useState(false);
        // edit states
        const [isEditing, setIsEditing] = useState(false);
        const [editId, setEditId] = useState('');
        const [editValue, setEditValue] = useState('');
        // data refresh
        const refreshData = ()=>{//paku
            router.replace(router.asPath);
        }

        // fetching the data
        useEffect(()=>{
            setLoading(true);
            if(userInfo){
                const fetchTasks = async ()=>{
                    try{
                        const {data} = await axios.post('/api/task/userTasks', {userId:userInfo._id});
                        fetchNotArchivedTasks(data).then((tasks)=>setTaskItems(tasks));
                        Cookies.set('userTasks', data);
                        setLoading(false);
                    }catch(err){
                        enqueueSnackbar('Tasks have not been fetched',{variant:'error'})
                    }
                };
                fetchTasks();
            }else{
                enqueueSnackbar('Login to load your tasks',
                {variant:'error'})
            }

        },[]);

        const fetchNotArchivedTasks = (tasks)=> new Promise((resolve, reject)=>{
            if(tasks){
                const nonArchivedTasks = tasks?.filter((task)=> task.archive === false);
                resolve(nonArchivedTasks);
                dispatch({type:'TOTAL_TASKS', payload: nonArchivedTasks.length});
            }else{
                reject('unable to find tasks');
            }
        })
    
        // search function
        const userTasks = Cookies.get('userTasks') ?
        JSON.parse(Cookies.get('userTasks')): [];
        useEffect(()=>{
            const fetchSearchTask = ()=>{
                if(searchValue){
                    const filterTasks = taskItems.filter((task)=>
                    task.title.toLowerCase().includes(searchValue));
                    setTaskItems(filterTasks);
                }else{
                   setTaskItems(userTasks);
                }
            }
            fetchSearchTask();
        },[searchValue]);


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

        // task edit handler
        const editStateController = (editId, title)=>{
            taskItems.find((task)=>{
                if(task._id === editId){
                    setIsEditing(true);
                    setEditId(editId);
                    setEditValue(title);
                }
            })
        }

        const editHandler = async () => {
            try{
                const {data} = await axios.post(`/api/task/${editId}/update`, {newValue: editValue});
                refreshData();
                clientTaskUpdate(); // updating the data on the client side 
                setIsEditing(false); // closing edit field
                enqueueSnackbar('Item has been updated', {variant:'success'})
            }catch(err){
               enqueueSnackbar('Unable to edit title', 
               {variant:'error'})
            }
        }
        // updating the data on the client side 
        const clientTaskUpdate = ()=>{
            setTaskItems(prevTasks => {
                const existTask = prevTasks.find(task => task._id === editId);
                if(existTask){
                    return prevTasks.map(task =>
                        task._id === editId ? {...task, title: editValue} : task)
                };
            }
        )
        }
        // task select handler
        const taskSelectHandler = async (taskId, taskState)=>{
            try{
                const {data} = await axios.post(`/api/task/${taskId}/taskComplete`, {taskState:taskState});
                refreshData();
                clientTaskStateHandler(taskId, taskState);
            }catch{
                enqueueSnackbar('unable to complete task', {variant:'error'})
            }
        }

        // task client state switch
        const clientTaskStateHandler = (taskId, taskState)=>{
            setTaskItems(prevTasks=>{
                const existTask = prevTasks.find(task=> task._id === taskId);
                if(existTask){
                    return prevTasks.map((task)=>
                    task._id === taskId ? {...task, completed:!taskState}: task)
                };
            })
        }

        // change archive state
        const changeArchiveState = async (taskId, archiveStatus)=>{
            try{
                const {data} = await axios.post(`/api/task/${taskId}/archiveState`, {taskId:taskId});
                refreshData();
                router.push('/archive');
                enqueueSnackbar('Task has been added to the archives', {variant:'success'});
            }catch{
                enqueueSnackbar('Failed to archive the task', {variant:'error'})
            }
        }

        // important task handler
        const importantTaskHandler = async (taskId, taskImportant)=>{
            try{
                const {data} = await axios.post(`/api/task/${taskId}/updateImportant`, {taskId:taskId});
                refreshData();
                clientImportantUpdate(taskId, taskImportant);
            }catch{
                enqueueSnackbar('Unable to highlight', {variant:'error'})
            }
        }
        // client side update
        const clientImportantUpdate = (taskId, taskImportant)=>{
            setTaskItems(prevTasks => {
                const findTask = prevTasks.find((task)=>task._id === taskId);
                if(findTask){
                    return prevTasks.map((task)=>
                    task._id === taskId ? {...task, important:!taskImportant}: task)
                }
            })
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
                        
                        <DrawerComp
                            editHandler={editHandler}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            setEditValue={setEditValue}
                            editValue={editValue}
                        />
                       
                        <Grid container alignItems='center' className={classes.tasksGrid}>
                            {userInfo ? <Tasks
                                editStateController={editStateController}
                                taskItems={taskItems}
                                deleteTaskHandler={deleteTaskHandler}
                                taskSelectHandler={taskSelectHandler}
                                importantTaskHandler={importantTaskHandler}
                            /> :
                            <NextLink href='/login' passHref>
                                <Link>
                                    <Typography variant='h6' style={{opacity:0.7, color: 'white'}}>
                                        Login to view your tasks
                                    </Typography>
                                </Link>
                            </NextLink>}
                        </Grid>

                        <Typography className={classes.title}>Completed</Typography>
                        <Grid container alignItems='center' className={classes.tasksGrid}>
                        {taskItems?.map((task, index)=>{
                            if(task.completed && !task.archive){
                            return (
                            <Grid item xs={12} key={index} className={classes.taskBlock} style={{border:`2px solid ${task.taskBorder}`}}>
                                <Container className={classes.taskContainer}>   
                                        <Box display='flex' justifyContent='center' alignItems='center' className={task.completed ? classes.checkTask : classes.uncheckTask}>           
                                                <IconButton onClick={()=> taskSelectHandler(task._id, task.completed)}>
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
                    )}
                })}
                            
                        </Grid>

                </Container>
                
            </MainLayout>
        )
    }

 export default dynamic(()=> Promise.resolve(AllTasks), {ssr:false});
    