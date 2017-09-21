const wxconfig = require('./../wxconfig');
const wechat = require('wechat');
module.exports = function (cb) {
    return wechat(wxconfig, cb);
};