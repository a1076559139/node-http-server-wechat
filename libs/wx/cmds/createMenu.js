const wxconfig = require('./../wxconfig');
const api = require('./../libs/api');

// 创建菜单
module.exports = async function createMenu() {
    let result = await awaitDo(__filename, api, 'createMenu', JSON.stringify(wxconfig.menu));
    let err = result[0];
    if (err) {
        console.error('createMenu error ', err);
    } else {
        console.log('createMenu success');
    }
}