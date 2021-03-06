/**
 * Created by popolos on 26/10/2017.
 */
"use strict";

const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    /**
     * Add specific headers for api
     * @param req
     * @param res
     * @param next
     */
    headers : function(req, res, next) {
        // Allow all domain
        res.header("Access-Control-Allow-Origin", "*");
        // Allowed method
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    },

    /**
     * Set token credentials to request
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    token : function(req, res, next) {
        let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers['authorization'];
        if (token) {
            jwt.verify(token, config.apisecret, (err, decoded) => {
                if (! err) {
                    // TODO iat and exp
                    req.connectedUser = decoded;
                } else {
                    /*
                    return res.status(403).send({
                        'error' : 'Operation not allowed'
                    });
                    */
                }
            });
        }
        next();
    },

    /**
     * Check token credentials
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    protect : function(req, res, next) {
        if(! req.connectedUser) {
            return res.status(401).send({
                'error' : 'Operation not allowed'
            });
        }
        next();
    }
};
