import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Upload from './Upload.js'
import {useState ,useEffect} from 'react'
import { database } from '../firebase'
import Posts from './Posts'
import Navbar from './Navbar'


function Feed() {
  const {user,logout} = useContext(AuthContext);
  const [userData,setUserData] = useState('')
  console.log("bye");
  useEffect(()=>{
    console.log("rerender")
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
        setUserData(snapshot.data())
    })
    return ()=> {unsub()}
},[user])
  return (
    <>
     <Navbar user={userData}/>
    <div  style= {{display:'flex',justifyContent:'center',alignItems:'center' ,  flexDirection:'column'}}>
      
      <div>
        <Upload user={userData}/>
      </div>
      <div>
        <Posts user={userData}/>
      </div>

      
    </div>
    </>

  )
}

export default Feed