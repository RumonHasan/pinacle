import { Grid, Typography, Box } from "@material-ui/core";
import React from "react";
import dynamic from "next/dynamic";
import styleObjects from "../utils/styles";
// components
import MainLayout from "../components/MainLayout";

const HomeTaskPage = ()=> {
  const {useCreateStyles} = styleObjects();
  const classes = useCreateStyles();
  return (
    <MainLayout title='Create Task'>
      <Box display='flex' justifyContent='center' alignItems='center' className={classes.createBox}>
        <Grid alignItems='center' container className={classes.createGrid}>
          
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default dynamic(()=>Promise.resolve(HomeTaskPage), {ssr:false})
