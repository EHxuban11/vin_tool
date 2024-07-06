import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Container, Button, IconButton, Tooltip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const generateVIN = () => {
    const characters = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
    const vin = [];
    for (let i = 0; i < 17; i++) {
        vin.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }
    return vin.join('');
};

function VinGeneratorPage() {
    const [vin, setVin] = useState('');

    useEffect(() => {
        const newVin = generateVIN();
        setVin(newVin);
    }, []);

    const handleGenerateVIN = () => {
        const newVin = generateVIN();
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
