import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import AddFlight from './AddFlight';
import Airline from './Airline';
import Airport from './Airport';
import TodaysFlights from './TodaysFlights';

function FlightsContainer() {
    const [flights, setFlights] = useState([]);

    const fetchTodaysFlights = async () => {
        try {
            const request = await fetch(`http://localhost:8083/todaysFlights`)
            const todaysFlightsJson = await request.json()
            console.log(todaysFlightsJson);

            setFlights(todaysFlightsJson)
        } catch (e) {
        }
    }
    useEffect(() => {

        fetchTodaysFlights()
    }, [])
    function onAddFlight() {
        setFlights([]);
        fetchTodaysFlights();
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={3} rowSpacing={5} justifyContent="center"
            >
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    <br></br>
                    AIRWAY PLANNING
                </Typography>
            </Grid>
            <br></br>
            <br></br>
            <Grid container spacing={3} justifyContent="center"
            >
                <AddFlight
                    onAddFlight={onAddFlight}>
                </AddFlight>
            </Grid>
            <br></br>
            <br></br>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={4}>
                    <Airline>
                    </Airline>
                </Grid>
                <Grid item xs={4}>
                    <Airport>
                    </Airport>
                </Grid>
                <Grid item xs={4}>
                    <TodaysFlights flights={flights}>
                    </TodaysFlights>
                </Grid>
            </Grid>
        </Container >
    );
}

export default FlightsContainer;