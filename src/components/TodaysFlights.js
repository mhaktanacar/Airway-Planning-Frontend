import {
    Box, Paper
} from "@material-ui/core";
import React from 'react';
import Flight from './Flight';

function TodaysFlights(props) {
    let flights = props.flights;
    return (
        <div>
            Today's Flights:
            <br></br>
            <br></br>
            {flights.length >= 0 && (
                <Paper>
                    <Box display="flex" flexDirection="column" alignItems="stretch">
                        <div >
                            {flights.map(({ id, flightNumber, flightDate, airline, sourceAirport, destAirport }) => (
                                <Flight
                                    id={id}
                                    flightNumber={flightNumber}
                                    flightDate={flightDate}
                                    airline={airline}
                                    sourceAirport={sourceAirport}
                                    destAirport={destAirport}
                                >
                                </Flight>
                            ))}</div>
                    </Box>
                </Paper>
            )}
        </div>
    );
}

export default TodaysFlights;
