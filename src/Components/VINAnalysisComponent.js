import React from 'react';
import { Typography, Box } from '@mui/material';
import wmiLookup from './wmiLookup.json'; // Adjust the path as needed

const VINAnalysis = ({ vin }) => {
    const wmi = vin.slice(0, 3);
    const vds = vin.slice(3, 9);
    const vis = vin.slice(9, 17);

    const manufacturer = wmiLookup[wmi] || 'Unknown Manufacturer';

    return (
        <Box>
            <Typography variant="body2">
                <strong>WMI (World Manufacturer Identifier):</strong><br />
                {wmi} - {manufacturer}
            </Typography>
            <Typography variant="body2" mt={2}>
                <strong>VDS (Vehicle Descriptor Section):</strong><br />
                {vds} - Identifies the vehicle attributes.
            </Typography>
            <Typography variant="body2" mt={2}>
                <strong>VIS (Vehicle Identifier Section):</strong><br />
                {vis} - Identifies the vehicle serial number.
            </Typography>
        </Box>
    );
};

export default VINAnalysis;
