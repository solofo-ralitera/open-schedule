'use strict';

const config = require('../../config');
const Db = require('../database/' + config.database.dirver);


class Modules {

    createItems(roles, module, data) {
        console.log(roles, module, data)
        return Db.query('set_modules_data', {
            roles: roles,
            module: module,
            data: data,
            sessions: 1 // TODO defaut session and selected session
        }).then(rows => {
            return rows;
        });
    }

}

module.exports = new Modules();