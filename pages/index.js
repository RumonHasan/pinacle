import { Grid, Typography } from "@material-ui/core";
import React from "react";
import dynamic from "next/dynamic";
// components
import MainLayout from "../components/MainLayout";

const HomeTaskPage = ()=> {
  return (
    <MainLayout title='Create Task'>
        <Grid>
          Hi
        </Grid>
    </MainLayout>
  )
}

export default dynamic(()=>Promise.resolve(HomeTaskPage), {ssr:false})
