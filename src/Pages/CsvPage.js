import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import { saveAs } from 'file-saver';

const initialRows = Array.from({ length: 100 }, () => ['']);

const CsvPage = () => {
    const [data, setData] = useState(initialRows);
    const [text, setText] = useState('');
    const hotTableComponent = useRef(null);

    const handleDataChange = (changes, source) => {
        if (source !== 'loadData' && changes) {
            const newData = data.slice();
            changes.forEach(([row, prop, oldValue, newValue]) => {
                newData[row][prop] = newValue;
            });
            setData(newData);
            updateText(newData);
        }
    };

    const updateText = (data) => {
        const textOutput = data.map(row => row.join('\n')).join('\n');
        setText(textOutput);
    };

    const handleDownload = () => {
        const csvContent = data.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const date = new Date().toISOString().split('T')[0];
        saveAs(blob, `IMEI_${date}.csv`);
    };

    const addMoreRows = () => {
        setData(prevData => [...prevData, ...Array.from({ length: 50 }, () => [''])]);
    };

    const handlePaste = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('Text').trim().split('\n').map(line => [line.trim()]);
        const selected = hotTableComponent.current.hotInstance.getSelected();
        
        if (!selected) {
            return;
        }

        const [startRow] = selected[0];

        setData(prevData => {
            const newData = prevData.slice();
            pastedData.forEach((row, index) => {
                if (startRow + index < newData.length) {
                    newData[startRow + index][0] = row[0];
                } else {
                    newData.push([row[0]]);
                }
            });
            updateText(newData);
            return newData;
        });

        event.preventDefault();
    };

    useEffect(() => {
        const hotTableElement = hotTableComponent.current.hotInstance.rootElement;
        hotTableElement.addEventListener('paste', handlePaste);

        return () => {
            hotTableElement.removeEventListener('paste', handlePaste);
        };
    }, [data]);

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: '50%', paddingRight: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Paste IMEI Numbers
                    </Typography>
                    <HotTable
                        data={data}
                        colHeaders={false}
                        rowHeaders={true}
                        width="100%"
                        height="300"
                        licenseKey="non-commercial-and-evaluation"
                        afterChange={handleDataChange}
                        copyPaste={true}
                        stretchH="all"
                        ref={hotTableComponent}
                    />
                    <Button variant="outlined" onClick={addMoreRows} sx={{ marginTop: 2 }}>
                        Add More Rows
                    </Button>
                </Box>
                <Box sx={{ width: '45%', paddingLeft: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        IMEI Numbers Preview
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={10}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        InputProps={{ readOnly: true }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDownload}
                        sx={{ marginTop: 2 }}
                    >
                        Download CSV
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CsvPage;
