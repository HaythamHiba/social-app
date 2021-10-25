import React from 'react'
import Friends from '../Friends/Friends'
import classes from './RightBar.css';
export default function RightBar() {
    return (
        <div className={classes.rightBar}>
            <div className={classes.rightBarWrapper}>
        <h4 className={classes.rightBarTiltle}>Online Friends</h4>
           {/* <Friends online/> */}
            </div>
        </div>
    )
}
