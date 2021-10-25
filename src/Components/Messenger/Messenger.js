import React,{useState,useRef} from "react";
import classes from "./Messenger.css";
import Bar from "../../UI/Bar/Bar";
import Pusher from 'pusher-js';
import { useEffect } from "react";
import Message from "../Message/Message";
import Loader from "react-loader-spinner";

import MassengerFriend from '../MassengerFriends/MassengerFriend/MassengerFriend';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
function Messenger(props) {
  const scrollRef = useRef(null);
  const[open,setOpen]=useState(false);
  const[conversationId,setConvId]=useState(0);
  const [msg,setMessage]=useState('');
  const[arrivalMessage,setArrivalMessage]=useState(null);
  const [messages, setMessages] = useState([]);

    let pusher = new Pusher( "1e567bfd239edc66230b", {
        cluster: "us3",
      });
      useEffect(() => {
        if(scrollRef.current){

          scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages,scrollRef.current]);
        useEffect(()=>{
          if(props.token){

            props.onGetConversations(props.token);
          }

        },[props.token])
        useEffect(()=>{
          if(props.convMessages){

          setMessages(props.convMessages);
          }
        },[props.convMessages])
        useEffect(()=>{
            setMessages((prev) => [...prev, arrivalMessage])
        },[arrivalMessage])
        useEffect(
          ()=>{
            console.log(conversationId)
            const channel = pusher.subscribe("message"+conversationId);
            channel.bind("App\\Events\\SendMessageEvent",data=>{
                let perId=localStorage.getItem('id');
                if(data.message.sender_id!=perId){
                  console.log(perId,data.message.sender_id);
                    setArrivalMessage({
                      text:data.message.text,
                      profilePic:data.message.profilePic,
                      id:data.message.id,
                      own:false,
                    });
              }
          })
          }
          ,[conversationId])
    let fetchMessages=(id)=>{
      setConvId(id);
      setOpen(!open);
      props.onFetchConv(props.token,id)

    }
    let newMessage=(e)=>{
      setMessage(e.target.value)
    }
    let sendMessage=()=>{
      props.onSendMessage(props.token,msg,conversationId)
      const newMessage={
        id:Math.random(),
        text:msg,
        profilePic:props.profileImage,
        own:true,
      }
     setMessages([...messages,newMessage])
      
      console.log(messages);

    }
  return (
    <React.Fragment>
      <Bar />
      <div className={classes.Messenger}>
        <div className={classes.Freinds}>
          <div className={classes.FriendWrapper}>
            <p style={{borderBottom:'1px solid grey',marginBottom:'10px'}}>Convesations</p>
            {
              props.convLoading?
              null:
              props.conversations?
              props.conversations.map(ind=>
                <MassengerFriend  
                key={ind.id}
                img={ind.pic}
                name={ind.name}
                convId={ind.id}
                clicked={()=>{fetchMessages(ind.id)}}
                />
                )
              :null
            }
              
          </div>
        </div>
        {
          open?
          <div className={classes.Messages}>
          <div className={classes.MessagesWrapper}>
            <div className={classes.MessagesTop}>
              {
                props.fetchConvLoading?
                <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
              :messages.map(ind=> 
                <div ref={scrollRef}>
                  <Message 
                key={ind.id}
                id={ind.id}
                text={ind.text}
                image={ind.profilePic}
                own={ind.own}
                />
                </div>
                
              )
              }
             
            </div>
            <div className={classes.MessagesBottom}>
                <textarea onChange={newMessage} placeholder='Write something...' className={classes.MessagesInput}>
                    </textarea>             
                    <button onClick={()=>{sendMessage()}} className={classes.MessagesSend}>Send</button>   
            </div>
          </div>
        </div>:<h1 style={{color:'#1877f2',fontWeight:'bold',textAlign:'center'}}>Start a conversation</h1>}
        <div className={classes.OnlineFreinds}>
          <div className={classes.OnlineFriendWrapper}>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
let mapStateToProps=state=>{
  return{
    token:state.auth.token,
    profileImage:state.auth.profilePic,
    conversations:state.friends.conversations,
    convLoading:state.friends.convLoading,
    convMessages:state.friends.convMessages,
    fetchConvLoading:state.friends.fetchConvLoading,
  }
}
let mapDispatchToProps=dispatch=>{
  return{
    onGetConversations:(token)=>dispatch(actions.getConversations(token)),
    onFetchConv:(token,id)=>dispatch(actions.fetchConv(token,id)),
    onSendMessage:(token,message,id)=>dispatch(actions.sendMessage(token,message,id))
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Messenger) 