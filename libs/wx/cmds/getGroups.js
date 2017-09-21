const api = require('./../libs/api');
module.exports = async function () {
    let result = await awaitDoErr(__filename, api, 'getGroups');
    return result[0].groups;
};