require('babel-polyfill');

// 扩展库
global.config = require('./config');
global.type = require('./util/type');
global.util = require('./util/util');

/**
 * 将普通方法转成ES7方法
 *
 * @param {string} filename
 * @param {object} target
 * @param {string} func
 * @param {any} arg
 * @returns
 */
global.awaitDoErr = function (filename, target, funcName, ...arg) {
    return new Promise(function (resolve, reject) {
        logSuccess(filename, funcName, arg);
        target[funcName](...arg, function (err, ...parma) {
            if (err) {
                logError(filename, funcName, err);
                reject({
                    code: 400,
                    message: err
                });
            } else {
                logSuccess(filename, funcName, parma);
                resolve(parma.length === 1 ? parma[0] : parma);
            }
        });
    });
};

/**
 * 将普通方法转成ES7方法
 *
 * @param {string} filename
 * @param {object} target
 * @param {string} func
 * @param {any} arg
 * @returns
 */
global.awaitDo = function (filename, target, funcName, ...arg) {
    return new Promise(function (resolve) {
        logSuccess(filename, funcName, arg);
        target[funcName](...arg, function (...parma) {
            logSuccess(filename, funcName, parma);
            resolve(parma.length === 1 ? parma[0] : parma);
        });
    });
};

global.sleep = function (time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time);
    });
};

global.logError = function (filename, funName, msg) {
    console.error('[ERROR] [' + filename + '] [' + funName + '] ' + JSON.stringify(msg));
    console.log('[ERROR] [' + filename + '] [' + funName + '] ' + JSON.stringify(msg));
};

global.logSuccess = function (filename, funName, msg) {
    console.log('[OK] [' + filename + '] [' + funName + '] ' + JSON.stringify(msg));
};

const fs = require('fs');

// libs库设为全局
global.libs = {};
const files_libs = fs.readdirSync('./libs');
for (let i = 0; i < files_libs.length; i++) {
    let file = files_libs[i];
    if (libs[file]) {
        throw file + 'is already exists';
    }
    libs[file] = require('./libs/' + file);
}

// 创建菜单
libs.wx.createMenu();
libs.wx.createCustomMenu();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
app.use(express.query());

// 公众号
app.use('/wechat', libs.wx.proxy(async function (req, res) {
    // 微信输入信息都在req.weixin上
    let message = req.weixin;
    let msgType = message.MsgType;

    let message_string = JSON.stringify(message);
    console.log('[OK] [RQ] [cmds/' + msgType + '] message ' + message_string);
    try {
        let cmd = require('./cmds/' + msgType);
        let result = await cmd(message);
        if (!type.String.isString(result)) {
            result = JSON.stringify(result);
        }
        console.log('[OK] [RS] [cmds/' + msgType + '] message ' + message_string + ' result ' + JSON.stringify(result));
        res.reply(result);
    } catch (e) {
        console.error('[ERROR] [RS] [cmds/' + msgType + '] message ' + message_string + ' error ' + e.message);
        console.log('[ERROR] [RS] [cmds/' + msgType + '] message ' + message_string + ' error ' + e.message);
        res.reply('服务器开小差中~~');
    }
}));

server.listen(config.host.port, function () {
    console.log('listen localhost:' + server.address().port);
});

process.on('uncaughtException', function (err) {
    console.error('uncaughtException', err.stack);
});