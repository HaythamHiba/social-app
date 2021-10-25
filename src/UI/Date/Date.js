import React from 'react';
import TextField from '@material-ui/core/TextField';
const date =props=>{
    return(
 
  <TextField
    id="date"
    label="Birthday"
    type="date"
    onChange={props.changeDate}
    
    // className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />

    );
}
export default date;