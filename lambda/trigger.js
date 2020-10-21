var aws = require('aws-sdk');
var s3 = new aws.S3();


exports.handler = async(event, context, callback)  => {
  let tabledetails = JSON.parse(JSON.stringify(event.Records[0].dynamodb));
  let title = tabledetails.NewImage.title.S;
  let body = tabledetails.NewImage.body.S;
  let username = tabledetails.NewImage.username.S;
  console.log(title,body,username);
 
  try{
        const params = {
            Bucket: 'posttos3',
            Key: 'post-template.html',
        };
        const getResult = await s3.getObject(params).promise();
        let objectData = getResult.Body.toString('utf-8');
        console.log(objectData);

     
        
        let content = objectData.replace("{{ post.title }}" ,title);
        let newfile = username +".html";
        
        
        const destparams ={
            Bucket: 'posttos3',
            Key: newfile,
            Body: content
 
            
        };
        const putResult = await s3.putObject(destparams).promise(); 
            
        console.log(putResult);
                

        
    } catch (error) {
        console.log(error);
        return;
    } 
};
