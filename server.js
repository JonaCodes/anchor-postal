const express = require('express')
const bodyParser = require('body-parser')

const axios = require('axios').default
const path = require('path')

const authId = "d82dfb62-8cba-baf7-78d0-323f4c4d0017"
const authToken = "8Prv1rYnDDC7AnfkGFM6"

const app = express()

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const buildRequestURL = function (address1, address2, city, state, zip) {
    return `https://us-street.api.smartystreets.com/street-address?auth-id=${authId}&auth-token=${authToken}&candidates=1&street=${address1} ${address2}&city=${city}&state=${state}&zipcode=${zip}&match=invalid`
}

const getErrorMessage = function (apiResultNotes, errorLetters, errorMessage) {
    return errorLetters.some(l => apiResultNotes.includes(l)) ? errorMessage : null
}

// Currently only considering first result from SmartyStreets API
// Footnotes error codes from SmartStreets docs: https://smartystreets.com/docs/cloud/us-street-api#footnotes
const validateAddress = function (apiResult) {
    if (apiResult.length < 1) { return { result: false } }

    const analysis = apiResult[0].analysis
    if (analysis && analysis.footnotes && analysis.footnotes.length > 0) {
        const notes = analysis.footnotes.split("#") // footnotes received as string of "E#I#..."

        // Assuming these are the only error codes we care about; if none exist, then all good
        if (!["F", "I", "W", "U", "V", "C", "D", "A"].some(l => notes.includes(l))) { return { result: true, success: true } }

        return {
            result: true,
            addressError: getErrorMessage(notes, ["F", "I", "W"], "Problem with the address"),
            cityError: getErrorMessage(notes, ["U", "V", "W"], "Problem with the city"),
            stateError: getErrorMessage(notes, ["V", "W"], "Problem with the state"),
            zipError: getErrorMessage(notes, ["C", "D", "W", "A"], "Problem with the zip")
        }
    }

    // Assuming no 'analysis' key AND non-empty results means it's a valid address
    return { result: true, success: true }
}

app.post('/validation', (req, res) => {
    const userAddress = req.body
    const url = buildRequestURL(userAddress.address1, userAddress.address2 || "", userAddress.city, userAddress.state, userAddress.zip)
    console.log(url)
    axios.get(url).then(response => {
        const validationResult = validateAddress(response.data)
        res.send(validationResult)
    })
})

const port = process.env.PORT || '1337';
app.listen(port, function () { console.log('Running on ' + port) })