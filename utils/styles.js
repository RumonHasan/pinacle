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
            marginRight: theme.spacing(12),
        },
        customizeToolbar:{
            minHeight: 60
        },
        grow:{
            flexGrow: 1,
        },
        darkmodeBtn:{
          marginRight: theme.spacing(2),
          fontSize: 'large',
        },
        // sidebar
        sidebarContainer:{
            height:'100vh',
            width:'200px',
            background: colors.secondary,
            position: 'fixed'
        },
        // main component
        mainComponent:{
            paddingLeft:'200px',
        }
    }))

    const useSidebarStyles = makeStyles(theme=>({
        sidebarBox:{
            paddingTop:theme.spacing(2),
            '& a':{
                color:colors.mainWhite
            }
        },
        sideMenuContainer:{
            display:'flex',
            justifyContent:'center',
            paddingTop: theme.spacing(3),
        },
        menuListItem:{
            width: '200px',
            position: 'relative'
        },
        listTextContainer:{
            display:'flex',
            width:'100%',
        },
        listIcon:{
            fontSize:'large', 
            position:'absolute', 
            left:10
        }
    }));

    return{
        useLayoutStyles,
        useSidebarStyles,
    }
}

export default styleObjects;
