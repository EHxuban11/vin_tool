# LIVE CODE: https://vin-tool.vercel.app/


# Google dorks for finding VIN xlsx files
filetype:xls OR filetype:xlsx "VIN" OR "Vehicle Identification Number"







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
VDS is the hardest part to decode, it's manufacturer specific too. https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)#Table_of_Contents
Check all the models of a brand here !!!:: https://vincheck.me/
For example: https://vincheck.me/audi      (scroll down in that page to see the list of models)
# What is a VIS ?
VIS: Vehicle Identifier Section, characters 10 to 17 of the VIN.
- It identifies the vehicle serial number.
- It is unique for each vehicle.

# What is a Check Digit ?
Check Digit: character 9 of the VIN.
- It is used to verify the accuracy of the VIN.
- It is calculated using a mathematical formula.
- It is unique for each VIN.





# JSON structure of database
Explanation: type is the first 8 characters of the VIN
VIN Prefix	Make	Model
ZASPATAW	ALFA ROMEO	TONALE
ZASPATDW	ALFA ROMEO	TONALE
ZASPATSW	ALFA ROMEO	TONALE
ZASPATCW	ALFA ROMEO	TONALE
WAUVPBFF	AUDI	A3
WAUNPBFF	AUDI	A3
WAUSPBFF	AUDI	A3
WAUTPBFF	AUDI	A3
WAUMPBFF	AUDI	A3
WAUUPBFF	AUDI	A3
WAUSPBFF	AUDI	A3
WAUTPBFF	AUDI	A3
WAUUPBFF	AUDI	A3

{
  "vehicles": [
    {
      "VIN_prefix": "JH4KA756",
      "details": {
        "manufacturer": "Acura",
        "model": "Legend",
      }
    },
    {
      "type": "1HGCM8263",
      "details": {
        "country": "USA",
        "manufacturer": "Honda",
        "model": "Accord",
        "region": "North America",
        "year": "2003"
      }
    },
    {
      "type": "WDBUF70J",
      "details": {
        "country": "Germany",
        "manufacturer": "Mercedes-Benz",
        "model": "E-Class",
        "region": "Europe",
        "year": "2004"
      }
    },
    {
      "type": "2GCEK19T",
      "details": {
        "country": "Canada",
        "manufacturer": "Chevrolet",
        "model": "Silverado",
        "region": "North America",
        "year": "1999"
      }
    }
  ]
}


# Option 1
```
{
  "vin": "JH4KA7561PC008269",
  "country": "Japan",
  "manufacturer": "Acura",
  "model": "Legend",
  "class": "Sedan/Saloon",
  "region": "Asia",
  "wmi": "JH4",
  "vds": "KA7561",
  "vis": "PC008269",
  "year": "1993"
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
