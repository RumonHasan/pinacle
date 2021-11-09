import { makeStyles } from "@material-ui/core";
import colors from "./colors";
const styleObjects = ()=>{

    const useLayoutStyles = makeStyles(theme=>({
        appbar:{
            background: colors.secondary,
            '& a':{
                color:colors.textMain,
            }
        },
        title:{
            fontSize: 'x-large',
            color:colors.textMain,
        },
        customizeToolbar:{
            minHeight: 50
        },
        grow:{
            flexGrow: 1,
        },
        darkmodeBtn:{
          width: theme.spacing(1),
          marginRight:theme.spacing(2),
          fontSize: 'large',
        },
        // sidebar
        sidebarContainer:{
            height:'100vh',
            width:'200px',
            background: colors.secondary,
            position: 'fixed'
        }
    }))

    return{
        useLayoutStyles,
    }
}

export default styleObjects;
