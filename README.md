# On-Off   ![Build Status](https://app.codeship.com/projects/2c26c180-9c1c-0137-4fb6-22e54353ff00/status?branch=master)

## Overview
Simple node app to turn on or off a GPIO pin from a REST url

## Prerequisites
* Node

## Environment
Environment variables have defaults that can be found in ```/config/default.json```

## Running
When started the application exposes REST endpoints
```
npm start
``` 

## Testing
To run the tests
```
npm test
```

Running the application in test mode just with the REST endpoints...
```
NODE_ENV=test npm www 

```
