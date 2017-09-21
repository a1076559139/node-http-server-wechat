//568312496@qq.com
module.exports = {
    token: '',
    appid: '',
    appsecret: '',
    encodingAESKey: '',
    menu: {
        'button': [
            {
                'type': 'view',
                'name': '官网',
                'url': '*****'
            }
        ]
    },
    customMenu: {
        'button': [
            {
                'type': 'click',
                'name': '验证码',
                'key': 'code'
            },
            {
                'name': '菜单',
                'sub_button': [
                    {
                        'type': 'click',
                        'name': '白名单',
                        'key': 'bmd'
                    },
                    {
                        'type': 'view',
                        'name': '搜索',
                        'url': '*****'
                    },
                ]
            }
        ],
        'matchrule': {
            'group_name': 'aaa'
        }
    }
};