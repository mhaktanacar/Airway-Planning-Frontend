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
                flightNumber: text, flightDate: flightDate, airline: airline,
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
        console.log(airlines.filter((airl) => airl.id == event.target.value)[0]);
        setAirline(airlines.filter((airl) => airl.id == event.target.value)[0]);
    };

    const handleSourceAirportChange = (event) => {
        if (destAirport != '' && destAirport.id == event.target.value) {
            alert('You can not choose the same airport for source and destination');
            setSourceAirport('');
        }
        else {
            setSourceAirport(airports.filter((airl) => airl.id == event.target.value)[0]);
        }
    };

    const handleDestAirportChange = (event) => {
        if (sourceAirport != '' && sourceAirport.id == event.target.value) {
            alert('You can not choose the same airport for source and destination');
            setDestAirport('');
        }
        else {
            setDestAirport(airports.filter((airl) => airl.id == event.target.value)[0]);
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
                                    label="Age"
                                    onChange={handleAirlineChange}
                                >
                                    {airlines.map(({ id, airlineCode }) => (
                                        <MenuItem value={id}>{airlineCode}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Source Airport</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sourceAirport.airportCode}
                                    label="Age"
                                    onChange={handleSourceAirportChange}
                                >
                                    {airports.map(({ id, airportCode }) => (
                                        <MenuItem value={id}>{airportCode}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Destination Airport</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={destAirport.airportCode}
                                    label="Age"
                                    onChange={handleDestAirportChange}
                                >
                                    {airports.map(({ id, airportCode }) => (
                                        <MenuItem value={id}>{airportCode}</MenuItem>
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
