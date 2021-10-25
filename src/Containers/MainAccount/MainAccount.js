import SideBar from "../../Components/SideBar/SideBar";
import Feeds from "../../Components/Feeds/Feeds";
import RightBar from "../../Components/RightBar/RightBar";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Bar from "../../UI/Bar/Bar";
import { connect } from "react-redux";
import classes from "./MainAccount.css";

import EditIcon from "@material-ui/icons/Edit";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router";
import Loader from "react-loader-spinner";
function Profile(props) {
  let profileImg = useRef();
  let coverImg = useRef();
  let changeProfilePic = () => {
    profileImg.current.click();
  };
  let changeCoverPic = () => {
    coverImg.current.click();
  };
  const [displayButton, setDisplayButton] = useState({
    block: false,
    add: false,
    unfriend: false,
    reject: false,
    submit: false,
    cancle: false,
  });
  const [editPhoto, setEditPhoto] = useState(false);

  const getData = async () => {
    console.log(props.token,props.location.state.id);
    await props.setUserInfo(props.token, props.location.state.id);
    console.log(props.userInfo);
  };
  useEffect(() => {
    if (props.userInfo) {
      if (props.userInfo.relation === "no_relation") {
        setDisplayButton({
          ...displayButton,
          block: true,
          add: true,
          unfriend: false,
          reject: false,
          submit: false,
          cancle: false,
        });
      } else if (props.userInfo.relation === "friends") {
        setDisplayButton({
          ...displayButton,
          block: true,
          add: false,
          unfriend: true,
          reject: false,
          submit: false,
          cancle: false,
        });
      } else if (props.userInfo.relation === "requested") {
        console.log(props.perId)
        if (props.userInfo.sender_id == props.perId) {
         
          setDisplayButton({
            ...displayButton,
            block: true,
            add: false,
            reject: false,
            unfriend: false,
            submit: false,
            cancle: true,
          });
        } else {
          setDisplayButton({
            ...displayButton,
            block: true,
            add: false,
            reject: true,
            submit: true,
            cancle: false,
            unfriend: false,
          });
        }
      } else {
        setDisplayButton({
          block: false,
          add: false,
          reject: false,
          submit: false,
          cancle: false,
          unfriend: false,
        });
      }
      console.log(props.perId, props.location.state.id);

      console.log(props.userInfo);
    }
    if(props.perId==props.location.state.id){  
          
      setEditPhoto(true);
      setDisplayButton({
        ...displayButton,
        add:false,
        unfriend:false,
        block:false,
        reject:false, 
        submit:false,
        cancle:false,
      });
    }
  }, [props.userInfo]);
  console.log(displayButton);
  useEffect(() => {
    if (props.token) {
      console.log(props.token);
      getData();
    }
  }, [props.token]);
  let profileIcon = null;
  let coverIcon = null;
  if (editPhoto) {
    profileIcon = (
      <EditIcon onClick={changeProfilePic} className={classes.EditProfileIcon} />
    );
    coverIcon = (
      <EditIcon onClick={changeCoverPic} className={classes.EditCoverIcon} />
    );
  }
  let userProInfo = null;
  if (props.loading) {
    userProInfo = (
      <Loader
        type="Circles"
        visible={props.loading ? true : false}
        color="#1877f2"
        height={70}
        width={70}
      />
    );
  } else {
    userProInfo = (
      <div className={classes.profileRightTop}>
        <div className={classes.profileCover}>
          <img
            className={classes.profileCoverImg}
            src={props.userInfo.cover_pic}
            alt=""
          ></img>
          {coverIcon}
          <input ref={profileImg} onChange={(event)=>{props.onChangeProfilePic(props.token,event.target.files[0])}} style={{ display: "none" }} type="file" />
          <input ref={coverImg} onChange={(event)=>{props.onChangeCoverPic(props.token,event.target.files[0])}} style={{ display: "none" }} type="file" />
          <div className={classes.profileContainer}>
            <img
              className={classes.profileUserImg}
              src={props.userInfo.profile_pic}
              alt=""
            />
            {profileIcon}

            <button
              onClick={() => {
                props.onFriendRequest(props.token, props.userInfo.id);
              }}
              className={
                displayButton.add ? classes.addFriendButton : classes.none
              }
            >
              Add
            </button>
            <button
              onClick={() => {
                props.onUnFriend(props.token, props.userInfo.id);
              }}
              className={
                displayButton.unfriend ? classes.addFriendButton : classes.none
              }
            >
              unFriend
            </button>
            <button
              onClick={() => {
                props.onSubmitFriendRequest(props.token, props.userInfo.id);
              }}
              className={
                displayButton.submit ? classes.addFriendButton : classes.none
              }
            >
              submit
            </button>
            <button
              onClick={() => {
                props.onCancleRequest(props.token, props.userInfo.id);
              }}
              className={
                displayButton.cancle ? classes.addFriendButton : classes.none
              }
            >
              cancle
            </button>
            <button
              onClick={() => {
                props.onRejectFriendRequest(props.token, props.userInfo.id);
              }}
              className={
                displayButton.reject ? classes.rejectFriendButton : classes.none
              }
            >
              reject
            </button>
            <button
              onClick={() => {
                props.onblockFriend(props.token, props.userInfo.id);
              }}
              className={
                displayButton.block ? classes.BlockButton : classes.none
              }
            >
              Block
            </button>
          </div>
        </div>
        <div className={classes.profileInfo}>
          <div className={classes.profileInfoo}>
            <h4 className={classes.profileInfoName}>{props.userInfo.name}</h4>
          </div>
          <div className={classes.profileInfoo}>
            <span className={classes.profileInfoDesc}>
              laugh with many don't trust any
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Bar />

      <div className={classes.profile}>
        <SideBar
          logoutClicked={() => {
            
            props.history.push("/Signin");
            props.onlogout(props.token);
            props.onClearPosts();

            
          }}
        />
        <div className={classes.profileRight}>
          {userProInfo}
          <div className={classes.profileRightBottom}>
            <Feeds profile id={props.location.state.id} />

            <RightBar profile />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
let mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    perId: state.auth.perId,
    userInfo: state.mainAccount.userInfo,
    loading: state.mainAccount.loading,
    text:state.mainAccount.text,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    onlogout: (token) => dispatch(actions.logout(token)),
    setUserInfo: (token, id) => dispatch(actions.userInfo(token, id)),
    onFriendRequest: (token, id) =>
      dispatch(actions.sendFriendRequest(token, id)),
    onblockFriend: (token, id) => dispatch(actions.blockFriend(token, id)),
    onRejectFriendRequest: (token, id) =>
      dispatch(actions.rejectFriendRequest(token, id)),
    onCancleRequest: (token, id) => dispatch(actions.cancleRequest(token, id)),
    onSubmitFriendRequest: (token, id) =>
      dispatch(actions.submitFriendRequest(token, id)),
    onUnFriend: (token, id) => dispatch(actions.unFriend(token, id)),
    onChangeCoverPic:(token,image)=>dispatch(actions.changeCoverPic(token,image)),
    onChangeProfilePic:(token,image)=>dispatch(actions.changeProfilePic(token,image)),
    onClearPosts:()=>dispatch(actions.clearPosts()),

    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
