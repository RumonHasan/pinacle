import React, { useContext } from 'react';
import { TextField, 
Box, 
InputBase, 
Container,
List,
ListItem, 
Link,
Typography,
IconButton,
Card} from '@material-ui/core';
import { TaskContext } from '../utils/taskManager';
import styleObjects from '../utils/styles';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { FaHome } from 'react-icons/fa';
import {GrNotes} from 'react-icons/gr';
import {MdNotificationImportant} from 'react-icons/md';
import {IoMdCreate} from 'react-icons/io';

const Sidebar = () => {
    const {state, dispatch} = useContext(TaskContext);
    const {searchValue} = state;
    const {useSidebarStyles} = styleObjects();
    const classes = useSidebarStyles();
    // search
    const handleSearch = (e)=>{
        dispatch({type:'UPDATE_SEARCH_VALUE', payload: e.target.value});
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
                        <NextLink href='/' passHref>
                            <Link>
                                <Typography>Create</Typography>
                            </Link>
                        </NextLink>
                        <IoMdCreate style={{fontSize:'large'}}/>
                    </ListItem>

                    <ListItem className={classes.menuListItem}>
                        <NextLink href='/allTasks' passHref>
                            <Link>
                                <Typography>All Tasks</Typography>
                            </Link>
                        </NextLink>
                        <FaHome style={{fontSize:'large'}}/>
                    </ListItem>

                    <ListItem className={classes.menuListItem}>
                        <NextLink href='/notes' passHref>
                            <Link>
                                <Typography>Notes</Typography>
                            </Link>
                        </NextLink>
                        <GrNotes style={{fontSize:'large'}}/>
                    </ListItem>

                    <ListItem className={classes.menuListItem}>
                        <NextLink href='/notes' passHref>
                            <Link>
                                <Typography>Important</Typography>
                            </Link>
                        </NextLink>
                        <MdNotificationImportant style={{fontSize:'large'}}/>
                    </ListItem>
                </List>
            </Container>
        </Box>
    )
}

export default dynamic(()=>Promise.resolve(Sidebar), {ssr:false});
