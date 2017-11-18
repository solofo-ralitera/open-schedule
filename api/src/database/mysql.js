'use strict';

const mysql = require('mysql');
const config = require('../../config');
const IDb = require('./interface');


class Mysql extends IDb {

    constructor() {
        super();
        this.pool = mysql.createPool({
            connectionLimit : 100,
            host     : config.database.host,
            user     : config.database.user,
            password : config.database.password,
            database : config.database.database,
            debug    :  false
        });
    }

    escape(str) {
        return mysql.escape(str);
    }

    select(sql, params) {
        if(typeof params === 'undefined') params = {};
        // TODO params
        return new Promise((resolve, reject) => {
            let query = 'CALL os_' + sql + '('+ this.escape(JSON.stringify(params)) +')';
            console.log(query);
            this.pool.query(query, function(err, rows, fields) {
                if (err) {
                    reject(err.message);
                    return false;
                }

                //console.log("\n\n");
                //console.log(query)
                //console.log(rows)
                //console.log("\n\n");

                // TODO OkPacket in results ?
                if(typeof rows !== 'undefined' && 0 in rows) resolve(rows[0]);
                else resolve(rows);
            });
        });
    }

    query(sql, params) {
        return this.select(sql, params).then(row => {
            if(row[0]) return row[0];
            else return row;
        });
    }


}

module.exports = new Mysql();