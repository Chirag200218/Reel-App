import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './post.css'

function Likes2({user,post}) {
    const [like,setLike] = useState(null);
    useEffect(()=>{
        let check = post.likes.includes(user.userId)?true:false;
        setLike(check);
    },[post])

    const handleLike=(e)=>{
        if(like){
            let narr = post.likes.filter((el)=>el!=user.userId);
            database.posts.doc(post.postId).update({
                likes:narr    
            })
        }else{
            let narr=[...post.likes,user.userId];
            database.posts.doc(post.postId).update({
                likes:narr    
            })
        }
    }
  return (
    <div>
        {
            like!=null?
            <>
            {
                like==true?<FavoriteIcon style={{padding:'1rem',paddingTop:'0.5rem'}} className={`like`} onClick={handleLike}/>:<FavoriteIcon style={{padding:'1rem',paddingTop:'0.5rem'}} className={`unlike2`} onClick={handleLike}/>
            }
            </>:
            <></>
        }
    </div>
  )
}

export default Likes2