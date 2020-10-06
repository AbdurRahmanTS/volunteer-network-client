import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    title: {
        height: 60,
    },
});


const VolunteerItems = () => {
    const classes = useStyles();
    const [volunteerItems, setVolunteerItems] = useState([])

    useEffect(() => {
        fetch('https://fast-citadel-35366.herokuapp.com/volunteerItems')
        .then(res => res.json())
        .then(data => setVolunteerItems(data))
    }, [])
    return (
        <React.Fragment>
            <Container style={{ marginTop: '70px' }}>
                <Grid container spacing={3}>
                    {
                        volunteerItems.map(data => (
                            <Grid key={data._id} item xs={3}>
                                <Link style={{ textDecoration: 'none' }} to={/register/ + data.title}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt=""
                                                height="250"
                                                image={data.img}
                                            />
                                            <CardContent className={classes.title}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {data.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Link>

                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default VolunteerItems;