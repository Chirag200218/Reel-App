import * as React from 'react';
import { useContext,useState } from 'react';
import insta from '../Assets/Instagram.jpg';
import bg from '../Assets/insta.png';
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Alert } from '@mui/material';
import './login.css'
import TextField from '@mui/material/TextField';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link , useHistory} from 'react-router-dom';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Image } from 'pure-react-carousel';
import { AuthContext, AuthProvider } from '../context/AuthContext';


export default function Login() {
    const store = useContext(AuthContext);
    // console.log(store);
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        card2: {
            height: '6vh',
            marginTop: '2%'
        },
        text2: {
            textAlign: 'center'
        }
    })
    
    const classes = useStyles();

    const[email,setEmail]  = useState('');
    const[password,setPassword]= useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    // const[history,setHistory] = useState('');
    const {login} = useContext(AuthContext);
    const {Reset} = useContext(AuthContext);

    const history = useHistory();
    
    const handleClick = async()=>{
        try{
            setError('');
            setLoading(true);
            let res = await login(email,password);
            setLoading(false);
            history.push('/');
        }catch(err){
            setError(err+"");
            // console.log(error);
            setTimeout(()=>{
                setError('');
                setLoading(false);
            },2000);
        }
    }
    const handleReset =()=>{
        console.log("done");
        Reset(email);    
    }

    return (
        <>
            <div className="loginWrapper">
                <div className="imgCar" style={{ backgroundImage: 'url(' + bg + ')', backgroundSize: 'cover' }}>
                    <div className='car'>
                        <CarouselProvider
                             visibleSlides={1}
                             totalSlides={5}
                             step={3}
                             naturalSlideWidth={238}
                            naturalSlideHeight={423}
                            hasMasterSpinner
                            isPlaying={true}
                            infinite={true}
                            dragEnabled={false}
                            touchEnabled={false}
                        >
                            <Slider>
                                <Slide index={0}><Image src={img1}/></Slide>
                                <Slide index={1}><Image src={img2}/></Slide>
                                <Slide index={2}><Image src={img3}/></Slide>
                                <Slide index={2}><Image src={img4}/></Slide>
                                <Slide index={2}><Image src={img5}/></Slide>
                            </Slider>
                        </CarouselProvider>
                    </div>
                </div>
                <div className="loginCard">
                    <Card variant={'outlined'}>
                        <div className="insta-logo">
                            <img src={insta} alt=""></img>
                        </div>
                        <CardContent>

                            {error!==''&&   <Alert severity="error">{error}</Alert>}
                            <TextField id="outlined-basic" label="Email" variant="outlined"  fullWidth={true} margin='dense' size='small' value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                            <TextField id="outlined-basic" label="Password" variant="outlined"  fullWidth={true} margin='dense' size='small' value={password} onChange ={(e)=>setPassword(e.target.value)}/>
                            <Typography className={classes.text2} color='primary' variant='subtitle1' style={{cursor:'pointer'}}onClick={handleReset}>
                                Forgot Password ?
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"  fullWidth={true} color='primary' variant='contained' onClick={handleClick} disabled={loading}>Login</Button>
                        </CardActions>
                    </Card>
                    <Card variant='outlined' className={classes.card2}>
                        <CardContent>
                            <Typography className={classes.text1} variant='subtitle1'>
                                Don't have an account?  <Link to="/Signup" style={{ textDecoration: 'none' }}>Sign Up</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div >
        </>
    );
}
