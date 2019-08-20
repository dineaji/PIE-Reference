`use strict`;

const sql = require('mssql')
const path= require('path');

const constring = process.env.SQL_CONNECTION_STRING;

const logger = require(__basedir+'/utils/logger.js');

let pool;

module.exports = {
  errorStatus : 417,
  successStatus : 200,
  notFoundStatus : 204,
  notFoundMsg : "No records found",
  errorMsg : "Must provide prsub brand ID",
  successMsg : "Success",
  successContentType : 'application/json',
  connect: function () {
    try {
        pool = sql.connect(constring)
  		  logger.info("SQL Connected")
      } catch (err) {
  		  logger.info("SQL connection error");
      }
  },
  query: function (inputObjects,query,cb) {
  	pool.then(pool => {
		    let ps= pool.request();
        inputObjects.forEach(function(item) {
          ps.input(item.key, sql.VarChar(50),item.value )
        })
		    return ps.execute(query)
      }).then(result => {
           if(result){
                logger.info("result success")
                cb(result)
           }
           else{
            logger.info("result error")
           }
    }).catch((err)=>{
        logger.info(err);
        return ;
    })
  }
};
