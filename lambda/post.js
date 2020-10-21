'use strict';

var AWS= require('aws-sdk'),
  mydocumentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
    var createdAt = new Date();
    var newdate = createdAt.toString();
    var params = {
	Item:{
	    "date": newdate,
		"title" : event.title,
		"body": event.body,
		"username": event.username
	},
	TableName: "reactcmstable"
   };
   mydocumentClient.put(params, function(err, data){
       callback(err,data);
   });
};