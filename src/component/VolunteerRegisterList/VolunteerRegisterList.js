import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import icon from '../../logos/Group 1329.png';
import userIcon from '../../logos/users-alt 1.png';
import plusIcon from '../../logos/plus 1.png';
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});



const VolunteerRegisterList = () => {
    const classes = useStyles();
    const [volunteerList, setVolunteerList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/registerInfo')
        .then(res => res.json())
        .then(data => {
            setVolunteerList(data);
        })
    }, [])

    function cancelRegister(id) {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            if (result) {
                fetch('http://localhost:5000/registerInfo')
                .then(res => res.json())
                .then(data => setVolunteerList(data))
            }
        })
    }

    return (
        <div style={{ margin: '50px' }}>
            <div style={{ width: '30%', float: 'left' }}>
                <Link to='/home'><img style={{ width: '50%' }} src={icon} alt="" /></Link>
                <div style={{ marginTop: '25px' }}>
                    <button style={{ border: 'none', backgroundColor: 'transparent' }}>
                        <img style={{ width: '8%' }} src={userIcon} alt="" />
                        <span style={{ fontSize: '30px', marginLeft: '20px' }}>Volunteer register list</span>
                    </button>
                </div>
                <div style={{ marginTop: '25px' }}>
                    <Link to='/addevent'>
                        <button style={{ border: 'none', backgroundColor: 'transparent' }}>
                            <img style={{ width: '12%' }} src={plusIcon} alt="" />
                            <span style={{ fontSize: '30px', marginLeft: '20px' }}>Add event</span>
                        </button>
                    </Link>
                </div>
            </div>
            <div style={{ float: 'right' }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="left">Email ID</StyledTableCell>
                                <StyledTableCell align="left">Registating date</StyledTableCell>
                                <StyledTableCell align="left">Volunteer list</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {volunteerList.map((data) => (
                                <StyledTableRow key={data._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {data.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{data.email}</StyledTableCell>
                                    <StyledTableCell align="left">{(new Date(data.date).toDateString('dd/MM/yyyy'))}</StyledTableCell>
                                    <StyledTableCell align="left">{data.title}</StyledTableCell>
                                    <StyledTableCell align="left"><DeleteIcon onClick={() => cancelRegister(data._id)} /></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default VolunteerRegisterList;