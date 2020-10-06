import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Container } from '@material-ui/core';
import icon from '../../logos/Group 1329.png';
import './Header.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    width: '15%',
  },
  title: {
    flexGrow: 1,
    color: 'black',
  },
}));


const Header = () => {
  const classes = useStyles();
  const [loggedinUser, setLoggedinUser] = useContext(UserContext);
  return (
    <React.Fragment>
      <Container>
        <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: 'white' }}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Link to='/home'><img style={{ width: '90%' }} src={icon} alt="logo" /></Link>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <ul className={'menu'}>
                  <Link to='/home'><li>Home</li></Link>
                  <Link><li>Donation</li></Link>
                  <Link to='/events'><li>Events</li></Link>
                  <Link><li>Blog</li></Link>
                </ul>
              </Typography>
              {
                loggedinUser.email ? (
                  <h3 style={{ color: 'black' }}>{loggedinUser.name}</h3>
                ) : (
                    <Button variant="contained" color="primary">Register</Button>
                  )
              }
              <Link to='/volunteerregisterlist'>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#434141',
                    color: 'white',
                    marginLeft: '10px',
                  }}
                >
                  Admin
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Header;