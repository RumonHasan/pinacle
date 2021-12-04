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
    DialogContent, LinearProgress, TextField } from '@material-ui/core';
    import { useRouter } from 'next/dist/client/router';
    import React,{useContext, useEffect, useState} from 'react'
    import MainLayout from '../components/MainLayout';
    import styleObjects from '../utils/styles';
    import NextLink from 'next/link';
    import {BiDetail} from 'react-icons/bi';
    import { FaTrash, FaEdit } from 'react-icons/fa';
    import { TaskContext } from '../utils/taskManager';
    import axios from 'axios';
    import { useSnackbar } from 'notistack';
    import dynamic from 'next/dynamic';
    import Cookies from 'js-cookie';
    
    const AllTasks = () => {
        const {state, dispatch} = useContext(TaskContext)
        const [taskItems, setTaskItems] = useState([]); // task state for client side
        const {searchValue,delete:{deleteBox, deleteId, deleteTitle}, userInfo, edit:{editState, editId, editValue}} = state;
        const {useAllTaskStyles} = styleObjects();//i love u
        const classes = useAllTaskStyles();
        const router = useRouter();
        const {enqueueSnackbar} = useSnackbar();
        const [isLoading, setLoading] = useState(false);
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
                        setTaskItems(data);
                        Cookies.set('userTasks', data);
                        dispatch({type:'TOTAL_TASKS', payload: data.length});
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

        },[])
    
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
        const editIdHandler = (editId) => {
            const existTask = taskItems.map((task)=> task._id === editId);
            if(existTask){
                dispatch({type:'EDIT_ON'});
            }
        }
        const titleEditHandler = (editValue)=>{

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
                {isLoading ? <LinearProgress/> :
                    <Container className={classes.container}>
                        <Typography className={classes.title}>All Tasks</Typography>
                        <Grid container alignItems='center' className={classes.tasksGrid}>
                        {userInfo ? taskItems?.map((task, index)=>{
                            return (
                                <Grid item xs={12} key={index} className={classes.taskBlock}>
                                        <Container className={classes.taskContainer}>   
                                                <Box display='flex'>           
                                                    {editState ? <><TextField
                                                        id='editValue'
                                                        variant='outlined'
                                                        label={task.title}
                                                        onChange={titleEditHandler}
                                                        value={editValue}
                                                    />
                                                    <Button variant='contained' onClick={()=>dispatch({type:'EDIT_OFF'})}>
                                                        <FaEdit/>
                                                    </Button>
                                                    </>
                                                    :
                                                    <Box onClick={()=>editIdHandler(task._id)}>
                                                        <FormControl component='fieldset'> 
                                                            <RadioGroup
                                                            aria-label={task.title}
                                                            defaultValue=''
                                                            name={task.title}>
                                                                <FormControlLabel className={classes.taskTitle} 
                                                                    value={task.title} 
                                                                    control={<Radio/>} 
                                                                    label={task.title} 
                                                                    />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Box>
                                                    }
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
                                            </Box>
                                        </Container>
                                </Grid>
                            )
                        }) :
                        <NextLink href='/login' passHref>
                            <Link>
                                <Typography variant='h6' style={{opacity:0.7, color: 'white'}}>
                                    Login to view your tasks
                                </Typography>
                            </Link>
                        </NextLink>}
                        </Grid>
                        <Typography className={classes.title}>Completed</Typography>
                </Container>
                }
                
            </MainLayout>
        )
    }

 export default dynamic(()=> Promise.resolve(AllTasks), {ssr:false});
    