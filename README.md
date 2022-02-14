
# eevee app
This web app was created as a capstone project for Ada Developer's Academy.

We believe tapping into our communities resources, sharing charging ports and building a network of electric car vehicle owners will build a more sustainable future. For most electric car owners, the cheapest way to refuel is to plug in at home. At Seattle City Light, for example, residential rates range from less than 10 cents to more than 14 cents per kilowatt hour depending on how much power the customers use, and where they live. But home charging, public or private charging stations are not always accessible. Electric car owners need a guide that connects them instead to local homeowner ports nationwide.

The eevee app is the start of a fun and engaging app to help owners normalize the experience of charging and owning an electric vehicle.

## Feature Set
- Get current location of the device;
- Retrieve location and charging stations based on user input.

## Dependencies
- react
- react-map-gl
- react-map-gl-geocoder
- mapbox

## Environment Set-Up

1. Clone or fork this repository.
2. Install dependencies by running: ```yarn start```
3. Add an env file by running: ```touch .env```
   1. Add the following keys as:
      1.Create an opencharge key from https://openchargemap.org/site/loginprovider/beginlogin. Add the opencharge key as: ```REACT_APP_OPEN_CHARGE= opencharge_key```
      2. Create a mapbox token from https://www.mapbox.com/. Create an account and add mapbox token as: ```REACT_APP_MAPBOX_TOKEN=mapboxtoken```
- These environement variables should contain no spaces and whenever env files are edited, restart react.

4. 