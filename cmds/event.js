const request = require('request');
const util = require('util');
const fs = require('fs');

module.exports = async function(message) {
    let event = message.Event;
    let eventKey = message.EventKey;
    let openid = message.FromUserName;
    if (event === 'CLICK') {
        // 点击事件
        switch (eventKey) {
            case 'code':// 获取验证码

                // 将oid_uid.json解析成对象
                let oid_uid = null;
                try {
                    let data = await awaitDoErr(__filename, fs, 'readFile', './oid_uid.json', 'utf8');
                    oid_uid = JSON.parse(data);
                } catch (e) {
                    return 'oid_uid.json文件错误\n' + e.message;
                }

                // 在oid_uid中根据openid获取userid
                let userid = oid_uid[openid];
                if (!userid) {
                    return openid + '\n请联系管理员添加权限';
                }

                // 根据userid获取验证码
                let result = await awaitDoErr(__filename, request, 'get', util.format(config.code_url, userid));
                let response = result[0];
                let body = result[1];
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    body = { status: '100', desc: e.message, data: '' };
                }
                if (response.statusCode == 200 && body.status == 200) {
                    return body.data;
                } else {
                    return body.desc;
                }
                break;
            default:
                return '无效的指令';
        }
    }
};