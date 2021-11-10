import { Container, 
Typography, 
Grid, 
FormControl, 
FormControlLabel, 
FormLabel, 
RadioGroup,Radio, Link, IconButton } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React from 'react'
import MainLayout from '../components/MainLayout';
import Task from '../models/TaskModel';
import database from '../utils/database';
import styleObjects from '../utils/styles';
import NextLink from 'next/link';
import {BiDetail} from 'react-icons/bi';

const AllTasks = (props) => {
    const {tasks} = props;
    const {useAllTaskStyles} = styleObjects();
    const classes = useAllTaskStyles();
    const router = useRouter();
    // task details
    const taskDetailsHandler = ()=>{

    }
    
    return (
        <MainLayout>
            <Container className={classes.container}>
                    <Typography className={classes.title}>All Tasks</Typography>
                    <Grid container alignItems='center'>
                    {tasks.map((task)=>{
                        return (
                            <Grid item xs={12} key={task.id} className={classes.taskBlock}
                            onClick={taskDetailsHandler}>
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
                                        <NextLink href={`/task/${task.title}`} passHref>
                                            <Link>
                                                <IconButton>
                                                    <BiDetail/>
                                                </IconButton>
                                            </Link>
                                        </NextLink>
                                    </Container>
                            </Grid>
                        )
                    })}
                    </Grid>
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
