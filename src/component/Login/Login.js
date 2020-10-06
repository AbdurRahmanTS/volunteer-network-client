import React, { useContext } from 'react';
import icon from '../../logos/Group 1329.png';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GoogleIcon from '../../logos/google.png';
import firebaseConfig from './firebaseConfig/firebase.config';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        minHeight: 300,
        backgroundColor: 'white',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {
    const classes = useStyles();
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email } = result.user;
                const loginUser = {
                    name: displayName,
                    email: email,
                }
                setLoggedinUser(loginUser);
                history.replace(from);

            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

            });
    }
    return (
        <div style={{ width: '40%', margin: 'auto', textAlign: 'center' }}>
            <div style={{ margin: '8% 22%', }}>
                <Link to="/home"><img style={{ width: '92%' }} src={icon} alt="" /></Link>
            </div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography style={{ fontWeight: 'bold', marginTop: '15%', marginBottom: '10%' }} variant="h5" component="h2">Login With</Typography>
                </CardContent>
                <CardActions style={{ padding: '0% 15%' }}>
                    <div style={{ border: '1px solid #C7C7C7', borderRadius: '30px', width: '100%' }}>
                        <img style={{ width: '35px', float: 'left', margin: '5px' }} src={GoogleIcon} alt="" />
                        <Button onClick={googleSignIn} style={{ marginTop: '4px' }}>Continue with Google</Button>
                    </div>
                </CardActions>
                <CardContent>
                    <Typography style={{ marginBottom: '15%' }} variant="body2" component="p">
                        Don’t have an account? Create an account
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;