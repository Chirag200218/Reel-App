import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import { database } from '../firebase';

function AddComent({user,post}) {
    const[text,setText] = useState('');

    const handleClick=()=>{
        let obj={
            text:text,
            uProfileImg:user.profileUrl,
            uName:user.fullname

        }
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(post.postId).update({
              comments:[...post.comments,doc.id]  
            })
        })
        setText('');
    }
  return (
    <div style={{width:'100%'}}>
        <TextField id="outlined-basic" label="Comment" variant="outlined" size='small' sx={{width:'70%'}} value={text} onChange={(e)=>setText(e.target.value)}/>
        <Button variant="contained" onClick={handleClick}>Post</Button>
    </div>
  )
}

export default AddComent