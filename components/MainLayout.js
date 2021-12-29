import React,{useContext, useState} from 'react';
import {
AppBar,
Toolbar,
createTheme,
ThemeProvider,
CssBaseline,
Container,
Link,
Typography,
Switch,
Button,
Avatar,
Box,
TextField,
IconButton,
Drawer,
List,
ListItem,
ListSubheader,
Popover,
Dialog,
DialogTitle,
Input
} from '@material-ui/core';
import {CgDarkMode} from 'react-icons/cg';
import {FaSearch} from 'react-icons/fa';
import Head from 'next/head';
import { TaskContext } from '../utils/taskManager';
import colors from '../utils/colors';
import NextLink from 'next/link';
import styleObjects from '../utils/styles';
import Cookies from 'js-cookie';
import Sidebar from './Sidebar';
import {AiFillSetting} from 'react-icons/ai';
import {MdInvertColors} from 'react-icons/md';
import {BiLogOut} from 'react-icons/bi';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { useSnackbar } from 'notistack';
import { GoogleLogout } from 'react-google-login';
import { HexColorPicker } from 'react-colorful';
import axios from 'axios';

const MainLayout = ({children, title}) => {
    const {state, dispatch} = useContext(TaskContext);
    const {userInfo, userTheme} = state;
    const {useLayoutStyles} = styleObjects();
    const classes = useLayoutStyles();
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();
    // login pop
    const [loginPop, setLoginPop] = useState(false);
    const handleLoginPopOpen = (e)=>{
        setLoginPop(true);
    };
    const handleClosePop = ()=>{
        setLoginPop(false);
    }

    //client id
    const clientId = '963986818059-jg6cmm0ge7p9k9jk7gid9304p92773f0.apps.googleusercontent.com';

    // drawer anchor
    const [anchorDrawer, setAnchorDrawer] = useState(false);
    const closeDrawer = ()=>{
        setAnchorDrawer(false)
    };
    const openDrawer = ()=>{
        setAnchorDrawer(true);
    }

    // hex color picker
    const [color, setColor] = useState(colors.main);
    const [colorDialogOpen, setColorDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const getImageUrl = (imageFile) => new Promise((resolve, reject)=>{
        if(imageFile){
            const reader = new FileReader();
            reader.onload= (e) =>{
                resolve(e.target.result);
            }
            reader.readAsDataURL(imageFile);
        }
    })
    console.log(imageUrl);

    const handleWallpaper = (e)=>{
        const imageFile = e.target.files[0];
        if(imageFile && imageFile.type.substr(0,5) === 'image'){
            getImageUrl(imageFile).then((data)=> setImageUrl(data));
        }else{
            setImageUrl('');
    }
    }

    const closeColorDialog = ()=>{
        setColorDialogOpen(false);
        closeDrawer();
    }

    const dispatchTheme = async ()=>{
        console.log(userInfo._id);
        try{
            const {data} = await axios.post(`/api/user/${userInfo._id}/updateThemes`, {colorTheme: color, image: imageUrl});
            dispatch({type:'UPDATE_USER_THEME', payload: data.theme});
            console.log(data);
            Cookies.set('userTheme', color);
            setColorDialogOpen(false);
            closeDrawer();
        }catch(err){
            enqueueSnackbar(`Unable to update the theme: ${err}`, {variant:'error'})
        }
    }
    
    // custom theme
    const customTheme = createTheme({
        palette:{
            type: 'dark'
        },
        primary:{
            main: userTheme
        },
        secondary:{
            main: colors.secondary
        }
    })

    // logout handler
    const logoutHandler = ()=>{
        dispatch({type:'LOGOUT_USER'});
        router.push('/');
        Cookies.remove('userInfo');
        enqueueSnackbar('Logged out successfully',
        {variant:'success'});
        handleClosePop();
    }

    return (
        <div>
            <Head>
                <title>
                    {title ? `Pinacle-${title}` : 'Pinacle'}
                </title>
                <meta name='description' content='Welcome to the best task manager'/>
            </Head>
            <ThemeProvider theme={customTheme}>
                <CssBaseline/>
                <AppBar position='static' className={classes.appbar}>
                    <Toolbar className={classes.customizeToolbar}>
                        <NextLink href='/' passHref>
                            <Link>
                                <Typography className={classes.title}>{title ? title: 'Pinacle'}</Typography>
                            </Link>
                        </NextLink>

                        <div className={classes.grow}></div>
                        
                        {/* <Button shape='round' variant='outlined' onClick={darkmodeChangeHandler} className={classes.darkmodeBtn}>
                            <CgDarkMode/>
                        </Button> */}

                            <Avatar style={{cursor:'pointer'}} 
                                onClick={handleLoginPopOpen}
                                src={userInfo ? userInfo.imageUrl : ''}>
                            </Avatar>
                            <Dialog
                                open={loginPop}
                                onClose={handleClosePop}>
                                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' className={classes.loginBox}>
                                    <Typography>{userInfo ? userInfo.name: 'Sign in to your account!'}</Typography>
                                    <Container className={classes.loginContainer}>
                                        {userInfo === null ? 
                                        <><NextLink href='/login' passHref>
                                            <Link>
                                                <Button variant='contained' className={classes.loginBtn}>
                                                    Login
                                                </Button>
                                            </Link>
                                        </NextLink>
                                        <NextLink href='/register' passHref>
                                            <Link>
                                                <Button variant='contained' className={classes.loginBtn}>
                                                    Register
                                                </Button>
                                            </Link>
                                        </NextLink></>
                                        :
                                        <GoogleLogout
                                            clientId={clientId}
                                            render={(renderProps)=>(
                                            <Button onClick={renderProps.onClick} variant='contained' className={classes.loginBtn}>
                                                Logout<BiLogOut/>
                                            </Button>
                                            )}
                                            onLogoutSuccess={logoutHandler}
                                        />
                                        }
                                    </Container>
                                </Box>
                            </Dialog>
                        
                        <IconButton onClick={openDrawer} className={classes.settingsBtn}>
                            <AiFillSetting/>
                        </IconButton>

                        <Drawer
                        anchor={'right'}
                        open={anchorDrawer}
                        onClose={closeDrawer}
                        className={classes.drawer}>
                            <List>
                                <ListSubheader style={{borderBottom: `1px solid ${colors.titleMain}`}}>
                                    <Typography style={{paddingBottom:'10px'}}>Settings</Typography>
                                </ListSubheader>
                                <List className={classes.drawerList}>
                                    <ListItem className={classes.drawerItems}>
                                        <MdInvertColors/>
                                        <Button onClick={()=>setColorDialogOpen(true)}>
                                            <Typography>Appearance</Typography>
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.drawerItems}>
                                        <BiLogOut/>
                                        <Button>
                                             Logout
                                        </Button>
                                    </ListItem>
                                </List>
                            </List>
                        </Drawer>

                    </Toolbar>
                </AppBar>

                <Dialog
                open={colorDialogOpen}
                onClose={closeColorDialog}>
                    <DialogTitle>
                        Choose your theme!
                    </DialogTitle>
                    <Box display='flex' justifyContent='center' alignItems='center' style={{width:'350px'}}>
                        <Container style={{padding:'10px'}}>
                            <HexColorPicker onChange={setColor} color={color}/>
                        </Container>
                        <Button onClick={dispatchTheme} variant='contained' style={{width:100, height:40, margin:20}}>Select</Button>
                    </Box>
                    <Input type='file' accept='image/*' onChange={handleWallpaper} id='contained-button-file'/>
                </Dialog>

                <Box display='flex' className={classes.mainContentBlock}>
                    <Container className={classes.sidebarContainer}>
                        <Sidebar/>
                    </Container>
                    <Container className={classes.mainComponent} style={{backgroundImage: imageUrl ? `url${imageUrl}`: undefined,
                    backgroundSize:'cover'}}>
                        {children}
                    </Container>
                </Box>

            </ThemeProvider>
        </div>
    )
}

export default MainLayout;

