import {
    Box, Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import Flight from './Flight';

function Airline(props) {
    const [airlines, setAirlines] = useState([]);
    const [airline, setAirline] = useState('');
    const [flights, setFlights] = useState([]);

    const handleChange = (event) => {
        setAirline(event.target.value);
        getFlightsByAirlineId(event.target.value);
    };

    async function getFlightsByAirlineId(id) {
        const request = await fetch(`http://localhost:8083/flights/airline/${id}`)
        const flightList = await request.json();
        setFlights(flightList);
    }

    useEffect(() => {
        const fetchAirlines = async () => {
            try {
                const request = await fetch(`http://localhost:8083/airlines`)
                const airlinesJson = await request.json()
                console.log(airlinesJson);

                setAirlines([...airlines, ...airlinesJson])
            } catch (e) {

            }
        }
        fetchAirlines()
    }, [])

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Airline</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={airline}
                    label="Age"
                    onChange={handleChange}
                >
                    {airlines.map(({ id, airlineCode }) => (
                        <MenuItem value={id}>{airlineCode}</MenuItem>
                    ))}

                </Select>
            </FormControl>
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

export default Airline;
