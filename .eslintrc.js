module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "config": true,
        "util": true,
        "type": true,
        "libs": true,
        "awaitDoErr": true,
        "awaitDo": true,
        "sleep": true,
        "wxconfig": true,
        "oid_uid": true,
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0
    }
};