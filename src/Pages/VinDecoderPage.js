import React, { useState } from 'react';
import { TextField, Typography, Box, Paper, Container, Tooltip, ButtonGroup, Button, IconButton, Pagination } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VinAnalysisComponent from '../Components/VinAnalysisComponent';

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

function VinDecoderPage() {
    const [vin, setVin] = useState('');
    const [isVinValid, setIsVinValid] = useState(false);
    const [view, setView] = useState('single');
    const [batchVins, setBatchVins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleVinChange = (event) => {
        const newVin = event.target.value.toUpperCase();
        setVin(newVin);
        setIsVinValid(isValidVIN(newVin));
    };

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const handleUseSampleVin = () => {
        const vinList = [
            '1HGCM82633A123456', // USA
            '2GCEC19T721234567', // Canada
            '3FAFP11322R123456', // Mexico
            '1J4GL58KX4W123456', // USA
            '5NPEB4AC9CH123456', // South Korea
            '2T1BURHE7FC123456', // Canada
            '1C4RJFAG7FC123456', // USA
            '3N1BC1CP4BL123456', // Mexico
            '1FMCU9GD7BKA12345', // USA
            'JHMCM82633C123456', // Japan
            'VF1BG000341234567', // France
            'WDBRF40J33F123456'  // Germany
        ];
        const randomIndex = Math.floor(Math.random() * vinList.length);
        const sampleVin = vinList[randomIndex];
        setVin(sampleVin);
        setIsVinValid(isValidVIN(sampleVin));
    };

    const handleBatchVinChange = (event) => {
        const vinList = event.target.value.split(/\s+/).map(vin => vin.toUpperCase().trim()).filter(vin => vin.length === 17);
        setBatchVins(vinList);
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const currentVin = batchVins[currentPage - 1] || '';

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
                            variant={view === 'batch' ? 'contained' : 'outlined'}
                            onClick={() => handleViewChange('batch')}
                        >
                            Batch VIN
                        </Button>
                    </ButtonGroup>
                </Box>

                {view === 'single' && (
                    <Box display="flex" alignItems="center">
                        <TextField
                            label="Enter VIN"
                            variant="outlined"
                            value={vin}
                            onChange={handleVinChange}
                            inputProps={{ maxLength: 17 }}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <IconButton
                            onClick={handleUseSampleVin}
                            sx={{ marginLeft: 1 }}
                        >
                            <HelpOutlineIcon />
                        </IconButton>
                    </Box>
                )}

                {view === 'batch' && (
                    <TextField
                        label="Enter Batch VINs (one per line)"
                        variant="outlined"
                        onChange={handleBatchVinChange}
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                )}

                {view === 'single' && (
                    <Box>
                        <Typography variant="body1">
                            Characters: <Typography component="span" sx={{ display: 'inline-block', fontWeight: 'medium', backgroundColor: '#e0e0e0', padding: '2px 8px', borderRadius: '4px', marginLeft: '4px' }}>{vin.length}</Typography>
                        </Typography>
                        <Typography variant="body1">
                            Valid VIN: <Typography component="span" sx={{ display: 'inline-block', fontWeight: 'medium', backgroundColor: '#e0e0e0', padding: '2px 8px', borderRadius: '4px', marginLeft: '4px' }}>{isVinValid ? 'Yes' : 'No'}</Typography>
                        </Typography>
                    </Box>
                )}
                
                <Box mt={2}>
                    <Typography variant="body1">
                        VIN: {highlightVIN(view === 'single' ? vin : currentVin)}
                    </Typography>
                </Box>
                
                <Box mt={2}>
                    {(isVinValid && view === 'single') && (
                        <VinAnalysisComponent vin={vin} />
                    )}
                    {(view === 'batch' && batchVins.length > 0) && (
                        <>
                            <Pagination
                                count={batchVins.length}
                                page={currentPage}
                                onChange={handlePageChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <VinAnalysisComponent vin={currentVin} />
                        </>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}

export default VinDecoderPage;
