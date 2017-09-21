const wxconfig = require('./../wxconfig');
let API = require('wechat-api');
let api = new API(wxconfig.appid, wxconfig.appsecret);
module.exports = api;