const Redis = require('redis');
//     client = redis.createClient({
//         //ip地址localhost
//         //139.199.210.29
//         host: 'localhost',
//         //端口6379
//         port: 6379,
//         //0库
//         db: 0,
//         //超时时间10秒,10秒后redis不会自动重连
//         // connect_timeout: 10000
//     });

const redis = Redis.createClient(config.neiwang ? config.redis.neiwang : config.redis.waiwang);
redis.on('connect', function () {
    console.log('redis content success');
});
redis.on('error', function (err) {
    console.log('redis content err %j', err);
});

module.exports.getClient = function () {
    return redis;
};