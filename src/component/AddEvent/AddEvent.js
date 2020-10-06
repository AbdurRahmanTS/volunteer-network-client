import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import icon from '../../logos/Group 1329.png';
import userIcon from '../../logos/users-alt 1.png';
import plusIcon from '../../logos/plus 1.png';
import uploadIcon from '../../logos/cloud-upload-outline 1.png';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { TextareaAutosize } from '@material-ui/core';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        float: 'right',
        width: '18%',
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));



const AddEvent = () => {
    const classes = useStyles();
    const [volunteerItems, setVolunteerItems] = useState({ title: '' })
    const [selectedDate, setSelectedDate] = useState({ date: new Date() });

    const handleDateChange = (date) => {
        const newDate = { ...selectedDate };
        newDate.date = date;
        setSelectedDate(newDate);
    };

    const volunteerItem = (e) => {
        const titleValue = (e.target.value);
        const title = { title: titleValue };
        setVolunteerItems(title);
        e.preventDefault();
    }

    const addVolunteerItem = (event) => {
        const newVolunteerItem = { ...volunteerItems };
        fetch('http://localhost:5000/addVolunteerItems', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newVolunteerItem)
        })
        .then(res => res.json())
        .then(data => { })
        event.preventDefault();
    }

    return (
        <div style={{ margin: '50px' }}>
            <div style={{ width: '30%', float: 'left' }}>
                <Link to='/home'><img style={{ width: '50%' }} src={icon} alt="" /></Link>
                <div style={{ marginTop: '25px' }}>
                    <Link to='/volunteerregisterlist'>
                        <button style={{ border: 'none', backgroundColor: 'transparent' }}>
                            <img style={{ width: '8%' }} src={userIcon} alt="" />
                            <span style={{ fontSize: '30px', marginLeft: '20px' }}>Volunteer register list</span>
                        </button>
                    </Link>
                </div>
                <div style={{ marginTop: '25px' }}>
                    <button style={{ border: 'none', backgroundColor: 'transparent' }}>
                        <img style={{ width: '12%' }} src={plusIcon} alt="" />
                        <span style={{ fontSize: '30px', marginLeft: '20px' }}>Add event</span>
                    </button>
                </div>
            </div>
            <div style={{ float: 'right', width: '65%' }}>
                <h1>Add event</h1>
                <Container component="main">
                    <div className={classes.paper}>
                        <form className={classes.form} noValidate onSubmit={addVolunteerItem}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <h3>Event Title</h3>
                                    <TextField
                                        placeholder="Event Title"
                                        name="title"
                                        variant="outlined"
                                        fullWidth
                                        autoFocus
                                        onBlur={volunteerItem}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <h3 style={{ width: '100%', marginBottom: '40px' }}>Event Date</h3>
                                            <KeyboardDatePicker
                                                style={{ marginTop: '0px' }}
                                                className={classes.form}
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                value={selectedDate.date}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h3>Description</h3>
                                    <TextareaAutosize style={{ width: '100%' }} aria-label="minimum height" rowsMin={5} placeholder="Enter Designation" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h3>Banner</h3>
                                    <div className={classes.root}>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" color="primary" component="span">
                                                <img style={{ width: '20%', marginRight: '15px' }} src={uploadIcon} alt="" />
                                                Upload image
                                            </Button>
                                        </label>
                                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                    </div>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default AddEvent;