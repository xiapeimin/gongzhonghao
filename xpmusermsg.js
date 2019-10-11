const titbit = require('titbit');
const xmlparse = require('xml2js').parseString;
const wxmsg = require('./xpmmsghandle');

var app = new titbit();

var {router} = app;


app.router.post('/xpm/msg',async c => {
    try {
        let xmlmsg = await new Promise((rv, rj) => {
            xmlparse(c.body, {explicitArray : false}, (err, result) => {
                if (err) {
                    rj(err);
                } else {
                    rv(result.xml);
                }
            });
        });
        let data = {
            touser: xmlmsg.FromUserName,
            fromuser: xmlmsg.ToUserName,
            msg: xmlmsg.Content,
            msgtime: parseInt(Date.now() / 1000),
            msgtype: ''
        };
        //没有消息派发函数进行处理
        //要把解析后的消息和要返回的数据对象传出去
        c.res.body = wxmsg.msgDispatch(xmlmsg, data);
    } catch (err) {
        console.log(err);
    }

});

app.run(8002,'localhost');