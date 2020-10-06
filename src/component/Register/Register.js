import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import icon from '../../logos/Group 1329.png';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '30%',
        margin: 'auto',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        textTransform: 'none',
    },
}));

const Register = () => {
    const classes = useStyles();
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const volunteerName = useParams();
    const [volunteerItem, setVolunteerItem] = useState([])
    const [selectedDate, setSelectedDate] = useState({ date: new Date() });

    useEffect(() => {
        fetch('https://fast-citadel-35366.herokuapp.com/volunteerItems')
        .then(res => res.json())
        .then(data => {
            const volunteerItem = data.find(item => item.title === volunteerName.volunteerName)
            setVolunteerItem(volunteerItem)
        })
    }, [])

    const handleDateChange = (date) => {
        const newDate = { ...selectedDate };
        newDate.date = date;
        setSelectedDate(newDate);
    };

    const hendelSubmit = (event) => {
        const newRegister = { ...loggedinUser, ...selectedDate, ...volunteerItem };
        console.log(newRegister);
        fetch('https://fast-citadel-35366.herokuapp.com/addRegisterInfo', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newRegister)
        })
        .then(res => res.json())
        .then(data => { })
        event.preventDefault();
    }

    return (
        <div style={{ width: '100%', margin: 'auto', textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ margin: '5% 15%', }}>
                <Link to='/home'><img style={{ width: '30%' }} src={icon} alt="" /></Link>
            </div>
            <div className={classes.paper} style={{ border: '1px solid #ABABAB', padding: '3em' }}>
                <Typography component="h1" variant="h5">Register as a Volunteer</Typography>
                <form className={classes.form} noValidate onSubmit={hendelSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.form}
                                id="standard-basic"
                                label="Full Name"
                                value={loggedinUser.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.form}
                                id="standard-basic"
                                label="Email"
                                value={loggedinUser.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        className={classes.form}
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date"
                                        value={selectedDate.date}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.form}
                                id="standard-basic"
                                label="Desicription"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.form}
                                id="standard-basic"
                                value={volunteerItem.title}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        value="submit"
                    >
                        Registration
                        </Button>
                    <Link to='/events' style={{ textDecoration: 'none' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Events
                        </Button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;