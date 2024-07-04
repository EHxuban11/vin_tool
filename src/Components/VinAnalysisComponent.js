import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, Container, CircularProgress, Divider } from '@mui/material';
import yearLookup from '../data/yearLookup.json';
import electricLookup from '../data/electric_lookup.json';
import continentLookup from '../data/continentLookup.json';
import countryLookup from '../data/countryLookup.json';
import wmiLookup from '../data/wmiLookup.json';
import wmiLookup2 from '../data/wmiLookup2.json';

const getModelYear = (vinChar) => {
    return yearLookup[vinChar] || ['Unknown'];
};

const findElectricDetails = (vinPrefix) => {
    const vehicle = electricLookup.vehicles.find(vehicle => vehicle.VIN_prefix === vinPrefix);
    return vehicle ? vehicle.details : { manufacturer: 'Unknown', model: 'Unknown' };
};

const parseVin = (vin) => {
    const wmi = vin.slice(0, 3);
    const firstEight = vin.slice(0, 8);

    const continentCode = vin[0];
    const region = continentLookup[continentCode] || 'Unknown';

    const countryCode = vin.slice(0, 2);
    const country = countryLookup[countryCode] || 'Unknown';

    const manufacturer1 = wmiLookup.find(entry => entry.vin === wmi)?.make || 'Unknown';
    const manufacturer2 = wmiLookup2[wmi] || 'Unknown';

    const yearCode = vin[9];
    const possibleYears = getModelYear(yearCode);

    const electricDetails = findElectricDetails(firstEight);

    return {
        vin: vin,
        region: region,
        country: country,
        manufacturer1: manufacturer1,
        manufacturer2: manufacturer2,
        manufacturer3: electricDetails.manufacturer,
        model: electricDetails.model,
        possibleYears: possibleYears
    };
};

const VinAnalysisComponent = ({ vin }) => {
    const [vehicleInfo, setVehicleInfo] = useState(null);

    useEffect(() => {
        const info = parseVin(vin);
        setVehicleInfo(info);
    }, [vin]);

    if (!vehicleInfo) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
                
                <Box mb={2}>
                    <Typography variant="body1"><strong>Continent:</strong> {vehicleInfo.region}</Typography>
                    <Typography variant="body1"><strong>Country:</strong> {vehicleInfo.country}</Typography>
                    <Typography variant="body1"><strong>Manufacturer (Source 1):</strong> {vehicleInfo.manufacturer1}</Typography>
                    <Typography variant="body1"><strong>Manufacturer (Source 2):</strong> {vehicleInfo.manufacturer2}</Typography>
                    <Typography variant="body1"><strong>Possible Years:</strong> {vehicleInfo.possibleYears.join(', ')}</Typography>
                    <Divider sx={{ marginBottom: 0 }} />
                    <Typography variant="body1"><strong>Electric Manufacturer:</strong> {vehicleInfo.manufacturer3}</Typography>
                    <Typography variant="body1"><strong>Model:</strong> {vehicleInfo.model}</Typography>
                </Box>
            </Paper>
        </Container>
    );
};

VinAnalysisComponent.propTypes = {
    vin: PropTypes.string.isRequired
};

export default VinAnalysisComponent;
