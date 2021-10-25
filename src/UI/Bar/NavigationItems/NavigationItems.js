
import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import NavigationItem from './NavigationItem/NavigationItem';

const useStyle=makeStyles((theme)=>({
    sectionDesktop: {
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
          alignItems:'center',
          justifyContent:'middle',
        },
      },
}))
const navigationItems=props=>{
    const classes=useStyle();
return(
    <div className={classes.sectionDesktop}>
        <NavigationItem label='Messages' badge="4" img=""/>
        <NavigationItem label='Notifications'badge="15" img=""/>
        <NavigationItem label='Profile' img={'../../'+props.imgSrc} />

    </div>
);
}
export default navigationItems;