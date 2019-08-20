
`use strict`;

const express = require('express');
const bodyParser = require('body-parser');
var cacheManager = require('cache-manager');

const PORT = Number(process.env.PORT || 3009);

var END_PATH = "/API/";

// Start express app
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var memoryCache = cacheManager.caching({ store: 'memory', max: 100, ttl: 100 /*seconds*/ });

const logger = require('../utils/logger.js');

const sql = require('../models/db.js');
sql.connect();

logger.info("Service API started");





 // Return all the Team list based on subbrandId
app.post(END_PATH + 'getTeamList', function(req, res) {
    var errorStatus = 417;
    var successStatus = 200;
    var notFoundStatus = 204;
    var notFoundMsg = "No records found";
    var errorMsg = "Must provide prsub brand ID";
    var successMsg = "Success";
    var successContentType = 'application/json';

    var bodyData = req.body;
    logger.info(bodyData.subBrandId);

    if (bodyData != undefined) {
        if (bodyData.subBrandId) {
        sql.query([{'key':'listItemType','datatype':'sql.VarChar(50)','value':'team'},{'key':'Subbrand','datatype':'sql.VarChar(50)','value':bodyData.subBrandId}]
            ,'usp_gcs_get_list_item_details',function(result){
                res.set('Content-Type', successContentType);
                res.status(successStatus).send(JSON.stringify(result));
            })
        }
        else{
            res.status(417).send(errorMsg);
            return;
        }
    }
 })

module.exports = app;
