import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './post.css'

function Likes({user,post}) {
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
                like==true?<FavoriteIcon className={`icon-styling like`} onClick={handleLike}/>:<FavoriteIcon className={`icon-styling unlike`} onClick={handleLike}/>
            }
            </>:
            <></>
        }
    </div>
  )
}

export default Likes