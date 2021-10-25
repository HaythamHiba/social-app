import React,{useState} from 'react'
import classes from './ProfileSettings.css';
import Bar from '../../UI/Bar/Bar';
import SideBar from '../SideBar/SideBar';
import Modal from '../../UI/Modal/Modal';
export default function ProfileSettings() {
    const [showModal,setShowModal]=useState({show:false});
    let openModal=()=>{
        setShowModal({...showModal,
        show:!showModal.show,
        });
    }
    let modal=null;
    if(showModal.show){
        modal=(<Modal title='Enter your current password'/>)
    }
    return (
        <React.Fragment>
            <Bar/>
                <div className={classes.profileSettings} >
                    <SideBar/>
                <div className={classes.profileSettingsRight}>
                    <div className={classes.profileSettingsTop}>
                        <h3>Settings</h3>
                    </div>
                    <hr/>
                    <div className={classes.profileSettingsBottom}>
                        <div className={classes.profileSettingsOption}>
                            <span className={classes.desc}>Name</span>
                            <input className={classes.input} placeholder='Enter your new name'/>
                            <button onClick={openModal} className={classes.submit}>Submit</button>
                        </div>  
                       
                        <div className={classes.profileSettingsOption}>
                            <span className={classes.desc}>Password</span>
                            <input className={classes.input} placeholder='Enter your new password'/>
                            <button onClick={openModal} className={classes.submit}>Submit</button>
                        </div> 
                        <div className={classes.profileSettingsOption}>
                            <span className={classes.desc}>Bio</span>
                            <input className={classes.input} placeholder='Enter your new bio'/>
                            <button onClick={openModal} className={classes.submit}>Submit</button>
                        </div> 
                    </div>
                </div>
               </div>
                    {modal}
        </React.Fragment>
            )
}
