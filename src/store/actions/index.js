export {auth,recover} from './auth';
export {logout} from './logout';
export {search} from './search';
export {
    userInfo,
    unFriend,
    submitFriendRequest,
    cancleRequest,
    rejectFriendRequest,
    blockFriend,
    sendFriendRequest,
    changeProfilePic,
    changeCoverPic,

} from './mainAccount';
export {newPost} from './newPost'
export {checkAuth,signup} from './auth'
export {getPosts,getUserPosts,clearPosts} from './feeds';
export {getPostLikes,like,unLike} from './post';
export {newComment} from './comment';
export {friendsOfUser,friendOfUserclose,getConversations,fetchConv} from './friends';
export {sendMessage} from './message';