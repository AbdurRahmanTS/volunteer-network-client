import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Header from '../Header/Header';
import { Container } from '@material-ui/core';
import VolunteerItems from '../VolunteerItems/VolunteerItems';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        margin: '20px auto',

    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        borderBottom: 'none'
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const Home = () => {
    const classes = useStyles();
    const [search, setSearch] = useState("");

    const handleInput = e => {
        setSearch(e.target.value);
    }


    return (
        <>
            <Header />
            <React.Fragment>
                <Container>
                    <h1 style={{ textTransform: 'uppercase', marginTop: '60px', textAlign: 'center' }}>I grow by helping people in need.</h1>
                    <Paper component="form" className={classes.root} id="myForm">
                        <InputBase
                            className={classes.input}
                            placeholder="Search..."
                            onChange= {handleInput}
                        />
                    </Paper>
                </Container>
            </React.Fragment>
            <VolunteerItems search = {search} />
        </>
    );
};

export default Home;