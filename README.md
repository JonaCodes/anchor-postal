# Setup
- Run `npm install`

# Running

- Run `node server.js`
- Open [http://localhost:1337](http://localhost:1337) to view it in the browser.

# Functionality
- Uses the [SmartyStreets API](https://smartystreets.com)
- Validates address, city, state, and zip
- Bases results on `footnotes` error codes from the [API Docs](https://smartystreets.com/docs/cloud/us-street-api#footnotes)

# Limitations
- Does not validate mandatory/non-mandatory fields
    - Seemed like this wasn't the point of the project
- The API actually has more ways to validate the address, specifically using the `active` and `dvp_footnotes` fields - but it seemed overkill
- Ignoring some of the error codes
    - As a result, **some addresses that are wrong will display without errors**
