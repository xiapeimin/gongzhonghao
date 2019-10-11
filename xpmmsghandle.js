const formatMsg = require('./xpmfmtwxmsg');

function help(){
    //字符串形式返回帮助消息
    //还可以是读取文件的形式来返回
    return '你好，这是一个测试号，目前会原样返回用户输入的数据';
    
}
/**
 * 
 * @param {object} wxmsg 解析XML消息的对象
 * @param {object} retmsg 要返回的数据对象
 */

function userMsg(wxmsg,retmsg){
    //关键字自动回复
    if(wxmsg.MsgType == 'text'){
        switch (wxmsg.Content) {
            case '帮助':
            case 'help':
            case '?':
                retmsg.msg = help();
                retmsg.msgtype = 'text';
                return formatMsg(retmsg);

            case "about":
                retmsg.msgtype = 'text';
                retmsg.msg = '我是这个测试号的开发者，如有问题，请咨询开发者xxx';
                return formatMsg(retmsg);
            
            case 'who':
                retmsg.msgtype = 'text';
                retmsg.msg = '开发者(学生)的基本信息：'+'\n'+'姓名：夏佩敏；'+'\n'+'学号：2017012038';
                return formatMsg(retmsg);
        
            default:
                retmsg.msgtype = 'text';
                retmsg.msg = wxmsg.Content;
                return formatMsg(retmsg);
        }

    }else{
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;

            default:
                //retmsg.msgtype类型为空
                //格式化数据会返回default处的数据
                //提示用户该类型不被支持
                retmsg.msgtype = 'text';
                retmsg.msg = '该类型不被支持哦';
        }
        return formatMsg(retmsg);
    }
    
}

exports.help = help;
exports.userMsg = this.userMsg;

//后续还会加入事件消息支持
exports.msgDispatch = function(wxmsg,retmsg){
    return userMsg(wxmsg,retmsg);
}
