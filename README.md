# Flex Calculator Progressive Web App

This project is in development.

This is a takeoff performance calculator for the Airbus A320 NEO. While Airbus has not released performance data for this airplane, an approximation can be made by testing and by interpolating and extrapolating from a handful of public data points. **(not sure if correct!)**

## Installation (iPad)

* open the deployed [page](https://jbud.github.io/Flex-Calculator-TS/) in safari
* Tap the share icon and select add to home screen.

## Known issues

This calculator uses FlyByWire (FBW) Simulations' calculations for VR and V2. The V1 calculation, on the other hand, needs some work it currently assumes a low V1 speed for safety even though the takeoff can likely be rejected later, it is safest to use lower. **V1 speed does not affect rotation or engine out (V2) speeds**

Currently there is no full method for an invalid takeoff. If the calculator outputs TOGA and the runway visualization shows your ASD above the runway, you don't have enough runway to take off, this will be resolved soon.

An internet connection is required* by default for the METAR API. a beta version is currently deployed to accept manual input by tapping the wifi icon on the menu bar. Open an issue if you experience any problems. 

\* an internet connection is **not** required for the runway database, it is built into the app.

## Available Scripts

In the project directory, you can run:
#### `npm install`
#### `git submodule update --init`
#### `mkdir -p -v ./public/database/runways`
#### `cp -R ./runways/icao/ ./public/database/runways/`
#### `npm start`
