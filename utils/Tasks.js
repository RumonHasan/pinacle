import React from 'react';
import {
Grid,
Container,
Box,
TextField,
Button, FormControl,
RadioGroup,
FormControlLabel,
Radio, Typography,
Link,
IconButton,
Checkbox,
FormGroup
} from '@material-ui/core'
import NextLink from 'next/link';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import styleObjects from './styles';
import { MdLabelImportant, MdLabelImportantOutline } from 'react-icons/md';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';

const Tasks = ({ editStateController, taskItems,deleteTaskHandler, taskSelectHandler, importantTaskHandler}) => {
    const {useAllTaskStyles} = styleObjects();//i love u
    const classes = useAllTaskStyles();
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    const refreshData = ()=>{
        router.replace(router.asPath);
    }
    return (
        <>
    {taskItems?.map((task, index)=>{
                if(!task.completed && !task.archive)
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
                                        <IconButton onClick={()=>editStateController(task._id, task.title)}>
                                                <FaEdit/>
                                        </IconButton>   
                                        <IconButton onClick={()=>importantTaskHandler(task._id, task.important)}>
                                            {task.important ? <MdLabelImportant/> : <MdLabelImportantOutline/>}
                                        </IconButton>
                                    </Box>
                                </Container>
                        </Grid>
                    )
                })}
        </>
    )
}

export default Tasks;
