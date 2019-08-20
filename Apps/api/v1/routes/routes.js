`use strict`;

const express = require('express');
const path= require('path');
const bodyParser = require('body-parser');
const cacheManager = require('cache-manager');
const logger = require(__basedir+'/utils/logger.js');
const sql = require(__basedir+'/apps/api/v1/models/db.js');

// Start express app
var app = express();

app.use(bodyParser.json());

var memoryCache = cacheManager.caching({ store: 'memory', max: 100, ttl: 100 /*seconds*/ });

sql.connect();

logger.info("Service API started");

var END_PATH = "/api/";

 // Return all the Team list based on subbrandId
 app.post(END_PATH + 'getTeamList', function(req, res) {
    var bodyData = req.body;
    logger.info(bodyData.subBrandId);

    if (bodyData != undefined) {
        if (bodyData.subBrandId) {
        sql.query([{'key':'listItemType','datatype':'sql.VarChar(50)','value':'team'},{'key':'Subbrand','datatype':'sql.VarChar(50)','value':bodyData.subBrandId}]
            ,'usp_gcs_pie_get_list_item_details',function(result){
                res.set('Content-Type', sql.successContentType);
                res.status(sql.successStatus).send(JSON.stringify(result));
            })
        }
        else{
            res.status(417).send(sql.errorMsg);
            return;
        }
    }
 })

 // Return all the dropdown datas (ie.. year,category,team and source) based on brand name
 app.post(END_PATH + 'getBrandFilterDatas', function(req,res){
    debugger;
    var bodyData = req.body;
     if(bodyData != undefined){
         sql.query([
            {'key':'Brand','datatype':'sql.VarChar(8000)','value':bodyData.brand || null},
            {'key':'SubBrand','datatype':'sql.VarChar(8000)','value':bodyData.subBrand || null}
         ]
         ,'usp_gcs_pie_get_dbsvcs_search_filter_data',function(result){
             // console.log(result);
             res.set('Content-Type', sql.successContentType);
             res.status(sql.successStatus).send(result);
         })
     }
 })
  // Return all the Team list projects based on team name
app.post(END_PATH + 'getProjects', function(req, res) {
    var bodyData = req.body;
    logger.info(bodyData.teamName);

    if (bodyData != undefined) {
        if (bodyData.teamName) {
        sql.query([
            {'key':'sitename','datatype':'sql.VarChar(50)','value':'team'},
            {'key':'teamname','datatype':'sql.VarChar(50)','value':bodyData.teamName},
            {'key':'LastIndex','datatype':'sql.VarChar(80)','value':bodyData.lastIndex || 0},
            {'key':'RecordsCount','datatype':'sql.VarChar(80)','value':bodyData.recordsCount || 25}
        ]
            ,'usp_gcs_pie_get_dbsvcs_project_info',function(result){
                res.set('Content-Type', sql.successContentType);
                res.status(sql.successStatus).send(JSON.stringify(result));
            })
        }
        else{
            res.status(417).send(errorMsg);
            return;
        }
    }
 })
// Return all the search results based on search submit fields
 app.post(END_PATH + 'getSearchResults', function(req,res){
    debugger;
    var bodyData = req.body;
     if(bodyData != undefined){
         //logger.info(bodyData.projectYear || null)
         sql.query([{'key':'projectYear','datatype':'sql.VarChar(50)','value':bodyData.projectYear || null},
         {'key':'ProjectNumber','datatype':'sql.VarChar(8000)','value':bodyData.projectNumber || null},
         {'key':'ProductNumber','datatype':'sql.VarChar(8000)','value':bodyData.productNumber || null},
         {'key':'AssortmentNumber','datatype':'sql.VarChar(8000)','value':bodyData.assortmentNumber || null},
         {'key':'Brand','datatype':'sql.VarChar(8000)','value':bodyData.brand || null},
         {'key':'SubBrand','datatype':'sql.VarChar(8000)','value':bodyData.subBrand || null},
         {'key':'Category','datatype':'sql.VarChar(8000)','value':bodyData.category || null},
         {'key':'ManufacturingSource','datatype':'sql.VarChar(8000)','value':bodyData.source || null},
         {'key':'IncludeDroppedProjects','datatype':'sql.Bit','value':bodyData.includedrops || false},
         {'key':'ExtendedSearch','datatype':'sql.Bit','value':bodyData.extendedsearch || false},
         {'key':'Team','datatype':'sql.VarChar(8000)','value':bodyData.team || null},
         {'key':'ProjectDescription','datatype':'sql.VarChar(8000)','value':bodyData.projectDescription || null},
         {'key':'ProductDescription','datatype':'sql.VarChar(8000)','value':bodyData.productDescription || null},
         {'key':'LastIndex','datatype':'sql.VarChar(80)','value':bodyData.lastIndex || 0},
         {'key':'RecordsCount','datatype':'sql.VarChar(80)','value':bodyData.recordsCount || 25}]
         ,'usp_gcs_pie_get_project_search_results',function(result){
             // console.log(result);
             res.set('Content-Type', sql.successContentType);
             res.status(sql.successStatus).send(result);
         })
     }
 })

 // Return all the product attributes and documents based on project id
 app.post(END_PATH + 'getProjectDetail', function(req,res){
     var bodyData = req.body;
     if(bodyData!=undefined){
         sql.query([{'key':'projectList', 'datatype':'sql.VarChar(8000)', 'value':bodyData.projectNumber}]
         ,'usp_gcs_pie_get_dbsvcs_project_info', function(result){
            var resJson = prepareProjectJson(result);
            res.set('Content-Type', sql.successContentType);
            res.status(sql.successStatus).send(JSON.stringify(resJson));
        })
     }
 })

var prepareProjectJson = (res) => {
    let jsonRes = {};
    jsonRes.productAttributes = res.recordsets[0][0];
    jsonRes.productDocuments = prepareDocJson(res.recordsets[1]);
    jsonRes.brandName = res.recordsets[2][0] && res.recordsets[2][0].BrandDisplayName;
    return jsonRes;
}

var prepareDocJson = function(rSet) {
var output = {};
for(i = 0; i<rSet.length; i++) {
      var current = rSet[i];
      if(!output[rSet[i].display_header]){
        output[rSet[i].display_header] = {};
      }
      if(!output[rSet[i].display_header][rSet[i].doc_library]){
        output[rSet[i].display_header][rSet[i].doc_library] = [];
      }
    //   console.log(rSet[i]); 
      output[rSet[i].display_header][rSet[i].doc_library] .push( {
          title : rSet[i].document,
          value : rSet[i].document_url,
          libraryVal : rSet[i].doc_library_url,
          lstupdt_date : rSet[i].lstupdt_date 
        });
    }
    console.log(output['Forecast and Inventory Control']);
    return output;
}

module.exports = app;
