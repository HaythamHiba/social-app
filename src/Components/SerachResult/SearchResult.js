import React from 'react'
import classes from './SearchResult.css';
import Friends from '../Friends/Friends';
export default function SearchResult(props) {
    return (
        <div className={classes.SearchResult}>
            <div className={classes.SearchResultWrapper}>
        <Friends gotoProfile={props.gotoProfileClicked} list={props.list}/>

      </div>
        </div>
    )
}
