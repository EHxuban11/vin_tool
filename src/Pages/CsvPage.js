import React, { useState, useEffect } from 'react';
import {
    Box, Button, Container, Paper, TextField, Typography,
    List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails, Tooltip, IconButton, LinearProgress, Alert
} from '@mui/material';
import { saveAs } from 'file-saver';
import { useDropzone } from 'react-dropzone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import WarningIcon from '@mui/icons-material/Warning';
import DownloadIcon from '@mui/icons-material/Download';

// Function to validate IMEI number using Luhn algorithm
const isValidIMEI = (imei) => {
    if (imei.length !== 15) return false;
    let sum = 0;
    for (let i = 0; i < 14; i++) {
        let digit = parseInt(imei.charAt(i));
        if (i % 2 === 1) {
            digit *= 2;
        }
        if (digit > 9) {
            digit -= 9;
        }
        sum += digit;
    }
    return (sum + parseInt(imei.charAt(14))) % 10 === 0;
};

const CsvPage = () => {
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('');
    const [statistics, setStatistics] = useState({
        lineCount: 0,
        hasUnwantedChars: false,
        validIMEICount: 0,
        invalidIMEICount: 0,
        repeatedIMEICount: 0,
    });
    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
    const [alert, setAlert] = useState(false);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: '.csv',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setText(reader.result);
            };
            reader.readAsText(file);
        }
    });

    useEffect(() => {
        if (!text.trim()) {
            setStatistics({
                lineCount: 0,
                hasUnwantedChars: false,
                validIMEICount: 0,
                invalidIMEICount: 0,
                repeatedIMEICount: 0,
            });
            return;
        }

        const lines = text.trim().split('\n');
        const unwantedChars = /[^0-9\n]/;
        const imeiCounts = {};
        const validIMEIs = lines.filter(line => {
            const imei = line.trim();
            if (isValidIMEI(imei)) {
                imeiCounts[imei] = (imeiCounts[imei] || 0) + 1;
                return true;
            }
            return false;
        });
        const invalidIMEIs = lines.length - validIMEIs.length;
        const repeatedIMEIs = Object.values(imeiCounts).filter(count => count > 1).length;

        setStatistics({
            lineCount: lines.length,
            hasUnwantedChars: unwantedChars.test(text),
            validIMEICount: validIMEIs.length,
            invalidIMEICount: invalidIMEIs,
            repeatedIMEICount: repeatedIMEIs,
        });
    }, [text]);

    const handleDownload = () => {
        if (!text.trim()) {
            setAlert(true);
            return;
        }

        const csvContent = text.split('\n').map(row => row.trim()).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const date = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString('en-GB').replace(/:/g, '-');
        const imeiCount = statistics.lineCount;
        const customFileName = fileName || 'IMEI_File';
        const fullFileName = `${customFileName}_${date}_${time}_${imeiCount}IMEIs.csv`;
        saveAs(blob, fullFileName);
        setAlert(false);
    };

    const handleWarningClick = () => {
        setIsAccordionExpanded(true);
    };

    const toggleAccordion = () => {
        setIsAccordionExpanded((prev) => !prev);
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            {alert && (
                <Alert severity="warning" onClose={() => setAlert(false)} sx={{ mb: 2 }}>
                    The CSV file is empty. Please add some IMEI numbers before downloading.
                </Alert>
            )}
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ width: { xs: '100%', md: '50%' }, paddingRight: { md: 2 }, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom>
                        Paste IMEI Numbers
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={10}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={`490154203237518\n351756051523999\n353490371664899`}
                        sx={{ 
                            flexGrow: 1, 
                            overflowY: 'auto', 
                            marginBottom: 2, 
                            '&::placeholder': {
                                color: 'rgba(0, 0, 0, 0.3)', // Lighter placeholder text
                            }
                        }}
                    />
                    <Box 
                        {...getRootProps()} 
                        sx={{
                            border: '2px dashed #cccccc',
                            padding: 2,
                            textAlign: 'center',
                            marginBottom: 2,
                            backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
                            cursor: 'pointer'
                        }}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <Typography>Drop the files here...</Typography>
                        ) : (
                            <Typography>Drag 'n' drop a CSV file here, or click to select a file</Typography>
                        )}
                    </Box>
                </Box>
                <Box sx={{ width: { xs: '100%', md: '45%' }, paddingLeft: { md: 2 }, marginTop: { xs: 2, md: 0 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDownload}
                            sx={{ marginRight: 2 }}
                            startIcon={<DownloadIcon />}
                        >
                            Download CSV
                        </Button>
                        {text.trim() && (statistics.hasUnwantedChars || statistics.invalidIMEICount > 0) ? (
                            <Tooltip title="There are issues with the IMEI numbers. Click to see details." arrow>
                                <IconButton onClick={handleWarningClick}>
                                    <WarningIcon color="error" />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                    </Box>
                    <Accordion expanded={isAccordionExpanded} onChange={toggleAccordion} sx={{ width: '100%', boxShadow: 'none' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                <InsertChartIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                                Advanced
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Custom File Name"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                placeholder="Enter custom file name"
                                sx={{ marginBottom: 2 }}
                            />
                            <List sx={{ padding: 0 }}>
                                <ListItem sx={{ padding: '4px 0' }}>
                                    <ListItemText primary={`Number of lines: ${statistics.lineCount}`} />
                                </ListItem>
                                <ListItem sx={{ padding: '4px 0' }}>
                                    <CheckCircleIcon sx={{ color: 'green', marginRight: 1 }} />
                                    <ListItemText primary={`Valid IMEI count: ${statistics.validIMEICount}`} />
                                </ListItem>
                                <ListItem sx={{ padding: '4px 0' }}>
                                    <ErrorIcon sx={{ color: 'red', marginRight: 1 }} />
                                    <ListItemText primary={`Invalid IMEI count: ${statistics.invalidIMEICount}`} />
                                </ListItem>
                            </List>
                            {text.trim() && (
                                <Box sx={{ marginTop: 2 }}>
                                    <Typography variant="body1">IMEI Validation Progress</Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(statistics.validIMEICount / statistics.lineCount) * 100}
                                        sx={{ height: 10, borderRadius: 5, backgroundColor: 'red', '& .MuiLinearProgress-bar': { backgroundColor: 'green' } }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                                        <Typography variant="body2" sx={{ color: 'green' }}>Valid IMEIs</Typography>
                                        <Typography variant="body2" sx={{ color: 'red' }}>Invalid IMEIs</Typography>
                                    </Box>
                                </Box>
                            )}
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Paper>
        </Container>
    );
};

export default CsvPage;
