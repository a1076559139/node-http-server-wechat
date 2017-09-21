/**
 * demo
 * 此文件无用
 */
const Mysql = require('./../libs/mysql'),
    mysql = Mysql.getClient();

const db = {};

db.getUserNameByOpenid = async function getUserNameByOpenid(openid) {
    if (!type.String.isString(openid)) {
        return Promise.reject('参数错误');
    }
    let result = await awaitDoErr(__filename, mysql, 'query', {
        sql: 'select * from database where opneid=?',
        values: [openid]
    });

    let rows = result[0];
    return rows.length > 0 ? rows[0]['username'] : null;
};

module.exports = db;