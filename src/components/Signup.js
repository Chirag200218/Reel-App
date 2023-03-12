import * as React from 'react';
import { database, storage } from '../firebase';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Alert } from '@mui/material';
import './signup.css'
import TextField from '@mui/material/TextField';
import insta from '../Assets/Instagram.jpg';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ContactSupportOutlined } from '@material-ui/icons';

export default function Signup() {
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        card2: {
            height: '6vh',
            marginTop: '2%'
        }
    })
    const classes = useStyles();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { signup } = useContext(AuthContext);

    const handleClick = async() => {
        if (file == null) {
            setError("Please Upload profile Image");
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        try {
            setError('');
            setLoading(true)
            let userObj = await signup(email, password);
            
            let uid = userObj.user.uid;
            
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            console.log(file);
            uploadTask.on('state_Changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                let progresss = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`upload is ${progresss} done`);
            }
            function fn2(error) {
                setError( error);
                setTimeout(() => {
                    setError('');
                }, 2000);
                setLoading(false);
                return;
            }
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log("In database");
                    console.log(url);
                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        fullname:name,
                        profileUrl: url,
                        createdAt:database.getTimeStamp(),
                        postIds:[],
                    })
                })
                setLoading(false);
                history.push("/");
            } 
        }catch (err) {
            setError(err+"");
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }
    return (
        <div className="signupWrapper">
            <div className="signupCard">
                <Card variant={'outlined'}>
                    <div className="insta-logo">
                        <img src={insta} alt=""></img>
                    </div>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitled1">
                            Sign up to see photos and videos from your friends
                        </Typography>
                        {error !== '' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size='small' value={email} onChange={(e) => setemail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size='small' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' size='small' value={name} onChange={(e) => setName(e.target.value)} />
                         
                        <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component="label">
                    Upload Profile Image
                    <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}/>
                    </Button>
                    </CardContent>
                    <CardActions>
                        <Button size="small" fullWidth={true} color='primary' variant='contained' disabled={loading} onClick={handleClick}>Sign Up</Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={classes.text1} variant='subtitle1'>
                            By Signing up,you are agree to our term, conditions and cookies policy.
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant='outlined' className={classes.card2}>
                    <CardContent>
                        <Typography className={classes.text1} variant='subtitle1'>
                            Having a account? <Link to="/Login" style={{ textDecoration: 'none' }}>Login</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
}
