import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Container, Button, IconButton, Tooltip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import vinList from '../data/vin_list.json';

const pickRandomVIN = () => {
    const randomIndex = Math.floor(Math.random() * vinList.length);
    return vinList[randomIndex];
};

function VinGeneratorPage() {
    const [vin, setVin] = useState('');

    useEffect(() => {
        const newVin = pickRandomVIN();
        setVin(newVin);
    }, []);

    const handleGenerateVIN = () => {
        const newVin = pickRandomVIN();
        setVin(newVin);
    };

    const handleCopyVIN = () => {
        navigator.clipboard.writeText(vin);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Button 
                        variant="contained" 
                        onClick={handleGenerateVIN} 
                        endIcon={<ArrowForwardIcon />}
                        sx={{ marginRight: 2 }}
                    >
                        Generate VIN
                    </Button>
                    <Box display="flex" alignItems="center">
                        <Tooltip title="Copy to clipboard">
                            <IconButton onClick={handleCopyVIN} sx={{ marginRight: 1 }}>
                                <ContentCopyIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                backgroundColor: '#e0e0e0', 
                                padding: '8px', 
                                borderRadius: '4px', 
                                fontFamily: 'monospace', 
                                minWidth: '200px', 
                                textAlign: 'center'
                            }}
                        >
                            {vin}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default VinGeneratorPage;
