import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import Video from './Video';
import Likes from './Likes';
import Likes2 from './Likes2';
import './post.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AddComent from './AddComent';
import Comment from './Comment';

function Posts(props) {
    console.log(props.user);
    
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub
    }, [])

    
   
    const callBack=(entries)=>{
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[1];
            
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause();
                } 
            })
        })
    }
    let observer = new IntersectionObserver(callBack,{threshold:0.7});
    useEffect(()=>{
        const elements = document.querySelectorAll(".videos");
        elements.forEach((element)=>{
            observer.observe(element);
        })
        return()=>{
            observer.disconnect();
        }
    },[posts])
    return (
        <div>
            {
                posts == null || props.user == null ? <CircularProgress color="secondary" /> :
                    <div className="video-container">
                        {
                            posts.map((post, index) => (
                                <React.Fragment key={index}>
                                    <div className='videos'>
                                        <Video src={post.purl} />
                                        <div className='like-com'>
                                            <Likes user={props.user} post={post} />
                                            <div>
                                            <ChatBubbleOutlinedIcon className='chat-styling' onClick={(e) => handleClickOpen(post.pId)} />
                                            </div>
                                        </div>
                                        <div className='fa' style={{ display: 'flex' }}>
                                            <Avatar src={props.user.profileUrl} />
                                            <h4>{props.user.fullname}</h4>
                                        </div>
                                        <Dialog
                                            open={open == post.pId}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                            maxWidth='md'
                                        >
                                            <div className='modal-container'>
                                                <div className='video-cont'>
                                                    
                                                    <video autoPlay={true} muted='muted' controls>
                                                        <source src={post.purl}/>
                                                    </video>
                                                </div>
                                                <div className='comment-container'>
                                                    <Card className='card1'>
                                                       
                                                        <Comment post={post}/>
                                                         
                                                       
                                                    </Card>
                                                    <Card variant='outlined' className='card2'>
                                                        <Typography style={{padding:'0.4rem'}}>
                                                            {post.likes.length==0?'':`Likes by ${post.likes.length} users`}
                                                        </Typography>
                                                            <div style={{display:'flex'}}>
                                                                <Likes2 user={props.user} post={post} style={{display:'flex',alignItems:'center',justifyContent:'center'}} />
                                                                <AddComent  user={props.user} post={post}style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                                            </div>
                                                    
                                                     
                                                       
                                                    </Card>
                                                </div>

                                            </div>
                                        </Dialog>

                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Posts