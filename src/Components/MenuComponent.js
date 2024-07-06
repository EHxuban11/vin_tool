import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LinkIcon from '@mui/icons-material/Link';
import Box from '@mui/material/Box';

export default function LandingPage() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            3C vehicle telematic tools
          </Typography>
          <Button color="inherit" href="/vin-decoder">VIN decoder</Button>
          <Button color="inherit" href="/CsvPage">Fota csv editor</Button>
          <Button color="inherit" href="/imei-generator">IMEI generator</Button>
          <Button color="inherit" href="/vin-generator">VIN generator</Button>
          
          <Box sx={{ flexGrow: 1 }} /> 

          <Tooltip title="Go to Fleeti">
            <Button 
              color="inherit" 
              href="https://www.fleeti.co/" 
              target="_blank" 
              startIcon={<LinkIcon />}
            >
              Fleeti
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
