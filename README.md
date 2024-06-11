
#


# Option 1
```
{
  "vin": "JH4KA7561PC008269",
  "country": "Japan",
  "manufacturer": "Only available for premium subscribers.",
  "model": "Only available for premium subscribers.",
  "class": "Only available for premium subscribers.",
  "region": "Asia",
  "wmi": "JH4",
  "vds": "KA7561",
  "vis": "PC008269",
  "year": 2023
}
```

# Option 2 https://github.com/opencars/vin-decoder-api
{
  "vehicle": {
    "check_digit": true,
    "country": "United States",
    "manufacturer": "Tesla, Inc.",
    "region": "North America",
    "serial": "010543",
    "year": 2016
  },
  "vin": {
    "vds": "XCCE40",
    "vis": "GF010543",
    "wmi": "5YJ"
  }
}





# What is a VIN ?
VIN: Vehicle Identification Number, unique code for each vehicle.
- 17 characters long
- It contains de manufacturing date, the manufacturer, the country, the model, the class, the region
- It is used to identify vehicles, motorcycles, scooters, mopeds, etc.
Source code Pays (2 first characters): https://epicvin.com/fr/blog/vin-country-codes-of-the-vehicles
Source code Manufacturer (3 first characters): https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/World_Manufacturer_Identifier_(WMI)


# Structure of a VIN
- The first 3 characters are the WMI (World Manufacturer Identifier).
- The next 6 characters are the VDS (Vehicle Descriptor Section).
- The 9th character is the Check Digit.
- The last 8 characters are the VIS (Vehicle Identifier Section).
# What is a WMI ?
WMI: World Manufacturer Identifier, first 3 characters of the VIN.
- It identifies the manufacturer of the vehicle.
- It is assigned by the Society of Automotive Engineers (SAE).
- It is unique for each manufacturer.

# What is a VDS ?
VDS: Vehicle Descriptor Section, characters 4 to 9 of the VIN.
- It identifies the vehicle attributes.
- It is unique for each vehicle.

# What is a VIS ?
VIS: Vehicle Identifier Section, characters 10 to 17 of the VIN.
- It identifies the vehicle serial number.
- It is unique for each vehicle.

# What is a Check Digit ?
Check Digit: character 9 of the VIN.
- It is used to verify the accuracy of the VIN.
- It is calculated using a mathematical formula.
- It is unique for each VIN.

