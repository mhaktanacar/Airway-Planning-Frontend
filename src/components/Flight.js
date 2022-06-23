import {
    Box, Typography
} from "@material-ui/core";
import React from 'react';

function Flight(props) {
    return (
        <div
            className="item-container"
        >
            <Box
                key={props.id}
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Box flexGrow={1}>
                    <Typography
                        variant="body1"
                    >
                        Flight Number : {props.flightNumber} <br />
                        Airline Code : {props.airlineCode}<br />
                        Flight Date : {props.flightDate.split('T').join(' ').split('.').toString().substring(0,16)}<br />
                        Source Airport : {props.sourceAirport}<br />
                        Destination Airport : {props.destAirport}<br />

                        ---
                    </Typography>
                </Box>

            </Box>
        </div>
    );
}

export default Flight;
