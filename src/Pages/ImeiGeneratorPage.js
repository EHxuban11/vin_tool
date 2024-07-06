import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Container, Button, IconButton, Tooltip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const generateIMEI = () => {
    const imei = [];
    for (let i = 0; i < 14; i++) {
        imei.push(Math.floor(Math.random() * 10));
    }
    const checkDigit = calculateLuhnCheckDigit(imei.join(''));
    imei.push(checkDigit);
    return imei.join('');
};

const calculateLuhnCheckDigit = (number) => {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
        let digit = parseInt(number[i], 10);
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }
    return (10 - (sum % 10)) % 10;
};

function ImeiGeneratorPage() {
    const [imei, setImei] = useState('');

    useEffect(() => {
        const newImei = generateIMEI();
        setImei(newImei);
    }, []);

    const handleGenerateIMEI = () => {
        const newImei = generateIMEI();
        setImei(newImei);
    };

    const handleCopyIMEI = () => {
        navigator.clipboard.writeText(imei);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Button 
                        variant="contained" 
                        onClick={handleGenerateIMEI} 
                        endIcon={<ArrowForwardIcon />}
                        sx={{ marginRight: 2 }}
                    >
                        Generate IMEI
                    </Button>
                    <Box display="flex" alignItems="center">
                        <Tooltip title="Copy to clipboard">
                            <IconButton onClick={handleCopyIMEI} sx={{ marginRight: 1 }}>
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
                            {imei}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default ImeiGeneratorPage;
