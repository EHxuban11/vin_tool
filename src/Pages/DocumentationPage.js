import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const DocumentationPage = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    Documentation Page
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to the documentation page! Here you can find information about our application and how to use it.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl sed tincidunt tincidunt, nunc
                    mauris lacinia nunc, id luctus nunc nunc id nunc. Sed id semper metus. Sed id semper metus. Sed id semper metus.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Donec auctor, nisl sed tincidunt tincidunt, nunc mauris lacinia nunc, id luctus nunc nunc id nunc. Sed id semper
                    metus. Sed id semper metus. Sed id semper metus.
                </Typography>
            </Paper>
        </Container>
    );
};

export default DocumentationPage;