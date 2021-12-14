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

const Tasks = ({ editStateController, taskItems,deleteTaskHandler, taskSelectHandler}) => {
    const {useAllTaskStyles} = styleObjects();//i love u
    const classes = useAllTaskStyles();
    return (
        <>
    {taskItems?.map((task, index)=>{
                    return (
                        <Grid item xs={12} key={index} className={classes.taskBlock}>
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
                                    </Box>
                                </Container>
                        </Grid>
                    )
                })}
        </>
    )
}

export default Tasks;
