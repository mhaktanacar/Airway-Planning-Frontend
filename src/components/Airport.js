import {
    Box, Paper
} from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import Flight from './Flight';

function Airport(props) {
    const [airports, setAirports] = useState([]);
    const [airport, setAirport] = useState('');
    const [flights, setFlights] = useState([]);

    const handleChange = (event) => {
        setAirport(event.target.value);
        getFlightsByAirlineId(event.target.value);
    };

    async function getFlightsByAirlineId(id) {
        const request = await fetch(`http://localhost:8083/flights/airport/${id}`)
        const flightList = await request.json();
        setFlights(flightList);
    }

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const request = await fetch(`http://localhost:8083/airports`)
                const airportsJson = await request.json()
                console.log(airportsJson);

                setAirports([...airports, ...airportsJson])
            } catch (e) {

            }
        }
        fetchAirports()
    }, [])

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Airport</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={airport}
                    label="Age"
                    onChange={handleChange}
                >
                    {airports.map(({ airportCode }) => (
                        <MenuItem value={airportCode}>{airportCode}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br></br>
            <br></br>
            {flights.length >= 0 && (
                <Paper>
                    <Box display="flex" flexDirection="column" alignItems="stretch">
                        <div >
                            {flights.map(({ id, flightNumber, flightDate, airlineCode, sourceAirport, destAirport }) => (
                                <Flight
                                    id={id}
                                    flightNumber={flightNumber}
                                    flightDate={flightDate}
                                    airlineCode={airlineCode}
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

export default Airport;
