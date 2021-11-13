import { Container, 
Typography, 
Grid, 
FormControl, 
FormControlLabel, 
FormLabel, 
RadioGroup,Radio, Link, IconButton, Icon } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React from 'react'
import MainLayout from '../components/MainLayout';
import Task from '../models/TaskModel';
import database from '../utils/database';
import styleObjects from '../utils/styles';
import NextLink from 'next/link';
import {BiDetail} from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';

const AllTasks = (props) => {
    const {tasks} = props;
    const {useAllTaskStyles} = styleObjects();
    const classes = useAllTaskStyles();
    const router = useRouter();
    
    return (
        <MainLayout>
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
                                        <Container className={classes.taskBtn}>
                                            <NextLink href={`/task/${task.title}`} passHref>
                                                <Link>
                                                    <IconButton>
                                                        <BiDetail/>
                                                    </IconButton>
                                                </Link>
                                            </NextLink>
                                            <IconButton>
                                                <FaTrash/>
                                            </IconButton>
                                        </Container>
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
