import React, { useState,useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from '@material-ui/core/InputLabel';
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Icon } from "atomize";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index';
import Loader from 'react-loader-spinner';
const useStyles = makeStyles((theme) => ({
  paper: {
     marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loader:{
    textAlign:"center",
  },
  bottom:{
    display:'flex',
    alignItems:'center'
  }
}));

 function SignIn(props) {
  const [values, setValues] = useState({
    email:"",
    password: "",
    showPassword: false,
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
 
  };
  let errorText=null;
  let submitHandler =(event)=>{
  event.preventDefault();
  console.log(values);
  props.onsubmitSignin(values.email,values.password); 
  
     
  }
  const classes = useStyles();
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
   useEffect(()=>{
    if(props.token&&!props.err){
      props.history.push('/timeLine');
    }
   },[props.token])
   if(!props.loading&&props.err){
    errorText=(<p style={{color:'red',textAlign:'center'}}>{props.error}</p>)
   }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon name="Lock" size="20px" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorText}
        <form  className={classes.form} noValidate>
        <FormControl className={classes.form} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-email">Email Address</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type={'text'}
            value={values.email}
            onChange={handleChange('email')}
            labelWidth={100}
          />
          </FormControl>
          <FormControl className={classes.form} variant="outlined">

           <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}

            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          <Grid className={classes.loader} item xs={12}>
            <Loader  type="Circles" visible={props.loading?true:false} color="#1877f2"  height={70} width={70}/>
          </Grid>
        </FormControl>          
          <Button
            fullWidth
             onClick={submitHandler}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid className={classes.bottom} container>
            <Grid item xs>
             <p style={{color:'#1877f2',cursor:'pointer'}} onClick={()=>{props.onRecoverPassword(values.email)}}>
               Forgot password ?
             </p>
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
              <NavLink
                to="signup"
                style={{
                  textDecoration: "none",
                  color:'#1877f2'
                }}
              >
                Don't have an account? Sign Up
              </NavLink>
            </Grid>
          </Grid>
          </form>
      </div>
    
    </Container>
  );
}
const mapDispatchToProps=dispatch=>{
  return{
    onsubmitSignin:(email,password)=>dispatch(actions.auth(email,password)),
    onRecoverPassword:(email)=>dispatch(actions.recover(email)),
  };
}
const mapStateToProps=state=>{
  return{
    loading:state.auth.loading,
    token:state.auth.token,
    error:state.auth.error,
    err:state.auth.err,
  };
}
export default connect (mapStateToProps,mapDispatchToProps) (SignIn);