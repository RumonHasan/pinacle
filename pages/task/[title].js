import { Card, 
CardContent, 
CardHeader, 
Grid, 
Container,
Typography, 
CardActions, 
Button,
List,
ListItem,
Box,
IconButton,
Dialog,
DialogActions,
DialogContent,
DialogTitle,
Badge, 
LinearProgress} from '@material-ui/core';
import  TextField  from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react'
import MainLayout from '../../components/MainLayout';
import Task from '../../models/TaskModel';
import database from '../../utils/database';
import styleObjects from '../../utils/styles';
import { TaskContext } from '../../utils/taskManager';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/dist/client/router';

const TaskScreen = (props) => {
    const router = useRouter();
    const {task, comments} = props;
    const {useTaskStyles} = styleObjects();
    const classes = useTaskStyles();
    const {state, dispatch} = useContext(TaskContext);
    const {delete:{deleteBox, deleteId, deleteTitle}} = state;
    const {comment} = state; // comment change handler
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    
    const commentHandler = (e)=>{
        dispatch({type:'ADD_COMMENT', payload: e.target.value})
    }
    // refreshing data
    const refreshData = ()=>{
        router.replace(router.asPath);
    }
    const addCommentHandler = async ()=>{
        try{
            await axios.post(`/api/task/${task._id}/comment`, {comment:comment}); // posting the comment to the api
            enqueueSnackbar(
                'Comment added',
                {variant:'success'}
            );
            dispatch({type:'CLEAR_COMMENT_FIELD'});
            refreshData();
        }catch(err){    
            enqueueSnackbar(
                'Unable to add the comment',
                {variant:'error'}
            )
        }
    }

    // delete task
        // delete
        const deleteTaskHandler = (id, title)=>{
            dispatch({type:'OPEN_DELETE_BOX', payload:{id, title}})
        }
        const handleDeleteClose = ()=>{
          dispatch({type:'CLOSE_DELETE_BOX'})
        }
    
        const deleteTask = async ()=>{ 
            try{
                const {data} = await axios.post('/api/task/delete', {id: deleteId});
                handleDeleteClose();
                enqueueSnackbar('Task has been deleted',
                    {variant:'success'}
                );
                router.push('/allTasks');
            }catch(err){
                enqueueSnackbar(
                    'Unable to delete task',
                    {variant:'error'}
                )
            }
        }

    // delete comment
    const deleteComment = async (commentId)=>{
        try{    
            // comment deletion id passed
            const {data} = await axios.post(`/api/task/${task._id}/deleteComment`, {commentId:commentId});
            enqueueSnackbar('Comment has been deleted',{
                variant:'success',
            });
            refreshData();
        }catch(err){
            enqueueSnackbar(
                'Unable to delete Comment',
                {variant:'error'}
            )
        }
    }

    return (
        <MainLayout title={task.title}>
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
            <Container className={classes.cardContainer}>
                <Card className={classes.taskCard}>
                    <CardContent>
                        <Typography variant='h4' style={{padding:'30px'}}>{task.title}</Typography>
                        <Grid container alignItems='center' style={{padding:'30px'}}>
                            <Grid item xs={12}>
                                <Typography variant='h5'>Details:</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.detailsBlock}>
                                <Typography variant='h6' style={{fontSize:'19px'}}>{task.details}</Typography>
                            </Grid>
                            <Grid item sm></Grid>
                        </Grid>

                        <Grid container alignItems='center' style={{padding:'30px'}}>
                            <Grid item xs={12}>
                                <Typography variant='h5'>Attachments:</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' style={{padding:'30px'}}>
                            <Grid item xs={12}>
                                <Badge badgeContent={comments ? comments.length: 0} color='primary'>
                                    <Typography variant='h5'>Comments:</Typography>
                                </Badge>
                            </Grid>
                            <Grid item xs={12}>
                                <List className={classes.commentList}>
                                { comments.length !== 0 ? comments?.map((commentItem, index)=>{
                                    return(
                                       <ListItem className={classes.comment} key={index}>
                                            <Typography>{commentItem.comment}</Typography>
                                            <Typography className={classes.commentTimestamp}>{commentItem.createdAt.split('')}</Typography>
                                            <Box display='flex'>
                                                <IconButton onClick={()=>deleteComment(commentItem._id)}><FaTrash/></IconButton>
                                            </Box>
                                       </ListItem>
                                    )
                                }): 
                                <Typography className={classes.noComment}>No comments yet</Typography>}
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
                        <Button variant='contained' onClick={()=>deleteTaskHandler(task._id,task.title)}>Delete Task</Button>
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
            task:JSON.parse(JSON.stringify(task)),
            comments:task.comment?.map(database.convertDocToObj)
        }
    }
}
