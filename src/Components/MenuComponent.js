import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function LandingPage() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            3C VIN tool
          </Typography>
          <Button color="inherit" href="/">Tool</Button>
          {/*<Button color="inherit" href="/documentation">Docs</Button>*/}
          <Button color="inherit" href="https://www.fleeti.co/">Fleeti</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}