import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, Container, Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Header from '../Header/Header';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    title: {
        height: 60,
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 200,
    },
});



const Events = () => {
    const classes = useStyles();
    const [registerInfo, setRegisterInfo] = useState([])

    useEffect(() => {
        fetch('https://fast-citadel-35366.herokuapp.com/registerInfo')
        .then(res => res.json())
        .then(data => setRegisterInfo(data))
    }, [])

    function cancelRegister(id) {
        fetch(`https://fast-citadel-35366.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            if (result) {
                fetch('https://fast-citadel-35366.herokuapp.com/registerInfo')
                    .then(res => res.json())
                    .then(data => setRegisterInfo(data))
            }
        })
    }

    return (
        <>
            <Header />
            <React.Fragment>
                <Container style={{ marginTop: '70px' }}>
                    <Grid container spacing={3}>
                        {
                            registerInfo.map(data => (
                                <Grid key={data._id} item xs={6}>
                                    <CardActionArea component="a" href="#" style={{ width: '500px' }} >
                                        <Card className={classes.card} style={{ height: '245px', width: '500px' }}>
                                            <Hidden xsDown>
                                                <CardMedia className={classes.cardMedia} image={data.img} title={data.imageTitle} />
                                            </Hidden>
                                            <div className={classes.cardDetails}>
                                                <CardContent>
                                                    <Typography component="h2" variant="h5">
                                                        {data.title}
                                                    </Typography>
                                                    <Typography component="h2" variant="h5">
                                                        {(new Date(data.date).toDateString('dd/MM/yyyy'))}
                                                    </Typography>
                                                </CardContent>
                                                <Button onClick={() => cancelRegister(data._id)} style={{ marginTop: '65px', marginLeft: '195px', }} variant="outlined">Cancel</Button>
                                            </div>
                                        </Card>
                                    </CardActionArea>
                                </Grid>
                            ))
                        }
                    </Grid>

                </Container>
            </React.Fragment>
        </>
    );
};

export default Events;