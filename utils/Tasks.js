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
IconButton
} from '@material-ui/core'
import NextLink from 'next/link';
import { FaTrash, FaEdit } from 'react-icons/fa';
import styleObjects from './styles';

const Tasks = ({ editStateController, taskItems,deleteTaskHandler}) => {
    const {useAllTaskStyles} = styleObjects();//i love u
    const classes = useAllTaskStyles();
    return (
        <>
    {taskItems?.map((task, index)=>{
                    return (
                        <Grid item xs={12} key={index} className={classes.taskBlock}>
                                <Container className={classes.taskContainer}>   
                                        <Box display='flex'>           
                                            <Box onClick={()=>editStateController(task._id)}>
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
                })}
        </>
    )
}

export default Tasks;
