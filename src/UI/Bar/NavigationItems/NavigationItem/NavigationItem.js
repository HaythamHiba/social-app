
import React from 'react';
import {withRouter} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import j from '../../../../assets/images/Haitham.jpg';
import {  makeStyles } from '@material-ui/core/styles';
const useStyle =makeStyles((theme)=>({
  label:{
    padding:(0,4),
    fontSize:'14px',
    color:'inherit',

  },
}))
const navigationItem =props=>{
  const classes=useStyle();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleMenuClose = () => {
        setAnchorEl(null);
      };
      const handleMyAccount=()=>{
        props.history.push('/MainAccount');
        setAnchorEl(null);
      }
      const handleTimeLine=()=>{
        props.history.push('/TimeLine');
        setAnchorEl(null);
      }
      const menuId = 'primary-search-account-menu';
      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleTimeLine}>TimeLine</MenuItem>
          <MenuItem onClick={handleMyAccount}>My account</MenuItem>
        </Menu>
      );
   let messages=null;
   let notificatios=null;
   let profile=null;
   if(props.label==='Messages'){
       messages=(
        <IconButton aria-label="show new mails" color="inherit">
        <Badge badgeContent={props.badge} color="secondary">
          <MailIcon />
          <p className={classes.label} >{props.label}</p>
        </Badge>
      </IconButton>
       )
   }else if(props.label==='Notifications'){
    notificatios=(
        <IconButton aria-label="show new notifications" color="inherit">
        <Badge badgeContent={props.badge} color="secondary">
          <NotificationsIcon />
          <p className={classes.label}>{props.label}</p>
        </Badge>
      </IconButton>
    )
   }else{
    profile=(
        <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar src={j}/>
        <p className={classes.label}>{props.label}</p>
      </IconButton>
    )
   }
 
    return(
        <div>
            {messages}
            {notificatios}
            {profile}
            {renderMenu}
        </div>
    );
}
export default withRouter(navigationItem) ;
