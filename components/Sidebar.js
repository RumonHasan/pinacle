import React, { useContext, useState } from 'react';
import { TextField, 
Box, 
InputBase, 
Container,
List,
ListItem, 
Link,
Typography,
IconButton,
Card,
Badge,
Button,
Dialog,
DialogTitle,
DialogContent} from '@material-ui/core';
import { TaskContext } from '../utils/taskManager';
import styleObjects from '../utils/styles';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { FaHome } from 'react-icons/fa';
import {GrNotes} from 'react-icons/gr';
import {BsArchiveFill} from 'react-icons/bs';
import {MdNotificationImportant} from 'react-icons/md';
import {IoMdCreate} from 'react-icons/io';
import { FaCalendar, FaPlus, FaTimes } from 'react-icons/fa';
import { useRouter, Controller } from 'next/dist/client/router';

const Sidebar = () => {
    const {state, dispatch} = useContext(TaskContext);
    const {taskLength, searchValue, userInfo} = state;
    const {useSidebarStyles} = styleObjects();
    const classes = useSidebarStyles();
    const router = useRouter();

    // handle search
    const handleSearch = (e)=>{
        dispatch({type:'UPDATE_SEARCH_VALUE', payload:e.target.value});
        router.push('/allTasks');
    }

    return (
        <Box display='flex' className={classes.sidebarBox} justifyContent='center' flexDirection='column'>
            <TextField
                label='Search Task'
                value={searchValue}
                onChange={handleSearch}
                variant='outlined'
                size='small'
            />
            <Container className={classes.sideMenuContainer}>
                <List>
                    <ListItem className={classes.menuListItem}>
                        <Container className={classes.listTextContainer}>
                            <IoMdCreate style={{fontSize:'large', position:'absolute', left:10}}/>
                            <NextLink href='/' passHref>
                                <Link>
                                    <Typography>Create</Typography>
                                </Link>
                            </NextLink>
                        </Container>
                    </ListItem>

                        <ListItem className={classes.menuListItem}>
                        <Container className={classes.listTextContainer}>
                            <FaHome className={classes.listIcon}/>
                            <NextLink href='/allTasks' passHref>
                                <Link>
                                    <Typography>All Tasks</Typography>
                                </Link>
                            </NextLink>
                        </Container>
                        <Badge badgeContent={taskLength}></Badge>
                    </ListItem>
                    
       

                    <ListItem className={classes.menuListItem}>
                        <Container className={classes.listTextContainer}>
                            <GrNotes className={classes.listIcon}/>
                            <NextLink href='/notes' passHref>
                                <Link >
                                    <Typography>Notes</Typography>
                                </Link>
                            </NextLink>
                        </Container>
                        <Badge badgeContent={2}></Badge>
                    </ListItem>

                    <ListItem className={classes.menuListItem}>
                        <Container className={classes.listTextContainer}>
                            <BsArchiveFill className={classes.listIcon}/>
                            <NextLink href='/archive' passHref>
                                <Link>
                                    <Typography>Archive</Typography>
                                </Link>
                            </NextLink>
                        </Container>
                        <Badge badgeContent={2}></Badge>
                    </ListItem>

                    <ListItem className={classes.menuListItem}>
                        <Container className={classes.listTextContainer}>
                            <FaCalendar className={classes.listIcon}/>
                            <NextLink href='/calander' passHref>
                                <Link>
                                    <Typography>Calander</Typography>
                                </Link>
                            </NextLink>
                        </Container>
                    </ListItem>
                </List>
            </Container>

            <Container className={classes.newTaskContainerBtn}>
                <NextLink href={userInfo ? '/addTask': '/login'} passHref>
                    <Button variant='outlined' style={{whiteSpace:'nowrap'}}>
                        <FaPlus/> Add A New Task
                    </Button>
                </NextLink>
            </Container>  
        </Box>
    )
}

export default dynamic(()=>Promise.resolve(Sidebar), {ssr:false});
