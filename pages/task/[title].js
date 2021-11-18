import { Card, 
CardContent, 
CardHeader, 
Grid, 
Container,
Typography, 
CardActions, 
Button,
List,
ListItem} from '@material-ui/core';
import  TextField  from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react'
import MainLayout from '../../components/MainLayout';
import Task from '../../models/TaskModel';
import database from '../../utils/database';
import styleObjects from '../../utils/styles';
import { TaskContext } from '../../utils/taskManager';
import axios from 'axios';

const TaskScreen = (props) => {
    const {task} = props;
    const {useTaskStyles} = styleObjects();
    const classes = useTaskStyles();
    const {state, dispatch} = useContext(TaskContext);
    const {comment} = state; // comment change handler
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    
    const commentHandler = (e)=>{
        dispatch({type:'ADD_COMMENT', payload: e.target.value})
    }
    const addCommentHandler = async ()=>{
        try{
            await axios.post(`/api/task/${task._id}/comment`, {comment:comment}); // posting the comment to the api
            enqueueSnackbar(
                'Comment added',
                {variant:'success'}
            );
            dispatch({type:'CLEAR_COMMENT_FIELD'});
        }catch(err){    
            enqueueSnackbar(
                'Unable to add the comment',
                {variant:'error'}
            )
        }
    }
    return (
        <MainLayout title={task.title}>
            <Container className={classes.cardContainer}>
                <Card className={classes.taskCard}>
                    <CardContent>
                        <Typography variant='h4' style={{padding:'30px'}}>{task.title}</Typography>
                        <Grid container alignItems='center' style={{padding:'30px'}}>
                            <Grid item xs={12}>
                                <Typography variant='h5'>Details:</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h6'>{task.details}</Typography>
                            </Grid>
                            <Grid item sm></Grid>
                        </Grid>

                        <Grid container alignItems='center' style={{padding:'30px'}}>
                            <Grid item xs={12}>
                                <Typography variant='h5'>Comments:</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <List className={classes.commentList}>
                                {task.comment.map((comment, index)=>{
                                    return(
                                       <ListItem key={index}>
                                            <Typography>{comment}</Typography>
                                       </ListItem>
                                    )
                                })}
                                </List>
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' style={{padding:'30px'}}>
                            <Grid item xs={12}>
                                <Typography variant='h5'>Add Comments:</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    label='Enter a comment'
                                    variant='outlined'
                                    value={comment}
                                    fullWidth
                                    onChange={commentHandler}
                                />
                            </Grid>
                            <Grid item xs={12} style={{marginTop:'10px'}}>
                                <Button variant='outlined' onClick={addCommentHandler}>Add</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained'>Delete Task</Button>
                        <Button variant='contained'>Edit</Button>
                    </CardActions>
                </Card>
            </Container>
        </MainLayout>
    )
}

export default TaskScreen;

export const getServerSideProps = async(context)=>{
    await database.connect();
    const {params} = context;
    const {title} = params;
    const task = await Task.findOne({title}).lean();
    await database.disconnect();
    return{// individual task returned
        props:{
            task:database.convertDocToObj(task)
        }
    }
}
