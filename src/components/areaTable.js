import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useFetch } from "../shared/hooks";
import axios from 'axios';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    cell: {
        fontWeight: 550,
    }
});

export default function AreaTable({ clickedAreaId }) {
    const classes = useStyles();
    const [activities, setActivities] = useState(0);
    const [loading, setLoading] = useState(0);

    // useEffect(async () => {
    //     const result = await axios(
    //         'http://192.168.100.5:8888/activities/' + clickedAreaId + '',
    //     );
    //     setActivities(result.data);
    // });


    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                'http://192.168.100.5:8888/activities/' + clickedAreaId + '',
            );
            setActivities(result.data);
        }
        fetchData();
    }, [])


    // useEffect(() => {
    //     const [act, actLoading] = useFetch('http://192.168.100.5:8888/activities/' + clickedAreaId + '');
    //     setActivities(act);
    //     setLoading(actLoading);


    // });

    // const [activities, activitiesLoading] = useFetch('http://192.168.100.5:8888/activities/' + areaId + '');

    function printRows(activities) {
        return activities
            .map(activity => printCells(activity))
    }

    function printCells(activity) {
        return (
            <TableRow>
                <TableCell align="left" key={activity.id}>{activity.name}</TableCell>
                <TableCell align="center" key={activity.id}>{translateFrequency(activity.frequency)}</TableCell>
                <TableCell align="center" key={activity.id} style={{ background: setColorByStatus(activity.activityStatus) }}>{transalteActivityStatus(activity.activityStatus)}</TableCell>
            </TableRow>
        );
    }

    function setColorByStatus(status) {
        switch (status) {
            case "CHECKED":
                return 'lightgreen';
            case "READY_TO_CHECK":
                return 'lemonchiffon';
            default:
                return;
        }
    }

    function translateFrequency(frequency) {
        switch (frequency) {
            case "ODD":
                return 'tydz. nieparzysty';
            case "EVEN":
                return 'tydz. parzysty';
            default:
                return 'zawsze';
        }
    }

    function transalteActivityStatus(activityStatus) {
        switch (activityStatus) {
            case "READY_TO_CHECK":
                return 'do sprawdzenia';
            case "CHECKED":
                return 'zrobione';
            default:
                return;
        }
    }

    if (activities.length > 0) {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell} align="left">Zadanie</TableCell>
                                <TableCell className={classes.cell} align="center">Częstotliwość</TableCell>
                                <TableCell className={classes.cell} align="center" >Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {printRows(activities)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        );
    }
    else {
        return (
            <div>
                <span>Activity errors: {JSON.stringify(loading)}</span>
            </div>
        );
    }

}