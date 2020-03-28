import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createWeek(name, jan, mat, rob) {
    return [name, jan, mat, rob];
}
const weeks = [
    createWeek('CW12', 'KUC', 'ŁAZ', 'KOR'),
    createWeek('CW15', 'KOR', 'KUC', 'ŁAZ'),
    createWeek('CW18', 'ŁAZ', 'KOR', 'KUC'),
    createWeek('CW21', 'KUC', 'ŁAZ', 'KOR'),
];

function createHeaders(weeks) {
    var result = [];
    for (var i = 0; i < weeks.length; i++) {
        result.push(weeks[i][0]);
    }
    return result;
}
const headers = createHeaders(weeks)

// function createJanAreas(weeks) {
//     var result = ["Jan"];
//     for (var i = 0; i < weeks.length; i++) {
//         result.push(weeks[i][1]);
//     }
//     return result;
// }
// function createMateuszAreas(weeks) {
//     var result = ["Mateusz"];
//     for (var i = 0; i < weeks.length; i++) {
//         result.push(weeks[i][2]);
//     }
//     return result;
// }
// function createRobertAreas(weeks) {
//     var result = ["Robert"];
//     for (var i = 0; i < weeks.length; i++) {
//         result.push(weeks[i][3]);
//     }
//     return result;
// }
// const janAreas = createJanAreas(weeks);
// const mateuszAreas = createMateuszAreas(weeks);
// const robertAreas = createRobertAreas(weeks);



export default function SimpleTable() {
    const classes = useStyles();
    const [hasError, setErrors] = useState(false);
    const [janAreas, setJanAreas] = useState({});
    const [robertAreas, setRobertAreas] = useState({});
    const [mateuszAreas, setMateuszAreas] = useState({});


    async function fetchJanData() {
        const res = await fetch("localhost:8888/areas/1");
        res
            .json()
            .then(res => setJanAreas(res))
            .catch(err => setErrors(err));
            console.log(res);
    }

    async function fetchMateuszData() {
        const res = await fetch("localhost:8888/areas/2");
        res
            .json()
            .then(res => setMateuszAreas(res))
            .catch(err => setErrors(err));
            console.log(res);
    }

    async function fetchRobertData() {
        const res = await fetch("localhost:8888/areas/3");
        res
            .json()
            .then(res => setRobertAreas(res))
            .catch(err => setErrors(err));
            console.log(res);
    }

    useEffect(() => {
        fetchJanData();
        fetchMateuszData();
        fetchRobertData();
    });


    return (
        <div>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {headers.map((header, index) => (
                            <TableCell align="right" key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {janAreas.map((area, index) => (
                            <TableCell align="right" key={index}>{area}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {mateuszAreas.map((area, index) => (
                            <TableCell align="right" key={index}>{area}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {robertAreas.map((area, index) => (
                            <TableCell align="right" key={index}>{area}</TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    
            <span>Has error: {JSON.stringify(hasError)}</span>
        </div>

    );
}
