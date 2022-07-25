import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom';
import {arrayRemove, deleteField, updateDoc} from "firebase/firestore"
import { database,ap,storage } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import './profile.css'
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
import Likes2 from './Likes2';
import Likes from './Likes'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import DeleteIcon from '@mui/icons-material/Delete';
import { getStorage, ref, deleteObject } from "firebase/storage";
 


function Profile() {
    const {id} =useParams();
    const[userData,setUserData] = useState(null);
    const[posts,setPost] = useState(null);
    const [open, setOpen] = useState(null);
     

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleDelete= async(id,index)=>{

        
        const desertRef = ref(storage, `/posts/${posts[index].pId}/${posts[index].fileName}`);
        console.log(desertRef);
        // console.log(`posts/${posts[index].pId}`);
         deleteObject(desertRef).then(() => {
             console.log("Delete from storage");
        }).catch((error)=>{
            console.log("Error in storage"+error);
        })
    
       let document = database.posts.doc(id);
       document.get().then(async(doc)=>{
           if(doc.exists){
               const comments = doc.data().comments;
               for(var key in comments){
                   console.log(comments[key]);
                  await database.comments.doc(comments[key]).delete();
               }
           }
       }).then(async()=>{
            await database.posts.doc(id).delete();  
            let doc =database.users.doc(userData.userId); 
             console.log(id);
            let resp = await updateDoc(doc,{
                postIds : arrayRemove(id),
            });
            console.log(resp);
       }).catch((error)=>{
        console.log("Error in delete "+ error);
       })

        
    }
    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserData(snap.data());
        })
    },[id]);

    useEffect(async()=>{
        if(userData!=null){
            console.log(userData)
            let parr=[]
            for(let i=0;i<userData.postIds.length;i++){
                let postData = await database.posts.doc(userData.postIds[i]).get();
                parr.push({...postData.data(),postId:postData.id})
            }
            setPost(parr);
        }
        
    },[userData]);
  return (
    <>
    {
      
      posts==null || userData==null ? <CircularProgress color="secondary" />:
        <>
            <div>
                
                <Navbar user={userData}/>
                <div className='spacer'></div>
                <div className='container'>
                        <div className='upper-part' style={{display:'flex'}}>
                            <div className = 'profile-img'>
                                <img src ={userData.profileUrl}/>
                            </div>
                    
                            <div className='info'>
                                    <Typography variant ='h4' style={{fontWeight:'bold'}}>
                                        {userData.fullname}
                                    </Typography>
                                    <Typography variant ='h6'>
                                        Email : {userData.email}
                                    </Typography>
                                    <Typography variant= 'h6'>
                                        Posts : {userData.postIds.length}
                                    </Typography>
                            </div>
                        </div>
                    <hr style={{marginTop: '3rem',marginLeft:'0rem'}}/>
                </div>
                
                <div className="profile-videos">
                        {
                             posts.map((post,index)=>(
                                <React.Fragment key={index}>
                                    <div>
                                        <div className="Profile_videos">
                                            
                                            <video muted="muted" onClick={()=>handleClickOpen(post.pId)}>
                                                <source src={post.purl}/>
                                            </video>
                                            
                                            <Dialog
                                                open={open==post.pId}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                fullWidth ={true}
                                                maxWidth = 'md'
                                            >
                                                <div className="modal-container">
                                                    <div className="video-cont">
                                                        <video autoPlay={true} muted="muted" controls>
                                                            <source src={post.purl}/>
                                                        </video>
                                                    </div>
                                                    <div className="comment-container">
                                                        <Card className="card1" style={{padding:'1rem'}}>
                                                            <Comment post={post}/>
                                                        </Card>
                                                        <Card variant="outlined" className="card2">
                                                            <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                                                            <div style={{display:'flex'}}>
                                                                <Likes2 post={post} user={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                                                <AddComent style={{display:'flex',alignItems:'center',justifyContent:'center'}} user={userData} post={post}/>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </div>
                                            </Dialog>
                                        </div>
                                        <div>
                                            <Button size="small" color='secondary' fullWidth={true} variant="outlined" onClick={()=>handleDelete(userData.postIds[index],index)} margin='dense' startIcon={<DeleteIcon/>}>Delete</Button>
                                        </div>
                                    </div>
                                   
                                </React.Fragment>
                            ))
                        }
                    </div>
            </div>
        </>
     }

    </>
  )
}

export default Profile