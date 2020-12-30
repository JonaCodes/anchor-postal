const axios = require('axios').default;

class Validator {

    constructor() { }

    validate(state) { return axios.post(`/validation`, state) }
}

export default new Validator()