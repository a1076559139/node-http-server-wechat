const wxconfig = require('./../wxconfig');
const api = require('./../libs/api');

// 创建菜单
module.exports = async function createCustomMenu() {
    let groups = await libs.wx.getGroups();
    let id = null;
    for (let i = 0; i < groups.length; i++) {
        if (groups[i].name === wxconfig.customMenu.matchrule.group_name) {
            delete wxconfig.customMenu.matchrule.group_name;
            wxconfig.customMenu.matchrule.tag_id = id;
            break;
        }
    }
    if (id !== null) {
        let result = await awaitDo(__filename, api, 'createCustomMenu', JSON.stringify(wxconfig.customMenu));
        let err = result[0];
        if (err) {
            console.error('createCustomMenu error ', err);
        } else {
            console.log('createCustomMenu success');
        }
    }
}