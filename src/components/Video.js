import React, { useEffect,useState } from 'react'
import './video.css';
import ReactDOM from 'react-dom';
import reactRouterDom from 'react-router-dom';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

function Video(props) {

    const[play,setPlay] = useState(true);

    const handleClick=(e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }

    const handleScroll =(e)=>{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
        if(next){
            next.scrollIntoView({behaviour:'smooth'});
            e.target.muted=true;
            next.muted=false;
        }else{

            setPlay(false);
            e.target.pause();
        }
    }
    const handleDoubleClick=(e)=>{
        const set = !play;
        setPlay(set);
        console.log(play)
        if(set==true){
            e.target.play();
        }else{
            e.target.pause();
        }
    }
    const handlePlay=()=>{
        setPlay(true);
    }
  return (
      <>
     {play===false?<PlayCircleFilledWhiteIcon  style={{fontsize:' xxx-large ' }} className='pause'/> : ""}
    <video src={props.src}   onPlay={handlePlay} onEnded={handleScroll} className='video-styling'  muted={true} onClick={handleClick} onDoubleClick={handleDoubleClick} id={props.id}> 

     </video>
     
     </>
  )
}

export default Video