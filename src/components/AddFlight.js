import { Button, Icon, TextField, Typography } from "@material-ui/core";
import { CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";

function AddFlight(props) {
    const [newFlightNumber, setNewFlightNumber] = useState("");
    const [flightDate, setFlightDate] = useState(new Date());
    const [airlines, setAirlines] = useState([]);
    const [airline, setAirline] = useState('');
    const [airports, setAirports] = useState([]);
    const [sourceAirport, setSourceAirport] = useState('');
    const [destAirport, setDestAirport] = useState('');

    const onAddFlight = () => {
        props.onAddFlight();
    }
    const fetchAirlines = async () => {
        try {
            const request = await fetch(`http://localhost:8083/airlines`)
            const airlinesJson = await request.json()
            console.log(airlinesJson);

            setAirlines([...airlines, ...airlinesJson])
        } catch (e) {

        }
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
        fetchAirlines()
        fetchAirports()
    }, [])

    const addFlight = async (text) => {
        await fetch("http://localhost:8083/flights", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                flightNumber: text, flightDate: flightDate, airlineCode: airline,
                sourceAirport: sourceAirport, destAirport: destAirport
            }),
        })
            .then((response) => response.json())

        setNewFlightNumber("");
        setAirline('');
        setSourceAirport('');
        setDestAirport('');
        onAddFlight();
    }

    const handleAirlineChange = (event) => {
        setAirline(event.target.value);
    };

    const handleSourceAirportChange = (event) => {
        if (destAirport != '' && destAirport == event.target.value) {
            alert('You can not choose the same airport for source and destination');
            setSourceAirport('');
        }
        else {
            setSourceAirport(event.target.value);
        }
    };

    const handleDestAirportChange = (event) => {
        if (sourceAirport != '' && sourceAirport == event.target.value) {
            alert('You can not choose the same airport for source and destination');
            setDestAirport('');
        }
        else {
            setDestAirport(event.target.value);
        }
    };

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardContent>
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <Typography gutterBottom variant="h5" component="div" >
                                Add New Flight
                            </Typography>
                        </div>
                        <Typography gutterBottom variant="h5" component="div">
                            <TextField
                                label="Flight Number"
                                fullWidth
                                value={newFlightNumber}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        addFlight(newFlightNumber);
                                    }
                                }}
                                onChange={(event) => setNewFlightNumber(event.target.value)}
                            />
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Flight Date and Time"
                                    value={flightDate}
                                    onChange={(date) => setFlightDate(date)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Airline</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={airline.airlineCode}
                                    label="Airline"
                                    onChange={handleAirlineChange}
                                >
                                    {airlines.map(({ airlineCode }) => (
                                        <MenuItem value={airlineCode}>{airlineCode}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Source Airport</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sourceAirport.airportCode}
                                    label="Source Airport"
                                    onChange={handleSourceAirportChange}
                                >
                                    {airports.map(({ airportCode }) => (
                                        <MenuItem value={airportCode}>{airportCode}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Destination Airport</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={destAirport.airportCode}
                                    label="Dest Airport"
                                    onChange={handleDestAirportChange}
                                >
                                    {airports.map(({ airportCode }) => (
                                        <MenuItem value={airportCode}>{airportCode}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        startIcon={<Icon></Icon>}
                        onClick={() => addFlight(newFlightNumber)}
                    >
                        Add
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default AddFlight;
