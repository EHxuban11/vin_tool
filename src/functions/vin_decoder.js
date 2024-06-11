const fs = require('fs');

function loadJson(fileName) {
    const data = fs.readFileSync(fileName);
    return JSON.parse(data);
}

function getModelYear(vinChar) {
    const yearLookup = loadJson('yearLookup.json');
    return yearLookup[vinChar] || ['Unknown'];
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

    return {
        vin: vin,
        country: country,
        manufacturer: manufacturer,
        model: "",
        class: "",
        region: region,
        wmi: wmi,
        vds: vds,
        vis: vis,
        possibleYears: possibleYears
    };
}

// Example usage:
const vin = "3FTBE673ETR678452";
const vehicleInfo = parseVin(vin);
console.log(vehicleInfo);
