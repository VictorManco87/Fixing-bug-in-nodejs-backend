const nodeCache = require( "node-cache" );
const axios = require('axios')

const dataCache = new nodeCache();

module.exports.getDataJson = (dataUrl, view, token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return new Promise((resolve, reject) => {
        axios.post(dataUrl, {
            view: view
        })
        .then(response => {
            dataCache.set("data", response.data, 120 );
            resolve({ data: response.data });
        })
        .catch((error) => {
            reject({ status: 500, message: 'Internal Server Error' })
        });
    })
}