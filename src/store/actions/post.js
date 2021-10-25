import axios from "../../axios";
import * as actionTypes from "./actionTypes";

export const getPostLikesStart = () => {
  return {
    type: actionTypes.GET_POST_LIKES_START,
  };
};
export const getPostLikesSuccess = (data,postId) => {
    console.log(data.liked);
  return {
    type: actionTypes.GET_POST_LIKES_SUCCESS,
    likes: data.likes,
    liked: data.liked,
    postId:postId,
  };
};
export const getPostLikesFailed = (err) => {
  return {
    type: actionTypes.GET_POST_LIKES_FAILED,
    err: err,
  };
};
export const getPostLikes = (postId, token) => {
  const data = {
    post_id: postId,
  };
  return (dispatch) => {
    dispatch(getPostLikesStart());
    axios
      .post("/api/post/likes", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(getPostLikesSuccess(res.data,postId));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getPostLikesFailed(err));
      });
  };
};
export const like = (postId, token) => {
  const data = {
    post_id: postId,
  };
  return (dispatch) => {
    axios.post("/api/post/newLike", data, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res=>{
        console.log(res)
        dispatch(getPostLikes(postId,token))
    })
     
    .catch(err=>{
        console.log(err)
    })
  };
};
export const unLike = (postId, token) => {
    const data = {
      post_id: postId,
    };
    return (dispatch) => {
      axios.post("/api/post/unLike", data, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(dispatch(getPostLikes(postId,token)))
      .catch(err=>{
          console.log(err)
      })
    };
  };
  
