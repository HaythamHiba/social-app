import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    '&:focus': {
        outline: 'none',
      }
  },
 
  paper: {
      
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "20px",
    padding: theme.spacing(2, 4, 3),
    '&:focus': {
        outline: 'none',
      }
  },
  input:{
    
        border: "none",
        borderBottom:'1px solid grey',
        width: "80%",
        textAlign:'center',
        marginRight:'5px',
        '&:focus':{
            outline:'none',
        }
        
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Modal
     
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade style={{ border: "none" }} in={open}>
          <div className={classes.paper}>
            <h2   style={{ fontWeight: "300" ,textAlign:'center'}}> {props.title} </h2>
          <div style={{display:"flex"}} >
          <input
             className={classes.input}
            
           />
           <button
        style={{ 
            border: "none",
            cursor:'pointer',
            borderRadius:'20px',
            backgroundColor:'grey',
            textAlign:'center'

       }}
        
        >Submit</button>
          </div>
          
          </div>
        </Fade>
        
      </Modal>
    </div>
  );
}
