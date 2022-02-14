
# eevee app
This web app was created as a capstone project for Ada Developer's Academy. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The eevee app is the start of a fun and engaging app to help owners normalize the experience of charging and owning an electric vehicle.

We believe tapping into our communities resources, sharing charging ports and building a network of electric car vehicle owners will build a more sustainable future. For most electric car owners, the cheapest way to refuel is to plug in at home. At Seattle City Light, for example, residential rates range from less than 10 cents to more than 14 cents per kilowatt hour depending on how much power the customers use, and where they live. But home charging, public or private charging stations are not always accessible. Electric car owners need a guide that connects them instead to local homeowner ports nationwide.

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
   1. Add the following keys in the .env file as:
      1. Create an account and opencharge key from https://openchargemap.org/site/loginprovider/beginlogin. Add the opencharge key as: ```REACT_APP_OPEN_CHARGE=opencharge_key```
      2. Create an account and mapbox token from https://www.mapbox.com/. Add mapbox token as: ```REACT_APP_MAPBOX_TOKEN=mapboxtoken```
4. Launch the application by running ```yarn start``` in your terminal.

*These environement variables should contain no spaces and if env tokens need to be updated, restart react.*