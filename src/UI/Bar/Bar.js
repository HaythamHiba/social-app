import React from 'react';
import {useState ,useRef ,useEffect} from 'react';
import classes from './Bar.css'
import Popper from '../../Components/Popper/Popper';
import Image from '../../assets/images/Haitham.jpg';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import SearchResult from '../../Components/SerachResult/SearchResult';
 function Topbar(props) {
  let [popper,setPopper]=useState(
    {
      show:false,
      type:''}
  );
  let eleRef=useRef();
  let [searchText,setSearchText]=useState(
    {
      body:'',
    }
  );
  let gotoHomepage=(id)=>{
    console.log(id);
    
    props.history.push('/MainAccount',{id:id})
    window.location.reload()
    window.scrollTo(0, 0);
  }
  let gotoTimeline=()=>{
    props.history.push('/Timeline')
    window.location.reload()
    window.scrollTo(0, 0);
  }
  let gotoMessenger=()=>{
    props.history.push('/Messenger')
    window.location.reload()
    window.scrollTo(0, 0);
  }
  let openPopper=typee=>{
    setPopper({...popper,
     type:typee,
     show:!popper.show,
    })
  }
let searchResultShow=null;

if(props.searchResult.length>0&&searchText.body.length>0){
  let arr=[...props.searchResult];
  console.log(arr);
  searchResultShow=(
    <SearchResult gotoProfileClicked={gotoHomepage} list={arr} />
  )
}
 
  let popperShow = null;
  if(popper.show){
   popperShow=(<Popper type ={popper.type}/>) ;
  }
  useEffect(()=>{
   
    const timer=setTimeout(()=>{
    
        if(searchText.body===eleRef.current.value&&searchText.body.length>0){
          props.onSearch(props.token,searchText)
        }
   
    },1000)
    return ()=>{
      clearTimeout(timer);
    }
  },[searchText.body])
  return (
    <div className={classes.topbarContainer}>
      <div className={classes.topbarLeft}>
        <span className={classes.logo}>Social media</span>
      </div>
      <div className={classes.topbarCenter}>
        <div className={classes.searchbar}>
          <Search className={classes.searchIcon} />
          <input
            ref={eleRef}
            placeholder="Search for friend"
            className={classes.searchInput}
            onChange={(event)=>{setSearchText({...searchText,body:event.target.value})}}
          />
        </div>
      </div>
      <div className={classes.topbarRight}>
        <div className={classes.topbarLinks}>
          <span onClick={()=>{gotoHomepage(props.perId)}} className={classes.topbarLink}>Homepage</span>
          <span onClick={gotoTimeline} className={classes.topbarLink}>Timeline</span>
        </div>
        <div className={classes.topbarIcons}>
          <div onClick={()=>{openPopper('friendRequests')}} className={(popper.show&&popper.type==='friendRequests')? classes.topbarIconItemActive:classes.topbarIconItem}>
            <Person />
            <span className={classes.topbarIconBadge}>1</span>
          </div>
          <div onClick={gotoMessenger} className={classes.topbarIconItem}>
            <Chat  />

          </div>
          <div onClick={()=>{openPopper('notifications')}} className={(popper.show&&popper.type==='notifications')? classes.topbarIconItemActive:classes.topbarIconItem}>
            <Notifications />
            <span className={classes.topbarIconBadge}>1</span>
          </div>
        </div>
        <img onClick={()=>{gotoHomepage(props.perId)}} src={props.token?props.profilePic:Image} alt="" className={classes.topbarImg}/>
      </div>
      {searchResultShow}
      {popperShow}
    </div>
  );
}
let mapStateToProps=state=>{
  return{
    token:state.auth.token,
    searchResult:[...state.search.data],
    perId:state.auth.perId,
    profilePic:state.auth.profilePic,
  }
  
}
let mapDispatchToProps=dispatch=>{
  return{
    onSearch:(token,body)=>dispatch(actions.search(token,body)),
  }
}
export default connect (mapStateToProps,mapDispatchToProps) (withRouter(Topbar));