import React, { useState } from 'react';
import { TextField, Typography, Box, Paper, Container, Tooltip, ButtonGroup, Button } from '@mui/material';

const isValidVIN = (vin) => {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    return vinRegex.test(vin);
};

const highlightVIN = (vin) => {
    if (vin.length !== 17) return vin;

    const firstPart = vin.slice(0, 3);
    const secondPart = vin.slice(3, 9);
    const thirdPart = vin.slice(9, 10);
    const fourthPart = vin.slice(10);

    return (
        <span>
            <Tooltip title={
                <div>
                    <strong>WMI: World Manufacturer Identifier</strong><br />
                    - Identifies the manufacturer of the vehicle.<br />
                    - Assigned by the Society of Automotive Engineers (SAE).<br />
                    - Unique for each manufacturer.
                </div>
            }>
                <span style={{ backgroundColor: 'purple', color: 'white', padding: '0 4px', borderRadius: '4px', cursor: 'pointer' }}>
                    {firstPart}
                </span>
            </Tooltip>
            <Tooltip title={
                <div>
                    <strong>VDS: Vehicle Descriptor Section</strong><br />
                    - Identifies the vehicle attributes.<br />
                    - Unique for each vehicle.
                </div>
            }>
                <span style={{ backgroundColor: 'green', color: 'white', padding: '0 4px', borderRadius: '4px', marginLeft: '4px', cursor: 'pointer' }}>
                    {secondPart}
                </span>
            </Tooltip>
            <Tooltip title={
                <div>
                    <strong>Check Digit</strong><br />
                    - Used to verify the accuracy of the VIN.<br />
                    - Calculated using a mathematical formula.<br />
                    - Unique for each VIN.
                </div>
            }>
                <span style={{ backgroundColor: 'red', color: 'white', padding: '0 4px', borderRadius: '4px', marginLeft: '4px', cursor: 'pointer' }}>
                    {thirdPart}
                </span>
            </Tooltip>
            <Tooltip title={
                <div>
                    <strong>VIS: Vehicle Identifier Section</strong><br />
                    - Identifies the vehicle serial number.<br />
                    - Unique for each vehicle.
                </div>
            }>
                <span style={{ backgroundColor: 'blue', color: 'white', padding: '0 4px', borderRadius: '4px', marginLeft: '4px', cursor: 'pointer' }}>
                    {fourthPart}
                </span>
            </Tooltip>
        </span>
    );
};

function ToolPage() {
    const [vin, setVin] = useState('');
    const [isVinValid, setIsVinValid] = useState(false);
    const [view, setView] = useState('single');

    const handleVinChange = (event) => {
        const newVin = event.target.value.toUpperCase();
        setVin(newVin);
        setIsVinValid(isValidVIN(newVin));
    };

    const handleViewChange = (newView) => {
        setView(newView);
        if (newView === 'csv') {
            alert('This feature is not available yet');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <ButtonGroup variant="contained">
                        <Button
                            variant={view === 'single' ? 'contained' : 'outlined'}
                            onClick={() => handleViewChange('single')}
                        >
                            Single VIN
                        </Button>
                        <Button
                            variant={view === 'csv' ? 'contained' : 'outlined'}
                            onClick={() => handleViewChange('csv')}
                        >
                            CSV VIN
                        </Button>
                    </ButtonGroup>
                </Box>
                
                {view === 'single' && (
                    <TextField
                        label="Enter VIN"
                        variant="outlined"
                        value={vin}
                        onChange={handleVinChange}
                        inputProps={{ maxLength: 17 }}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                )}
                <Box>
                    <Typography variant="body1">
                        Characters: <Typography component="span" sx={{ display: 'inline-block', fontWeight: 'medium', backgroundColor: '#e0e0e0', padding: '2px 8px', borderRadius: '4px', marginLeft: '4px' }}>{vin.length}</Typography>
                    </Typography>
                    <Typography variant="body1">
                        Valid VIN: <Typography component="span" sx={{ display: 'inline-block', fontWeight: 'medium', backgroundColor: '#e0e0e0', padding: '2px 8px', borderRadius: '4px', marginLeft: '4px' }}>{isVinValid ? 'Yes' : 'No'}</Typography>
                    </Typography>
                    <Typography variant="body1">
                        Real VIN: <Typography component="span" sx={{ display: 'inline-block', fontWeight: 'medium', backgroundColor: '#e0e0e0', padding: '2px 8px', borderRadius: '4px', marginLeft: '4px' }}>?</Typography>
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Typography variant="body1">
                        VIN: {highlightVIN(vin)}
                    </Typography>
                </Box>
                <Box mt={4}>
                    <Typography variant="h5">
                        Analysis Area
                    </Typography>
                    {isVinValid && (
                        <Typography variant="body1"> Results will go here </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}

export default ToolPage;
