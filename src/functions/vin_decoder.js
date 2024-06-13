const fs = require('fs');

function loadJson(fileName) {
    const data = fs.readFileSync(fileName);
    return JSON.parse(data);
}

function getModelYear(vinChar) {
    const yearLookup = loadJson('yearLookup.json');
    return yearLookup[vinChar] || ['Unknown'];
}

function findElectricDetails(vinPrefix) {
    const electricLookup = loadJson('electric_lookup.json');
    const vehicle = electricLookup.vehicles.find(vehicle => vehicle.VIN_prefix === vinPrefix);
    return vehicle ? vehicle.details : { manufacturer: 'Unknown', model: 'Unknown' };
}

function parseVin(vin) {
    // Load lookup data
    const continentLookup = loadJson('continentLookup.json');
    const countryLookup = loadJson('countryLookup.json');
    const wmiLookup = loadJson('wmiLookupv2.json');

    // Extract parts of the VIN
    const wmi = vin.slice(0, 3);
    const vds = vin.slice(3, 9);
    const vis = vin.slice(9);
    const firstEight = vin.slice(0, 8);

    console.log(`VIN: ${vin}`);
    console.log(`First 8 characters of VIN: ${firstEight}`);

    // Get the continent
    const continentCode = vin[0];
    const region = continentLookup[continentCode] || 'Unknown';

    // Get the country
    const countryCode = vin.slice(0, 2);
    const country = countryLookup[countryCode] || 'Unknown';

    // Get the manufacturer
    const manufacturer = wmiLookup[wmi] || 'Unknown';

    // Get the year
    const yearCode = vin[9];
    const possibleYears = getModelYear(yearCode);

    // Get electric lookup details
    const electricDetails = findElectricDetails(firstEight);

    console.log(`Electric details: ${JSON.stringify(electricDetails)}`);

    return {
        vin: vin,
        country: country,
        manufacturer: manufacturer,
        manufacturer2: electricDetails.manufacturer,
        model: electricDetails.model,
        region: region,
        wmi: wmi,
        vds: vds,
        vis: vis,
        possibleYears: possibleYears
    };
}

// Example usage:
const vin = "WA1VAAGE7KB000006";
const vehicleInfo = parseVin(vin);
console.log(vehicleInfo);
