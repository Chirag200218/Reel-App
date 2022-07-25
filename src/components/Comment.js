import React, { useEffect,useState } from 'react';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar, Typography } from '@mui/material';

function Comment({post}) {
    const[comment,setComment] = useState(null);
    useEffect(async ()=>{
        let arr=[]
        for(let i=0;i<post.comments.length;i++){
            let data = await database.comments.doc(post.comments[i]).get();
            arr.push(data.data());
        }    
        setComment(arr);
        console.log(arr.length);
    },[post])
    return (
        <div>
            {
                comment==null?<CircularProgress color="secondary"/>:
                <>
                { 
                    comment.map((com,index)=>(
                      
                        <div style={{display:'flex',border:"1px solid black"}}>
                            <Avatar src={com.uProfileImg}/>
                            <p>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{com.uName}</span>&nbsp;&nbsp; {com.text}</p>
                        </div>
                    ))
                }
                </>
                
            }
        </div>
    )
}

export default Comment