function sendNode(PhoneNumbers) {
	var code = Math.floor(Math.random() * (9999 - 999 + 1) + 999);

    // const SMSClient = require('@alicloud/sms-sdk')
    // // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
    const accessKeyId = 'LTAIpNqcbjIzSyDD'
    const secretAccessKey = 'OrOvEA6VwZYsrzYd5zFCinaayMctfX'
    //初始化sms_client
    let smsClient = new SMSClient({accessKeyId, secretAccessKey})
    //发送短信
    smsClient.sendSMS({
        PhoneNumbers: PhoneNumbers,
        SignName: '小组null',
        TemplateCode: 'SMS_111895529',
        TemplateParam: '{"code":' + code + ',"product":"云通信"}'
    }).then(function (res) {
        let {Code}=res
        if (Code === 'OK') {
            //处理返回参数
//          console.log(res)
        }
    }, function (err) {
//      console.log(err)
    });

    return code;
}

module.exports = sendNode;