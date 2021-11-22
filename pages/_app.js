import { SnackbarProvider } from 'notistack';
import React from 'react'
import '../styles/globals.css';
import { TaskProvider } from '../utils/taskManager';
import {FormProvider} from 'react-hook-form';

function MyApp({ Component, pageProps }) {
  React.useEffect(()=>{ // rmeoving server side rendering of material ui elements
    const jssStyles = document.querySelector('#jss-server-side');
    if(jssStyles){
      jssStyles.parentElement.removeChild(jssStyles);
    }
  },[])
  return (
  <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal:'center'}}>
    <FormProvider>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </FormProvider>
  </SnackbarProvider>
  );
}

export default MyApp