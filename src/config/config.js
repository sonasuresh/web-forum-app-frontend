
const dotenv = require('dotenv');
dotenv.config()

const config = {
    apiURL: process.env.REACT_APP_API_URL
}

export default config;