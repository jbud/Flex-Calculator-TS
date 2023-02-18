# Flex Calculator (React)

This project is in development.

This is a takeoff performance calculator for the Airbus A320 NEO. While Airbus has not released performance data for this airplane, an approximation can be made by testing and by interpolating and extrapolating from a handful of public data points. **(not sure if correct!)**

## Problems and shortcomings

This calculator uses FlyByWire (FBW) Simulations' calculations for VR and V2. The V1 calculation, on the other hand, needs some work. Currently the preferred takeoff performance calculator **(or V1 speed calculator?)** is the MCDU onboard the FBW A32NX.

Currently there is no method for an invalid takeoff. If you see a flex number lower than OAT it's likely a problem.

## Available Scripts

In the project directory, you can run:

### `cp runways/icao/* public/database/runways`
### `npm start`
