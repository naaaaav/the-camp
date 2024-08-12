import AWS from 'aws-sdk';


AWS.config.update({
    region: 'ap-northeast-2',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-2:484d25e8-c8cf-42f5-8d6a-9ff51f1b6eef'
    })
});

export default AWS;