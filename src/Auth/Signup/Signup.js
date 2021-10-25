import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Icon } from "atomize";
import { NavLink } from "react-router-dom";
import Dropdown from "../../UI/Dropdown/Dropdown";
import Datee from "../../UI/Date/Date";
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";
import * as actions from '../../store/actions/index';
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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function SignUp(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    
    username: "",
    birth_date:"",
    name: "",
    city:'',
    
    town:'syria',
    
  });
  const [show,setShow]=useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onSignUp(values)
    console.log(values)
    props.history.push("/timeLine");
  };
  let handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
 
  let handlelocation=(name)=>{
    setValues({...values,city:name})
  }
  const handleClickShowPassword = () => {
    setShow(!show);
  };
  
 
  let locations = ["Damascus", "Aleppo", "Homs"];
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon name="Lock" size="20px" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange("name")}
                label="Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange("email")}
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.form} variant="outlined">
                <InputLabel  required htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={show? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {show? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={handleChange("username")}
                fullWidth
                label="User Name"
              />
            </Grid>
            <Grid item xs={12}>
              <Dropdown setName={handlelocation} location={locations} />
            </Grid>
            <Grid item xs={6}>
            <Datee  changeDate={handleChange('birth_date')}/>
            </Grid>
            <Grid item xs={6}>
            <Loader
      type="Circles" visible={props.loading?true:false} color="#1877f2"  height={70} width={70}
      />
            </Grid>
          </Grid>
          <Button
            onClick={submitHandler}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/signin" style={{ textDecoration: "none" }}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}
 let mapDispatchToProps=dispatch=>{
  return{
    onSignUp:(values)=>dispatch(actions.signup(values)),
    
  }
}
let mapStateToProps=state=>{
  return{
    loading:state.auth.loading,
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (SignUp);